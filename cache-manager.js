/**
 * cache-manager.js — Folerio Offline Folio Storage & Cache Engine
 * Uses asynchronous IndexedDB for zero-latency, high-capacity offline reading.
 * Supports configurable limits (500 to 5,000 folios) and automatic age purging.
 */

const FolioCacheDB = {
  DB_NAME: 'folerio_offline_db',
  DB_VERSION: 1,
  STORE_FOLIOS: 'cached_folios',
  STORE_SETTINGS: 'cache_settings',

  db: null,

  // Default Settings
  defaultSettings: {
    capacity: 1000, // 500 | 1000 | 2500 | 5000
    retentionDays: 30, // 7 (1 week) | 30 (1 month) | 0 (indefinite)
    autoSyncOnline: true,
    lastSyncTimestamp: null
  },

  /**
   * Initialize IndexedDB database and object stores
   */
  async init() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // Folios store
        if (!db.objectStoreNames.contains(this.STORE_FOLIOS)) {
          const folioStore = db.createObjectStore(this.STORE_FOLIOS, { keyPath: 'id' });
          folioStore.createIndex('cached_at', 'cached_at', { unique: false });
          folioStore.createIndex('field', 'field', { unique: false });
          folioStore.createIndex('feed_type', 'feed_type', { unique: false });
        }

        // Settings store
        if (!db.objectStoreNames.contains(this.STORE_SETTINGS)) {
          db.createObjectStore(this.STORE_SETTINGS, { keyPath: 'key' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        console.log('📦 Folerio: Offline IndexedDB initialized successfully.');
        this.enforceRetentionPolicy().catch(console.warn);
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('Failed to open Folerio IndexedDB:', e.target.error);
        reject(e.target.error);
      };
    });
  },

  /**
   * Get transaction helper
   */
  getStore(storeName, mode = 'readonly') {
    if (!this.db) throw new Error('IndexedDB not initialized');
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  },

  /**
   * Retrieve user cache settings
   */
  async getSettings() {
    try {
      await this.init();
      return new Promise((resolve) => {
        const store = this.getStore(this.STORE_SETTINGS, 'readonly');
        const req = store.get('user_cache_config');
        req.onsuccess = () => {
          resolve(req.result ? req.result.value : { ...this.defaultSettings });
        };
        req.onerror = () => resolve({ ...this.defaultSettings });
      });
    } catch {
      return { ...this.defaultSettings };
    }
  },

  /**
   * Save user cache settings
   */
  async saveSettings(newSettings) {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore(this.STORE_SETTINGS, 'readwrite');
      const req = store.put({ key: 'user_cache_config', value: newSettings });
      req.onsuccess = () => resolve(newSettings);
      req.onerror = (e) => reject(e.target.error);
    });
  },

  /**
   * Cache a list of Folios into IndexedDB with capacity enforcement (LRU / FIFO)
   */
  async cacheFolios(folios, feedType = 'frontier') {
    if (!folios || !folios.length) return;
    await this.init();

    const settings = await this.getSettings();
    const now = Date.now();

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.STORE_FOLIOS], 'readwrite');
      const store = tx.objectStore(this.STORE_FOLIOS);

      folios.forEach(folio => {
        if (!folio || !folio.id) return;
        const record = {
          ...folio,
          cached_at: folio.cached_at || now,
          feed_type: feedType
        };
        store.put(record);
      });

      tx.oncomplete = async () => {
        // Enforce max capacity setting
        await this.enforceCapacity(settings.capacity);
        resolve();
      };

      tx.onerror = (e) => reject(e.target.error);
    });
  },

  /**
   * Retrieve all cached folios
   */
  async getAllCachedFolios(feedType = null) {
    await this.init();
    return new Promise((resolve) => {
      const store = this.getStore(this.STORE_FOLIOS, 'readonly');
      const req = store.getAll();

      req.onsuccess = () => {
        let results = req.result || [];
        if (feedType) {
          results = results.filter(f => f.feed_type === feedType);
        }
        // Sort newest cached first
        results.sort((a, b) => (b.cached_at || 0) - (a.cached_at || 0));
        resolve(results);
      };

      req.onerror = () => resolve([]);
    });
  },

  /**
   * Enforce maximum capacity limit (removes oldest excess folios)
   */
  async enforceCapacity(maxCapacity = 1000) {
    await this.init();
    return new Promise((resolve) => {
      const tx = this.db.transaction([this.STORE_FOLIOS], 'readwrite');
      const store = tx.objectStore(this.STORE_FOLIOS);
      const req = store.getAll();

      req.onsuccess = () => {
        const all = req.result || [];
        if (all.length > maxCapacity) {
          // Sort oldest first
          all.sort((a, b) => (a.cached_at || 0) - (b.cached_at || 0));
          const toDeleteCount = all.length - maxCapacity;
          for (let i = 0; i < toDeleteCount; i++) {
            store.delete(all[i].id);
          }
          console.log(`🧹 FolioCache: Evicted ${toDeleteCount} oldest folios to maintain ${maxCapacity} capacity.`);
        }
        resolve();
      };

      req.onerror = () => resolve();
    });
  },

  /**
   * Enforce age retention policy (delete folios older than 7 or 30 days)
   */
  async enforceRetentionPolicy() {
    const settings = await this.getSettings();
    if (!settings.retentionDays || settings.retentionDays <= 0) return;

    await this.init();
    const cutoff = Date.now() - (settings.retentionDays * 24 * 60 * 60 * 1000);

    return new Promise((resolve) => {
      const tx = this.db.transaction([this.STORE_FOLIOS], 'readwrite');
      const store = tx.objectStore(this.STORE_FOLIOS);
      const index = store.index('cached_at');
      const range = IDBKeyRange.upperBound(cutoff);
      const req = index.openCursor(range);

      let purged = 0;
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          cursor.delete();
          purged++;
          cursor.continue();
        } else {
          if (purged > 0) {
            console.log(`🧹 FolioCache: Purged ${purged} folios older than ${settings.retentionDays} days.`);
          }
          resolve(purged);
        }
      };

      req.onerror = () => resolve(0);
    });
  },

  /**
   * Clear all cached folios
   */
  async clearAllCache() {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([this.STORE_FOLIOS], 'readwrite');
      const store = tx.objectStore(this.STORE_FOLIOS);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = (e) => reject(e.target.error);
    });
  },

  /**
   * Get storage usage metrics (count + estimated megabytes)
   */
  async getStorageEstimate() {
    await this.init();
    return new Promise((resolve) => {
      const store = this.getStore(this.STORE_FOLIOS, 'readonly');
      const req = store.getAll();

      req.onsuccess = () => {
        const all = req.result || [];
        const count = all.length;
        // Approximate JSON string byte size
        let totalBytes = 0;
        try {
          totalBytes = JSON.stringify(all).length;
        } catch {
          totalBytes = count * 4500; // ~4.5KB per folio estimate
        }
        const mb = (totalBytes / (1024 * 1024)).toFixed(2);
        resolve({ count, sizeMB: mb });
      };

      req.onerror = () => resolve({ count: 0, sizeMB: '0.00' });
    });
  }
};

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
  FolioCacheDB.init().catch(console.warn);
}

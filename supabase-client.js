/**
 * supabase-client.js — Noesis Central Database Bridge
 * 
 * Instructions to connect Supabase:
 * 1. Create a free project at https://supabase.com
 * 2. In Supabase, go to Settings -> API
 * 3. Paste your "Project URL" and "anon public" key into PLATFORM_SUPABASE_CONFIG below.
 * 4. Run schema.sql in your Supabase SQL Editor.
 * That's it! All users worldwide will automatically connect to your shared cloud database.
 */

const PLATFORM_SUPABASE_CONFIG = {
  // === CENTRAL SUPABASE CLOUD BACKEND ===
  url: 'https://czrqmnvggfjwydysnmlg.supabase.co',
  anonKey: 'sb_publishable_EPNsN1GKUvisSadRi5kOyQ_Ox2XuQDS'
};

const SupabaseBridge = {
  STORAGE_KEY_URL: 'noesis_supabase_url',
  STORAGE_KEY_KEY: 'noesis_supabase_key',
  STORAGE_KEY_LOCAL_POSTS: 'noesis_local_folios',
  STORAGE_KEY_INTERACTIONS: 'noesis_user_interactions',

  config: {
    url: '',
    anonKey: '',
    isConnected: false
  },

  init() {
    // Prefer central platform config; fallback to localStorage if set
    this.config.url = (PLATFORM_SUPABASE_CONFIG.url || localStorage.getItem(this.STORAGE_KEY_URL) || '').trim();
    this.config.anonKey = (PLATFORM_SUPABASE_CONFIG.anonKey || localStorage.getItem(this.STORAGE_KEY_KEY) || '').trim();
    this.config.isConnected = !!(this.config.url && this.config.anonKey);

    if (this.config.isConnected) {
      console.log('⚡ Noesis: Connected to central Supabase cloud backend.');
    } else {
      console.log('📁 Noesis: Operating in browser LocalStorage mode (offline / demo ready).');
    }

    return this.config;
  },

  /**
   * Fetch all Folios (from Supabase if configured, otherwise localStorage)
   */
  async getPosts() {
    if (this.config.isConnected) {
      try {
        const response = await fetch(`${this.config.url}/rest/v1/posts?select=*&order=created_at.desc`, {
          headers: {
            'apikey': this.config.anonKey,
            'Authorization': `Bearer ${this.config.anonKey}`
          }
        });
        if (response.ok) {
          const cloudPosts = await response.json();
          return cloudPosts.map(p => ({
            id: p.id,
            title: p.paper_title,
            authors: p.authors || 'Scholar',
            field: p.field_tag || 'General Science',
            doi: p.paper_url || '',
            theme: p.theme || 'obsidian',
            slides: p.slides || [],
            likes: p.likes_count || 0,
            comments: p.comments || [],
            createdAt: p.created_at
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }

    // Fallback to local storage
    const raw = localStorage.getItem(this.STORAGE_KEY_LOCAL_POSTS);
    return raw ? JSON.parse(raw) : null;
  },

  /**
   * Save a newly created Folio
   */
  async createPost(post) {
    if (this.config.isConnected) {
      try {
        const payload = {
          paper_title: post.title,
          paper_url: post.doi,
          authors: post.authors,
          field_tag: post.field,
          theme: post.theme,
          slides: post.slides,
          likes_count: post.likes || 1,
          comments: []
        };

        const response = await fetch(`${this.config.url}/rest/v1/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.config.anonKey,
            'Authorization': `Bearer ${this.config.anonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const inserted = await response.json();
          return inserted[0];
        }
      } catch (err) {
        console.error('Failed to publish Folio to Supabase:', err);
      }
    }

    // Local Storage save
    const current = (await this.getPosts()) || [];
    current.unshift(post);
    localStorage.setItem(this.STORAGE_KEY_LOCAL_POSTS, JSON.stringify(current));
    return post;
  },

  /**
   * Record interactions (likes, bookmarks, comments)
   */
  async recordInteraction(postId, type, data) {
    const posts = (await this.getPosts()) || [];
    const target = posts.find(p => p.id === postId);

    if (target) {
      if (type === 'like') {
        target.likes = (target.likes || 0) + 1;
        if (this.config.isConnected) {
          try {
            await fetch(`${this.config.url}/rest/v1/posts?id=eq.${postId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': this.config.anonKey,
                'Authorization': `Bearer ${this.config.anonKey}`
              },
              body: JSON.stringify({ likes_count: target.likes })
            });
          } catch (e) {
            console.warn('Sync like to Supabase failed', e);
          }
        }
      } else if (type === 'comment' && data) {
        if (!target.comments) target.comments = [];
        target.comments.push({ author: 'Ihtisham Naeem', text: data });
      }

      localStorage.setItem(this.STORAGE_KEY_LOCAL_POSTS, JSON.stringify(posts));
    }
  }
};

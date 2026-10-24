/**
 * supabase-client.js
 * Transparent storage bridge: Seamlessly uses Supabase when configured,
 * or persistent browser localStorage for zero-barrier local exploration.
 */

const SupabaseBridge = {
  STORAGE_KEY_URL: 'synapse_supabase_url',
  STORAGE_KEY_KEY: 'synapse_supabase_key',
  STORAGE_KEY_LOCAL_POSTS: 'synapse_local_posts',
  STORAGE_KEY_INTERACTIONS: 'synapse_user_interactions',

  config: {
    url: '',
    anonKey: '',
    isConnected: false
  },

  init() {
    this.config.url = localStorage.getItem(this.STORAGE_KEY_URL) || '';
    this.config.anonKey = localStorage.getItem(this.STORAGE_KEY_KEY) || '';
    this.config.isConnected = !!(this.config.url && this.config.anonKey);
    return this.config;
  },

  saveCredentials(url, anonKey) {
    if (!url || !anonKey) {
      this.clearCredentials();
      return false;
    }
    localStorage.setItem(this.STORAGE_KEY_URL, url.trim());
    localStorage.setItem(this.STORAGE_KEY_KEY, anonKey.trim());
    this.config.url = url.trim();
    this.config.anonKey = anonKey.trim();
    this.config.isConnected = true;
    return true;
  },

  clearCredentials() {
    localStorage.removeItem(this.STORAGE_KEY_URL);
    localStorage.removeItem(this.STORAGE_KEY_KEY);
    this.config.url = '';
    this.config.anonKey = '';
    this.config.isConnected = false;
  },

  /**
   * Fetch all posts (from Supabase if configured, otherwise localStorage)
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
            authors: p.authors || 'Researcher',
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
        console.warn('Supabase fetch failed, falling back to local posts:', err);
      }
    }

    // Fallback to local storage
    const raw = localStorage.getItem(this.STORAGE_KEY_LOCAL_POSTS);
    return raw ? JSON.parse(raw) : null;
  },

  /**
   * Save a newly created post
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
          likes_count: post.likes || 0,
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
        console.error('Failed to post to Supabase:', err);
      }
    }

    // Local Storage save
    const current = (await this.getPosts()) || [];
    current.unshift(post);
    localStorage.setItem(this.STORAGE_KEY_LOCAL_POSTS, JSON.stringify(current));
    return post;
  },

  /**
   * Update interaction (likes or bookmark)
   */
  async toggleLike(postId, increment) {
    const posts = (await this.getPosts()) || [];
    const target = posts.find(p => p.id === postId);
    if (target) {
      target.likes = Math.max(0, (target.likes || 0) + (increment ? 1 : -1));
      localStorage.setItem(this.STORAGE_KEY_LOCAL_POSTS, JSON.stringify(posts));

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
      return target.likes;
    }
    return 0;
  },

  /**
   * Add a comment to post
   */
  async addComment(postId, comment) {
    const posts = (await this.getPosts()) || [];
    const target = posts.find(p => p.id === postId);
    if (target) {
      if (!target.comments) target.comments = [];
      target.comments.push(comment);
      localStorage.setItem(this.STORAGE_KEY_LOCAL_POSTS, JSON.stringify(posts));
      return target.comments;
    }
    return [];
  }
};

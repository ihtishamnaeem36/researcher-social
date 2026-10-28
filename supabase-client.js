/**
 * supabase-client.js — Folerio Central Database Bridge
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
  STORAGE_KEY_URL: 'folerio_supabase_url',
  STORAGE_KEY_KEY: 'folerio_supabase_key',
  STORAGE_KEY_LOCAL_POSTS: 'folerio_local_folios',
  STORAGE_KEY_INTERACTIONS: 'folerio_user_interactions',
  STORAGE_KEY_SESSION: 'folerio_supabase_session',

  config: {
    url: '',
    anonKey: '',
    isConnected: false
  },

  init() {
    // Prefer central platform config; fallback to localStorage if set
    this.config.url = (PLATFORM_SUPABASE_CONFIG.url || localStorage.getItem(this.STORAGE_KEY_URL) || localStorage.getItem('noesis_supabase_url') || '').trim();
    this.config.anonKey = (PLATFORM_SUPABASE_CONFIG.anonKey || localStorage.getItem(this.STORAGE_KEY_KEY) || localStorage.getItem('noesis_supabase_key') || '').trim();
    this.config.isConnected = !!(this.config.url && this.config.anonKey);

    if (this.config.isConnected) {
      console.log('⚡ Folerio: Connected to central Supabase cloud backend.');
    } else {
      console.log('📁 Folerio: Operating in browser LocalStorage mode (offline / demo ready).');
    }

    return this.config;
  },

  /* ==========================================================================
     Supabase Authentication (Google OAuth, Email/Password, Profile Sync)
     ========================================================================== */

  getSession() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  saveSession(session) {
    if (!session) return;
    localStorage.setItem(this.STORAGE_KEY_SESSION, JSON.stringify(session));
  },

  clearSession() {
    localStorage.removeItem(this.STORAGE_KEY_SESSION);
  },

  getAccessToken() {
    const session = this.getSession();
    return session?.access_token || null;
  },

  /**
   * Launch official Google OAuth login
   */
  signInWithGoogle() {
    if (!this.config.isConnected) {
      alert('Central Supabase cloud is not configured.');
      return;
    }

    // Keep origin + pathname so user lands back cleanly on the active domain
    const redirectUrl = window.location.origin + window.location.pathname;
    const authUrl = `${this.config.url}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;
    window.location.href = authUrl;
  },

  /**
   * Register with Email & Password
   */
  async signUpWithEmail(email, password, fullName = '') {
    if (!this.config.isConnected) throw new Error('Supabase is not connected.');

    const name = fullName.trim() || email.split('@')[0];
    const res = await fetch(`${this.config.url}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': this.config.anonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        data: {
          full_name: name,
          name: name
        }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.msg || data.error_description || data.message || 'Signup failed');
    }

    if (data.access_token) {
      this.saveSession(data);
      const profile = await this.syncProfile(data.user);
      return this.formatScholarUser(data.user, profile);
    }

    return { needsConfirmation: true, email: data.email };
  },

  /**
   * Sign In with Email & Password
   */
  async signInWithEmail(email, password) {
    if (!this.config.isConnected) throw new Error('Supabase is not connected.');

    const res = await fetch(`${this.config.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': this.config.anonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error_description || data.msg || data.message || 'Invalid email or password');
    }

    this.saveSession(data);
    const profile = await this.syncProfile(data.user);
    return this.formatScholarUser(data.user, profile);
  },

  /**
   * Fetch authenticated user from Supabase using access token
   */
  async fetchUser(token) {
    if (!token || !this.config.isConnected) return null;
    try {
      const res = await fetch(`${this.config.url}/auth/v1/user`, {
        headers: {
          'apikey': this.config.anonKey,
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Fetch Supabase user failed', e);
    }
    return null;
  },

  /**
   * Upsert profile in PostgreSQL public.profiles table
   */
  async syncProfile(user) {
    if (!user || !this.config.isConnected) return null;

    const email = user.email || '';
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0] || 'Scholar';
    const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || '';
    const institution = email.includes('.edu') ? email.split('@')[1].toUpperCase() : 'Global Research Faculty';
    const username = (email ? email.split('@')[0] : 'scholar') + '_' + user.id.slice(0, 4);

    const profileData = {
      id: user.id,
      username: username,
      full_name: fullName,
      avatar_url: avatar,
      institution: institution,
      field_of_study: 'Frontier Sciences'
    };

    try {
      const token = this.getAccessToken() || this.config.anonKey;
      await fetch(`${this.config.url}/rest/v1/profiles`, {
        method: 'POST',
        headers: {
          'apikey': this.config.anonKey,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(profileData)
      });
    } catch (e) {
      console.warn('Failed to upsert profile to Supabase:', e);
    }

    return profileData;
  },

  /**
   * Format standard Scholar user object for Folerio UI
   */
  formatScholarUser(user, profile = {}) {
    const name = profile.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Scholar';
    const avatar = profile.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || '';
    const initials = name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'SC';

    return {
      id: user.id,
      name: name,
      email: user.email,
      title: 'Verified Scholar',
      institution: profile.institution || (user.email?.includes('.edu') ? user.email.split('@')[1] : 'Independent Scholar'),
      department: 'Faculty of Science',
      field: profile.field_of_study || 'Frontier Sciences',
      avatarUrl: avatar,
      avatarInitials: initials,
      isVerified: true,
      rawUser: user
    };
  },

  /**
   * Handles OAuth callback from Google (URL hash fragment `#access_token=...`)
   */
  async handleAuthRedirect() {
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token=')) return null;

    try {
      const params = new URLSearchParams(hash.replace(/^#/, ''));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const expiresIn = params.get('expires_in');
      const tokenType = params.get('token_type');

      if (accessToken) {
        const session = {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
          token_type: tokenType
        };
        this.saveSession(session);

        // Clean tokens from browser URL without reloading
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }

        // Fetch user metadata & upsert profile
        const user = await this.fetchUser(accessToken);
        if (user) {
          session.user = user;
          this.saveSession(session);
          const profile = await this.syncProfile(user);
          return this.formatScholarUser(user, profile);
        }
      }
    } catch (err) {
      console.error('Error handling Supabase OAuth redirect:', err);
    }
    return null;
  },

  /**
   * Check currently logged in user session on startup
   */
  async getCurrentUser() {
    const session = this.getSession();
    if (!session || !session.access_token) return null;

    // Validate with Supabase
    const user = await this.fetchUser(session.access_token);
    if (user) {
      const profile = await this.syncProfile(user);
      return this.formatScholarUser(user, profile);
    }

    // If token expired, clear session
    this.clearSession();
    return null;
  },

  /**
   * Sign out
   */
  async signOut() {
    const token = this.getAccessToken();
    if (token && this.config.isConnected) {
      try {
        await fetch(`${this.config.url}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            'apikey': this.config.anonKey,
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (e) {
        console.warn('Supabase logout API error:', e);
      }
    }
    this.clearSession();
    localStorage.removeItem('folerio_user_profile');
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
        const session = this.getSession();
        const payload = {
          user_id: session?.user?.id || null,
          paper_title: post.title,
          paper_url: post.doi,
          authors: post.authors,
          field_tag: post.field,
          theme: post.theme,
          slides: post.slides,
          likes_count: post.likes || 1,
          comments: []
        };

        const authToken = this.getAccessToken() || this.config.anonKey;
        const response = await fetch(`${this.config.url}/rest/v1/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.config.anonKey,
            'Authorization': `Bearer ${authToken}`,
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
   * Record interactions (likes, bookmarks, comments, replies)
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
        target.comments.push(data);
        if (this.config.isConnected) {
          try {
            await fetch(`${this.config.url}/rest/v1/posts?id=eq.${postId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': this.config.anonKey,
                'Authorization': `Bearer ${this.config.anonKey}`
              },
              body: JSON.stringify({ comments: target.comments })
            });
          } catch (e) {
            console.warn('Sync comment to Supabase failed', e);
          }
        }
      } else if (type === 'reply' && data) {
        if (!target.comments) target.comments = [];
        const comment = target.comments.find(c => c.id === data.commentId);
        if (comment) {
          if (!comment.replies) comment.replies = [];
          comment.replies.push(data.reply);
        }
        if (this.config.isConnected) {
          try {
            await fetch(`${this.config.url}/rest/v1/posts?id=eq.${postId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': this.config.anonKey,
                'Authorization': `Bearer ${this.config.anonKey}`
              },
              body: JSON.stringify({ comments: target.comments })
            });
          } catch (e) {
            console.warn('Sync reply to Supabase failed', e);
          }
        }
      }

      localStorage.setItem(this.STORAGE_KEY_LOCAL_POSTS, JSON.stringify(posts));
    }
  }
};


/**
 * app.js — Folerio Core Application Logic
 * Interactive horizontal carousels, live Folio Studio, sidebar navigation,
 * theme management (dark/light), and intellectual discourse mechanics.
 */

// Default Seed Folios to make the dispatch feed immediately rich and intellectually stimulating
const SEED_PAPERS = [
  {
    id: 'seed-af3',
    title: 'Accurate structure prediction of biomolecular interactions with AlphaFold 3',
    authors: 'Abramson, Adler, Dunger et al. (Google DeepMind / Isomorphic Labs)',
    field: 'Biotech & Genetics',
    doi: 'https://doi.org/10.1038/s41586-024-07487-w',
    theme: 'obsidian',
    likes: 142,
    bookmarked: false,
    liked: false,
    comments: [
      {
        id: 'c-1',
        author: 'Dr. Sarah Lin (Stanford)',
        text: 'The nucleic acid co-folding resolution is where this really outclasses AF2.',
        time: '2h ago',
        replies: [
          {
            id: 'r-1',
            author: 'Elena Rostova',
            text: 'Agreed, especially with modified RNA nucleotides and non-canonical base pairs.',
            time: '1h ago'
          }
        ]
      },
      {
        id: 'c-2',
        author: 'Marcus V. (Oxford)',
        text: 'Does anyone have benchmarks on disordered loop segments?',
        time: '3h ago',
        replies: []
      }
    ],
    slides: [
      {
        type: 'hero',
        hook: 'AlphaFold 3 moves beyond proteins to predict 3D structures across the entire biomolecular universe: DNA, RNA, ligands, and post-translational chemical modifications in a single unified diffusion model.'
      },
      {
        type: 'method',
        title: 'Diffusion Module over Raw Atom Coordinates',
        content: 'Replaces AF2’s Evoformer geometry module with an adapted Diffusion architecture. Instead of predicting residue orientations directly, it iteratively refines 3D Cartesian atom coordinates from pure spatial Gaussian noise, constrained by Pairformer cross-attention.'
      },
      {
        type: 'results',
        title: '50% Improvement in Complex Accuracy',
        content: 'Achieves a >50% improvement over existing docking and prediction methods for protein-ligand and protein-nucleic acid complexes. Successfully models antibody-antigen interaction interfaces with atomistic fidelity without requiring physical docking priors.'
      },
      {
        type: 'critique',
        title: 'Limitations & Remaining Frontiers',
        content: 'Struggles with chirality in rare non-canonical amino acids; does not predict conformational dynamics or multiple functional states (only static ground-state predictions). Full model weights initially restricted behind server access.'
      }
    ]
  },
  {
    id: 'seed-transformer',
    title: 'Attention Is All You Need: Eliminating Recurrence in Sequence Modeling',
    authors: 'Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin (Google Brain)',
    field: 'AI & Machine Learning',
    doi: 'https://arxiv.org/abs/1706.03762',
    theme: 'deepblue',
    likes: 389,
    bookmarked: true,
    liked: true,
    comments: [
      { author: 'Marcus V.', text: 'The foundational architecture of the modern AI revolution.' }
    ],
    slides: [
      {
        type: 'hero',
        hook: 'Dispenses entirely with recurrence and convolutions, relying solely on multi-head self-attention mechanisms to compute representations of its input and output, enabling massive parallelization during training.'
      },
      {
        type: 'method',
        title: 'Scaled Dot-Product & Multi-Head Attention',
        content: 'Maps queries and keys of dimension dk to attention weights via softmax((QK^T)/sqrt(dk))V. Stacks 8 parallel attention heads to allow the model to jointly attend to information from different representation subspaces at distinct sequence positions.'
      },
      {
        type: 'results',
        title: '28.4 BLEU on WMT 2014 English-to-German',
        content: 'Outperformed existing state-of-the-art models including ensembles, improving by over 2 BLEU points while requiring a fraction of the training cost (3.5 days on 8 P100 GPUs).'
      },
      {
        type: 'critique',
        title: 'Computational Quadratic Bottleneck',
        content: 'The O(N^2) memory and time complexity with respect to sequence length N creates substantial hurdles for long-context documents and high-resolution spatial modalities.'
      }
    ]
  },
  {
    id: 'seed-neuro-bci',
    title: 'A High-Density Wireless Cortical Interface for Restoring Dexterous Speech Synthesis',
    authors: 'Metzger, Littlejohn, Silva et al. (UCSF Weill Institute for Neurosciences)',
    field: 'Neuroscience',
    doi: 'https://doi.org/10.1038/s41586-023-06443-4',
    theme: 'editorial',
    likes: 87,
    bookmarked: false,
    liked: false,
    comments: [],
    slides: [
      {
        type: 'hero',
        hook: 'Decodes electrocorticographic (ECoG) neural signals directly into natural spoken sentences and facial expressions at 78 words per minute using a personalized digital avatar.'
      },
      {
        type: 'method',
        title: '253-Channel Subdural ECoG Array',
        content: 'Implanted a 253-channel micro-electrocorticography grid over the sensorimotor cortex of a paralyzed participant. Recurrent neural network models decoded discrete articulatory vocal tract gestures rather than whole words directly.'
      },
      {
        type: 'results',
        title: '78 WPM at 25.5% Median Word Error Rate',
        content: 'Demonstrated real-time continuous speech synthesis matching conversational pace, outperforming previous spelling-based BCIs by more than 3x.'
      },
      {
        type: 'critique',
        title: 'Surgical Invasiveness & Neural Drift',
        content: 'Requires subdural craniotomy. Long-term biological electrode drift and inflammatory encapsulation over multiple years require continuous adaptive recalibration of decoder algorithms.'
      }
    ]
  }
];

// Archetype Templates Configurations
const FOLIO_ARCHETYPES = {
  empirical: {
    titlePlaceholder: 'e.g. Accurate structure prediction of biomolecular interactions with AlphaFold 3',
    slide1Label: 'The 1-Sentence Breakthrough Claim *',
    slide1Placeholder: 'What did this paper discover or build in plain, punchy academic language?',
    slide2Label: 'Slide 2: Methodology & Experimental Framework',
    slide2Placeholder: 'How did they test or achieve this? Architecture, dataset size, experimental setup...',
    slide3Label: 'Slide 3: Quantitative Findings & Benchmarks',
    slide3Placeholder: 'Concrete numbers, accuracy improvements, statistical significance, or benchmark wins...',
    slide4Label: 'Slide 4: Critical Frontier & Open Questions',
    slide4Placeholder: 'Where does it fall short? What remains unresolved for future scholars?'
  },
  method: {
    titlePlaceholder: 'e.g. FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning',
    slide1Label: 'The Core Technical Problem & Proposed System *',
    slide1Placeholder: 'What bottleneck or architectural limitation does this system eliminate?',
    slide2Label: 'Slide 2: System Architecture & Algorithmic Pipeline',
    slide2Placeholder: 'Algorithmic modifications, memory hierarchy optimizations, caching, or parallelization scheme...',
    slide3Label: 'Slide 3: Benchmark Specs & Computational Performance',
    slide3Placeholder: 'FLOPs utilization, speedup factors, memory reduction, latency comparisons...',
    slide4Label: 'Slide 4: Implementation Constraints & Future Extensions',
    slide4Placeholder: 'Hardware requirements, precision tradeoffs, corner cases, or upcoming hardware adaptations...'
  },
  hypothesis: {
    titlePlaceholder: 'e.g. The Neuro-Epigenetic Priming Theory of Long-Term Memory Consolidation',
    slide1Label: 'The Core Theoretical Thesis *',
    slide1Placeholder: 'State the non-consensus theoretical proposition or mechanism in 1 bold statement.',
    slide2Label: 'Slide 2: Mechanistic Principles & Causality',
    slide2Placeholder: 'What is the causal sequence or biological/physical pathway driving this phenomenon?',
    slide3Label: 'Slide 3: Observable Signatures & Testable Predictions',
    slide3Placeholder: 'What concrete experimental predictions would confirm or observe this mechanism?',
    slide4Label: 'Slide 4: Falsification Criteria & Counterarguments',
    slide4Placeholder: 'Under what specific empirical observations would this hypothesis be conclusively disproven?'
  },
  review: {
    titlePlaceholder: 'e.g. The Quantum Coherence in Biological Systems Debate: A Decade in Review',
    slide1Label: 'State of Academic Consensus *',
    slide1Placeholder: 'What has been the standard orthodox consensus or baseline belief in the literature?',
    slide2Label: 'Slide 2: The Emerging Disputation or Anomaly',
    slide2Placeholder: 'What conflicting experimental observations or papers have destabilized the old consensus?',
    slide3Label: 'Slide 3: Synthesis of Multi-Study Evidence',
    slide3Placeholder: 'Reconciling opposing studies: where do the methodologies diverge and explain contradictions?',
    slide4Label: 'Slide 4: Unresolved Horizons & Grand Challenges',
    slide4Placeholder: 'The 3 defining questions the field must answer over the next 5 years...'
  }
};

// App State
const state = {
  posts: [],
  currentTopic: 'all',
  searchQuery: '',
  showSavedOnly: false,
  savedPostIds: new Set(['seed-transformer']),
  likedPostIds: new Set(['seed-transformer']),
  currentTheme: 'dark',
  creator: {
    activeSlideIndex: 0,
    selectedTheme: 'obsidian',
    selectedArchetype: 'empirical'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  SupabaseBridge.init();
  updateSupabaseStatusIndicator();
  await loadPosts();
  initEventListeners();
  initCreatorStudio();
  updateSavedBadge();
});

/* ==========================================================================
   Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('folerio_theme') || localStorage.getItem('noesis_theme') || 'dark';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  state.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('folerio_theme', theme);

  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  if (themeIcon && themeLabel) {
    if (theme === 'light') {
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Light Mode';
    } else {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Dark Mode';
    }
  }
}

function toggleTheme() {
  const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}

function updateSupabaseStatusIndicator() {
  const dot = document.getElementById('dbIndicator');
  const statusBox = document.getElementById('connectionStatusBox');
  const statusText = document.getElementById('statusText');
  const statusDesc = document.getElementById('statusDesc');

  if (SupabaseBridge.config.isConnected) {
    if (dot) dot.className = 'db-status-dot connected';
    if (statusBox) {
      statusText.textContent = 'Connected to Supabase Cloud';
      statusDesc.textContent = `Syncing directly with ${SupabaseBridge.config.url}. Folios are shared globally in real time.`;
    }
  } else {
    if (dot) dot.className = 'db-status-dot';
    if (statusBox) {
      statusText.textContent = 'Local Storage Active';
      statusDesc.textContent = 'No database attached yet. All your created Folios and bookmarks persist securely in browser storage.';
    }
  }
}

async function loadPosts() {
  const cloudOrLocal = await SupabaseBridge.getPosts();
  if (cloudOrLocal && cloudOrLocal.length > 0) {
    state.posts = cloudOrLocal;
  } else {
    state.posts = [...SEED_PAPERS];
    localStorage.setItem(SupabaseBridge.STORAGE_KEY_LOCAL_POSTS, JSON.stringify(state.posts));
  }
  renderFeed();
}

function updateSavedBadge() {
  const badge = document.getElementById('savedCountBadge');
  if (badge) {
    badge.textContent = state.savedPostIds.size;
  }
}

/**
 * Render Posts Feed with horizontal swipeable carousels
 */
function renderFeed() {
  const container = document.getElementById('postsFeed');
  const emptyState = document.getElementById('emptyFeedState');
  const viewText = document.getElementById('currentViewText');

  if (viewText) {
    if (state.showSavedOnly) {
      viewText.textContent = 'Library: Saved Folios';
    } else if (state.currentTopic !== 'all') {
      viewText.textContent = `Field: ${state.currentTopic}`;
    } else {
      viewText.textContent = 'Dispatch: All Disciplines';
    }
  }

  let filtered = state.posts.filter(p => {
    // Topic filter
    if (state.currentTopic !== 'all' && p.field !== state.currentTopic) return false;
    // Saved filter
    if (state.showSavedOnly && !state.savedPostIds.has(p.id)) return false;
    // Search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchAuthors = (p.authors || '').toLowerCase().includes(q);
      const matchHook = (p.slides[0]?.hook || '').toLowerCase().includes(q);
      const matchField = (p.field || '').toLowerCase().includes(q);
      if (!matchTitle && !matchAuthors && !matchHook && !matchField) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  container.innerHTML = filtered.map(post => renderPostCard(post)).join('');

  // Attach carousel scroll listeners & buttons
  attachCarouselEvents();
  updateSavedBadge();
}

/**
 * Generate HTML string for single Folio card
 */
function renderPostCard(post) {
  const isLiked = state.likedPostIds.has(post.id);
  const isSaved = state.savedPostIds.has(post.id);
  const slideCount = post.slides.length;

  const slidesHTML = post.slides.map((s, idx) => {
    if (idx === 0) {
      return `
        <div class="post-slide slide-type-hero" data-index="${idx}">
          <div class="slide-badge-row">
            <span class="slide-label">● Core Thesis & Breakthrough</span>
            <span class="post-tag">${post.field}</span>
          </div>
          <div>
            <h2 class="paper-hero-title">${post.title}</h2>
            <div class="breakthrough-hook">"${s.hook}"</div>
          </div>
          <div class="slide-footer-row">
            <span class="paper-authors-tag">${post.authors}</span>
            <span class="swipe-hint">Swipe for deep dive &rarr;</span>
          </div>
        </div>
      `;
    } else {
      const stepTags = ['[01] Thesis', '[02] Methodology & Specs', '[03] Quantitative Evidence', '[04] Critical Frontier'];
      return `
        <div class="post-slide slide-type-dive" data-index="${idx}">
          <div class="slide-badge-row">
            <span class="dive-section-tag">${stepTags[idx] || '[Deep Dive]'}</span>
            <span class="post-tag">${post.field}</span>
          </div>
          <div>
            <h3 class="dive-heading">${s.title || 'In-Depth Breakdown'}</h3>
            <div class="dive-content">
              <p>${s.content}</p>
            </div>
          </div>
          <div class="slide-footer-row">
            <span>${idx === slideCount - 1 && post.doi ? `<a href="${post.doi}" target="_blank" rel="noreferrer">Open Primary Source (${post.doi.slice(0, 24)}...)</a>` : 'Slide ' + (idx + 1) + ' of ' + slideCount}</span>
            <span>${idx < slideCount - 1 ? 'Swipe &rarr;' : 'End of Folio'}</span>
          </div>
        </div>
      `;
    }
  }).join('');

  const dotsHTML = post.slides.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>`).join('');
  const totalDiscussions = countTotalDiscussions(post);

  const commentsHTML = (post.comments || []).map(c => renderCommentThread(c, post.id)).join('');

  return `
    <article class="post-card-wrapper" id="post-${post.id}">
      <!-- Author & Header Row -->
      <header class="post-header">
        <div class="author-info">
          <div class="author-avatar">${getInitials(post.authors)}</div>
          <div class="author-meta">
            <span class="author-name">${post.authors}</span>
            <span class="author-sub">${post.field} · ${formatDate(post.createdAt)}</span>
          </div>
        </div>
        <span class="post-tag">${post.field}</span>
      </header>

      <!-- Horizontal Multi-Slide Carousel -->
      <div class="carousel-container" data-post-id="${post.id}">
        <button class="carousel-btn prev" aria-label="Previous Slide">&larr;</button>
        <div class="carousel-track">
          ${slidesHTML}
        </div>
        <button class="carousel-btn next" aria-label="Next Slide">&rarr;</button>
        <div class="carousel-dots">
          ${dotsHTML}
        </div>
      </div>

      <!-- Action Bar (Cite/Like, Discussion, Save, Share) -->
      <div class="post-actions-bar">
        <div class="action-group">
          <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')" title="Endorse this research">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="like-count">${post.likes || 0}</span>
          </button>

          <button class="action-btn" onclick="toggleCommentsDrawer('${post.id}')" title="Scholarly peer discussion & replies">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="discuss-count">${totalDiscussions} Discuss</span>
          </button>
        </div>

        <div class="action-group">
          <button class="action-btn ${isSaved ? 'bookmarked' : ''}" onclick="toggleBookmark('${post.id}')" title="Save to Personal Library">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>${isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button class="action-btn" onclick="openShareModal('${post.id}')" title="Export & Share Folio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Expandable Discussion Drawer -->
      <div class="discussion-drawer" id="comments-${post.id}">
        <div class="comment-input-row">
          <input type="text" id="comment-input-${post.id}" placeholder="Add a scholarly critique or observation..." onkeydown="if(event.key==='Enter') submitComment('${post.id}')">
          <button class="btn btn-primary btn-sm" onclick="submitComment('${post.id}')">Send</button>
        </div>
        <div class="comments-list">
          ${commentsHTML.length > 0 ? commentsHTML : '<span style="color:var(--text-muted);font-size:0.82rem;">No critiques yet. Initiate the academic discussion.</span>'}
        </div>
      </div>
    </article>
  `;
}

/**
 * Attach swipe and button controls to all carousel tracks
 */
function attachCarouselEvents() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    const dots = container.querySelectorAll('.dot');

    if (!track) return;

    // Track scroll event to update active dot
    track.addEventListener('scroll', () => {
      const scrollPos = track.scrollLeft;
      const slideWidth = track.clientWidth;
      const activeIdx = Math.round(scrollPos / slideWidth);

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    });

    // Arrow button controls
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    });

    // Click on dots to jump
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        track.scrollTo({ left: track.clientWidth * idx, behavior: 'smooth' });
      });
    });

    // Touch gesture support for mobile / tablet
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) {
        track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
      } else if (diff < -50) {
        track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
      }
    }, { passive: true });
  });
}

/**
 * Social Action Handlers
 */
async function toggleLike(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const isLiked = state.likedPostIds.has(postId);
  if (isLiked) {
    state.likedPostIds.delete(postId);
    post.likes = Math.max(0, (post.likes || 1) - 1);
  } else {
    state.likedPostIds.add(postId);
    post.likes = (post.likes || 0) + 1;
    SupabaseBridge.recordInteraction(postId, 'like');
  }

  // Update DOM directly for instant response
  const card = document.getElementById(`post-${postId}`);
  if (card) {
    const likeBtn = card.querySelector('.action-btn');
    const likeCount = card.querySelector('.like-count');
    if (likeBtn) likeBtn.classList.toggle('liked', !isLiked);
    if (likeCount) likeCount.textContent = post.likes;
  }
}

function toggleBookmark(postId) {
  const isSaved = state.savedPostIds.has(postId);
  if (isSaved) {
    state.savedPostIds.delete(postId);
  } else {
    state.savedPostIds.add(postId);
    SupabaseBridge.recordInteraction(postId, 'bookmark');
  }

  updateSavedBadge();

  if (state.showSavedOnly) {
    renderFeed();
  } else {
    const card = document.getElementById(`post-${postId}`);
    if (card) {
      const bookBtn = card.querySelectorAll('.action-btn')[2];
      if (bookBtn) {
        bookBtn.classList.toggle('bookmarked', !isSaved);
        bookBtn.querySelector('span').textContent = !isSaved ? 'Saved' : 'Save';
      }
    }
  }
}

function toggleCommentsDrawer(postId) {
  const drawer = document.getElementById(`comments-${postId}`);
  if (!drawer) return;
  drawer.classList.toggle('open');
  if (drawer.classList.contains('open')) {
    const input = document.getElementById(`comment-input-${postId}`);
    setTimeout(() => input?.focus(), 150);
  }
}

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Recursively count all top-level comments and nested replies
 */
function countTotalDiscussions(post) {
  if (!post || !post.comments || !Array.isArray(post.comments)) return 0;
  let total = 0;
  function countComment(c) {
    if (!c) return;
    total++;
    if (c.replies && Array.isArray(c.replies)) {
      c.replies.forEach(countComment);
    }
  }
  post.comments.forEach(countComment);
  return total;
}

/**
 * Render a single threaded peer critique and its nested replies
 */
function renderCommentThread(c, postId) {
  if (!c) return '';
  const commentId = c.id || ('c-' + Math.random().toString(36).substring(2, 9));
  c.id = commentId; // persist id in object
  const author = c.author || 'Anonymous Scholar';
  const time = c.time || 'Recently';
  const text = c.text || '';
  const replies = Array.isArray(c.replies) ? c.replies : [];

  const repliesHTML = replies.map(r => {
    const rAuthor = r.author || 'Anonymous Scholar';
    const rTime = r.time || 'Recently';
    const rText = r.text || '';
    return `
      <div class="reply-item">
        <div class="comment-header">
          <span class="comment-author">${escapeHTML(rAuthor)}</span>
          <span class="comment-time">${escapeHTML(rTime)}</span>
        </div>
        <div class="comment-text">${escapeHTML(rText)}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="comment-thread" id="thread-${postId}-${commentId}">
      <div class="comment-item">
        <div class="comment-header">
          <span class="comment-author">${escapeHTML(author)}</span>
          <span class="comment-time">${escapeHTML(time)}</span>
        </div>
        <div class="comment-text">${escapeHTML(text)}</div>
        <div class="comment-actions">
          <button class="reply-btn" onclick="toggleReplyBox('${postId}', '${commentId}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 17 4 12 9 7"></polyline>
              <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
            </svg>
            Reply
          </button>
        </div>
        <div class="reply-input-box" id="reply-box-${postId}-${commentId}" style="display: none;">
          <input type="text" id="reply-input-${postId}-${commentId}" placeholder="Reply to ${escapeHTML(author)}..." onkeydown="if(event.key==='Enter') submitReply('${postId}', '${commentId}')">
          <button class="btn btn-primary btn-sm" onclick="submitReply('${postId}', '${commentId}')">Reply</button>
        </div>
      </div>
      ${repliesHTML.length > 0 ? `<div class="comment-replies-list" id="replies-${postId}-${commentId}">${repliesHTML}</div>` : `<div class="comment-replies-list" id="replies-${postId}-${commentId}" style="display:none;"></div>`}
    </div>
  `;
}

/**
 * Toggle inline reply input box for a specific comment
 */
function toggleReplyBox(postId, commentId) {
  const box = document.getElementById(`reply-box-${postId}-${commentId}`);
  if (!box) return;
  const isHidden = box.style.display === 'none';
  box.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    const input = document.getElementById(`reply-input-${postId}-${commentId}`);
    setTimeout(() => input?.focus(), 80);
  }
}

/**
 * Submit a nested peer reply to an existing comment
 */
function submitReply(postId, commentId) {
  const input = document.getElementById(`reply-input-${postId}-${commentId}`);
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  const post = state.posts.find(p => p.id === postId);
  if (!post || !post.comments) return;

  const targetComment = post.comments.find(c => c.id === commentId);
  if (!targetComment) return;

  if (!targetComment.replies) targetComment.replies = [];
  const newReply = {
    id: 'r-' + Date.now(),
    author: 'Ihtisham Naeem',
    text: text,
    time: 'Just now'
  };
  targetComment.replies.push(newReply);

  input.value = '';
  toggleReplyBox(postId, commentId);

  // Sync to Supabase & LocalStorage
  SupabaseBridge.recordInteraction(postId, 'reply', { commentId, reply: newReply });

  // Update UI instantly
  refreshCommentsView(postId);
}

/**
 * Refresh comments list and total discussion count on the card
 */
function refreshCommentsView(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const drawer = document.getElementById(`comments-${postId}`);
  if (drawer) {
    const list = drawer.querySelector('.comments-list');
    if (list) {
      const commentsHTML = (post.comments || []).map(c => renderCommentThread(c, post.id)).join('');
      list.innerHTML = commentsHTML.length > 0 
        ? commentsHTML 
        : '<span style="color:var(--text-muted);font-size:0.82rem;">No critiques yet. Initiate the academic discussion.</span>';
    }
  }

  const card = document.getElementById(`post-${postId}`);
  if (card) {
    const countEl = card.querySelector('.discuss-count');
    if (countEl) {
      countEl.textContent = `${countTotalDiscussions(post)} Discuss`;
    }
  }
}

/**
 * Submit top-level comment / critique
 */
function submitComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.comments) post.comments = [];
  const newComment = {
    id: 'c-' + Date.now(),
    author: 'Ihtisham Naeem',
    text: text,
    time: 'Just now',
    replies: []
  };
  post.comments.push(newComment);

  input.value = '';

  // Sync to Supabase & LocalStorage
  SupabaseBridge.recordInteraction(postId, 'comment', newComment);

  // Update UI instantly
  refreshCommentsView(postId);
}


/**
 * Folio Studio & Live Card Generator Setup
 */
function initCreatorStudio() {
  const inputs = ['postTitle', 'postAuthors', 'postField', 'postDoi', 'postHook', 'postMethod', 'postResults', 'postCritique'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => updateCreatorLivePreview());
  });

  // Archetype Template Selector
  document.querySelectorAll('.template-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.template-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const archetypeKey = chip.dataset.template;
      state.creator.selectedArchetype = archetypeKey;
      applyFolioArchetype(archetypeKey);
    });
  });

  // Theme selection chips inside creator
  document.querySelectorAll('.theme-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.theme-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.creator.selectedTheme = chip.dataset.theme;
      updateCreatorLivePreview();
    });
  });

  // Slide navigation in preview
  document.getElementById('prevPreviewSlide')?.addEventListener('click', () => {
    state.creator.activeSlideIndex = Math.max(0, state.creator.activeSlideIndex - 1);
    updateCreatorLivePreview();
  });

  document.getElementById('nextPreviewSlide')?.addEventListener('click', () => {
    state.creator.activeSlideIndex = Math.min(3, state.creator.activeSlideIndex + 1);
    updateCreatorLivePreview();
  });

  // Autofill Demo Paper
  document.getElementById('autofillDemoBtn')?.addEventListener('click', () => {
    document.getElementById('postTitle').value = 'Room-temperature and ambient-pressure superconductivity in modified lead apatite (LK-99) analysis';
    document.getElementById('postAuthors').value = 'Lee, Kim, Kwon (Condensed Matter Physics Lab)';
    document.getElementById('postField').value = 'Quantum & Physics';
    document.getElementById('postDoi').value = 'https://arxiv.org/abs/2307.12008';
    document.getElementById('postHook').value = 'Independent replication efforts demonstrate that Cu2S impurities, rather than bulk superconductivity, account for the sharp electrical resistivity drop and magnetic levitation.';
    document.getElementById('postMethod').value = 'Synthesized lead-apatite crystals using high-vacuum solid-state sintering; performed X-ray diffraction, four-probe resistivity measurements, and SQUID magnetometry across 100K-400K.';
    document.getElementById('postResults').value = 'Resistivity drop at 104°C corresponds precisely to the known first-order structural phase transition of copper sulfide (Cu2S). No Meissner effect or zero resistance verified.';
    document.getElementById('postCritique').value = 'Emphasizes the vital necessity of rapid open-science replications and public code/material sharing to resolve controversial high-stakes physical claims.';
    updateCreatorLivePreview();
  });

  // Export current preview as PNG
  document.getElementById('downloadCardPngBtn')?.addEventListener('click', () => {
    const data = getCreatorFormData();
    CardGenerator.exportToCanvas(data, state.creator.activeSlideIndex, state.creator.selectedTheme);
  });

  // Publish Folio to Feed
  document.getElementById('publishPostBtn')?.addEventListener('click', async () => {
    const data = getCreatorFormData();
    if (!data.title || !data.hook) {
      alert('Please provide at least a Paper/Treatise Title and the 1-Sentence Core Thesis.');
      return;
    }

    const newPost = {
      id: 'folio-' + Date.now(),
      title: data.title,
      authors: data.authors || 'Independent Scholar',
      field: data.field,
      doi: data.doi,
      theme: state.creator.selectedTheme,
      likes: 1,
      createdAt: new Date().toISOString(),
      comments: [],
      slides: [
        { type: 'hero', hook: data.hook },
        { type: 'method', title: 'Methodology & Specs', content: data.method || 'Standard experimental protocols applied.' },
        { type: 'results', title: 'Quantitative Findings', content: data.results || 'Data highlights significant effects across primary parameters.' },
        { type: 'critique', title: 'Critical Frontier', content: data.critique || 'Future cross-validation studies needed.' }
      ]
    };

    await SupabaseBridge.createPost(newPost);
    state.posts.unshift(newPost);
    state.likedPostIds.add(newPost.id);

    // Close modal & reset
    document.getElementById('createPostModal').style.display = 'none';
    document.getElementById('paperForm').reset();
    renderFeed();
  });

  updateCreatorLivePreview();
}

function applyFolioArchetype(key) {
  const arch = FOLIO_ARCHETYPES[key] || FOLIO_ARCHETYPES.empirical;
  const titleInput = document.getElementById('postTitle');
  const slide1Label = document.getElementById('lblSlide1Label');
  const slide1Input = document.getElementById('postHook');
  const slide2Label = document.getElementById('lblSlide2Label');
  const slide2Input = document.getElementById('postMethod');
  const slide3Label = document.getElementById('lblSlide3Label');
  const slide3Input = document.getElementById('postResults');
  const slide4Label = document.getElementById('lblSlide4Label');
  const slide4Input = document.getElementById('postCritique');

  if (titleInput) titleInput.placeholder = arch.titlePlaceholder;
  if (slide1Label) slide1Label.textContent = arch.slide1Label;
  if (slide1Input) slide1Input.placeholder = arch.slide1Placeholder;
  if (slide2Label) slide2Label.textContent = arch.slide2Label;
  if (slide2Input) slide2Input.placeholder = arch.slide2Placeholder;
  if (slide3Label) slide3Label.textContent = arch.slide3Label;
  if (slide3Input) slide3Input.placeholder = arch.slide3Placeholder;
  if (slide4Label) slide4Label.textContent = arch.slide4Label;
  if (slide4Input) slide4Input.placeholder = arch.slide4Placeholder;

  updateCreatorLivePreview();
}

function getCreatorFormData() {
  return {
    title: document.getElementById('postTitle')?.value.trim() || '',
    authors: document.getElementById('postAuthors')?.value.trim() || '',
    field: document.getElementById('postField')?.value || 'AI & Machine Learning',
    doi: document.getElementById('postDoi')?.value.trim() || '',
    hook: document.getElementById('postHook')?.value.trim() || '',
    method: document.getElementById('postMethod')?.value.trim() || '',
    results: document.getElementById('postResults')?.value.trim() || '',
    critique: document.getElementById('postCritique')?.value.trim() || ''
  };
}

function updateCreatorLivePreview() {
  const data = getCreatorFormData();
  const stage = document.getElementById('liveCardRender');
  const counter = document.getElementById('previewSlideCounter');

  if (!stage) return;

  const currentTheme = state.creator.selectedTheme;
  stage.className = `live-card theme-${currentTheme}`;
  stage.innerHTML = CardGenerator.renderPreviewHTML(data, state.creator.activeSlideIndex, currentTheme);

  if (counter) {
    counter.textContent = `Slide ${state.creator.activeSlideIndex + 1} of 4`;
  }
}

/**
 * Filter & Sidebar Event Listeners
 */
function initEventListeners() {
  // Theme Toggle
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    toggleTheme();
  });

  // Top topic filter pills
  document.querySelectorAll('.topic-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      syncTopicSelection(btn.dataset.topic);
    });
  });

  // Sidebar discipline items
  document.querySelectorAll('.discipline-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      syncTopicSelection(btn.dataset.topic);
      // Close mobile sidebar if open
      document.getElementById('sidebarNav')?.classList.remove('mobile-open');
    });
  });

  function syncTopicSelection(topic) {
    state.currentTopic = topic;
    state.showSavedOnly = false;

    // Sync pills
    document.querySelectorAll('.topic-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.topic === topic);
    });
    // Sync sidebar disciplines
    document.querySelectorAll('.discipline-nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.topic === topic);
    });
    // Sync nav links
    document.getElementById('navFeedBtn')?.classList.add('active');
    document.getElementById('navSavedBtn')?.classList.remove('active');
    document.getElementById('filterSavedOnly')?.classList.remove('active');

    renderFeed();
  }

  // Sidebar Nav: Dispatch Feed
  document.getElementById('navFeedBtn')?.addEventListener('click', () => {
    syncTopicSelection('all');
  });

  // Sidebar Nav: Saved Folios
  document.getElementById('navSavedBtn')?.addEventListener('click', () => {
    state.showSavedOnly = true;
    document.getElementById('navSavedBtn')?.classList.add('active');
    document.getElementById('navFeedBtn')?.classList.remove('active');
    document.getElementById('filterSavedOnly')?.classList.add('active');
    renderFeed();
  });

  // Top Bar Saved Toggle Button
  document.getElementById('filterSavedOnly')?.addEventListener('click', (e) => {
    state.showSavedOnly = !state.showSavedOnly;
    e.currentTarget.classList.toggle('active', state.showSavedOnly);
    document.getElementById('navSavedBtn')?.classList.toggle('active', state.showSavedOnly);
    document.getElementById('navFeedBtn')?.classList.toggle('active', !state.showSavedOnly);
    renderFeed();
  });

  // Sidebar Nav: Folio Studio
  document.getElementById('navStudioBtn')?.addEventListener('click', () => {
    openFolioStudio();
  });

  // Search input
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    renderFeed();
  });

  // Modals opening/closing
  const createModal = document.getElementById('createPostModal');
  function openFolioStudio() {
    createModal.style.display = 'flex';
    updateCreatorLivePreview();
  }

  document.getElementById('openNewPostBtn')?.addEventListener('click', openFolioStudio);
  document.getElementById('topDraftFolioBtn')?.addEventListener('click', openFolioStudio);
  document.getElementById('closeCreatePostBtn')?.addEventListener('click', () => createModal.style.display = 'none');
  document.getElementById('cancelPostBtn')?.addEventListener('click', () => createModal.style.display = 'none');

  // Mobile menu toggle
  document.getElementById('mobileMenuToggle')?.addEventListener('click', () => {
    document.getElementById('sidebarNav')?.classList.toggle('mobile-open');
  });
  document.getElementById('sidebarCollapseBtn')?.addEventListener('click', () => {
    document.getElementById('sidebarNav')?.classList.remove('mobile-open');
  });


  // Share Modal
  const shareModal = document.getElementById('shareModal');
  document.getElementById('closeShareBtn')?.addEventListener('click', () => shareModal.style.display = 'none');
  document.getElementById('copyShareUrlBtn')?.addEventListener('click', () => {
    const input = document.getElementById('shareUrlInput');
    input.select();
    navigator.clipboard.writeText(input.value);
    alert('Folio link copied to clipboard!');
  });
}

let activeSharePostId = null;
function openShareModal(postId) {
  activeSharePostId = postId;
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('shareModal');
  const input = document.getElementById('shareUrlInput');
  const url = `${window.location.origin}${window.location.pathname}#folio-${postId}`;
  input.value = url;

  // Social share buttons
  document.getElementById('shareOnXBtn').onclick = () => {
    const text = encodeURIComponent(`Check out this breakthrough research Folio on Folerio: "${post.title}"\n${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  document.getElementById('shareOnLinkedInBtn').onclick = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  document.getElementById('downloadCurrentCardBtn').onclick = () => {
    const data = {
      title: post.title,
      authors: post.authors,
      field: post.field,
      hook: post.slides[0]?.hook,
      method: post.slides[1]?.content,
      results: post.slides[2]?.content,
      critique: post.slides[3]?.content,
      doi: post.doi
    };
    CardGenerator.exportToCanvas(data, 0, post.theme || 'obsidian');
  };

  modal.style.display = 'flex';
}

// Helpers
function getInitials(name) {
  if (!name) return 'NO';
  const parts = name.replace(/[(),]/g, '').split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatDate(iso) {
  if (!iso) return 'Recent';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

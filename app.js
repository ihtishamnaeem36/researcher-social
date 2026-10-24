/**
 * app.js — Synapse Core Application Logic
 * Interactive horizontal carousels, live card generator studio, and social mechanics
 */

// Default Seed Papers to make the feed feel alive and intellectually stimulating immediately
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
      { author: 'Dr. Sarah Lin (Stanford)', text: 'The nucleic acid co-folding resolution is where this really outclasses AF2.' },
      { author: 'Elena Rostova', text: 'Does anyone have benchmarks on disordered loop segments?' }
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

// App State
const state = {
  posts: [],
  currentTopic: 'all',
  searchQuery: '',
  showSavedOnly: false,
  savedPostIds: new Set(['seed-transformer']),
  likedPostIds: new Set(['seed-transformer']),
  creator: {
    activeSlideIndex: 0,
    selectedTheme: 'obsidian'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  SupabaseBridge.init();
  updateSupabaseStatusIndicator();
  await loadPosts();
  initEventListeners();
  initCreatorStudio();
});

function updateSupabaseStatusIndicator() {
  const dot = document.getElementById('dbIndicator');
  const statusBox = document.getElementById('connectionStatusBox');
  const statusText = document.getElementById('statusText');
  const statusDesc = document.getElementById('statusDesc');

  if (SupabaseBridge.config.isConnected) {
    dot.className = 'db-status-dot connected';
    if (statusBox) {
      statusText.textContent = 'Connected to Supabase Cloud';
      statusDesc.textContent = `Syncing directly with ${SupabaseBridge.config.url}. Community posts are shared globally.`;
    }
  } else {
    dot.className = 'db-status-dot';
    if (statusBox) {
      statusText.textContent = 'Local Storage Mode Active';
      statusDesc.textContent = 'No database attached yet. All your created posts and likes persist safely in browser storage.';
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

/**
 * Render Posts Feed with horizontal swipeable carousels
 */
function renderFeed() {
  const container = document.getElementById('postsFeed');
  const emptyState = document.getElementById('emptyFeedState');

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
}

/**
 * Generate HTML string for single post
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
            <span class="slide-label">● 1-Min Breakthrough Summary</span>
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
      const stepTags = ['[01] Hook', '[02] Methodology', '[03] Key Evidence', '[04] Caveats & Future'];
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
            <span>${idx === slideCount - 1 && post.doi ? `<a href="${post.doi}" target="_blank" rel="noreferrer">Open Full Paper (${post.doi.slice(0, 24)}...)</a>` : 'Slide ' + (idx + 1) + ' of ' + slideCount}</span>
            <span>${idx < slideCount - 1 ? 'Swipe &rarr;' : 'End of Deck'}</span>
          </div>
        </div>
      `;
    }
  }).join('');

  // Dots
  const dotsHTML = post.slides.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>`).join('');

  return `
    <article class="post-card-wrapper" id="post-${post.id}">
      <header class="post-header">
        <div class="author-info">
          <div class="author-avatar">${getInitials(post.authors)}</div>
          <div class="author-meta">
            <span class="author-name">${post.authors}</span>
            <span class="author-sub">${post.field} • ${formatDate(post.createdAt)}</span>
          </div>
        </div>
        <span class="post-tag">${post.field}</span>
      </header>

      <!-- Carousel Track Container -->
      <div class="carousel-container" data-post-id="${post.id}">
        <button class="carousel-btn prev" aria-label="Previous Slide">&larr;</button>
        <button class="carousel-btn next" aria-label="Next Slide">&rarr;</button>

        <div class="carousel-track">
          ${slidesHTML}
        </div>

        <div class="carousel-dots">
          ${dotsHTML}
        </div>
      </div>

      <!-- Actions Bar -->
      <footer class="post-actions-bar">
        <div class="action-group">
          <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')" title="Like">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="like-counter">${post.likes || 0}</span>
          </button>

          <button class="action-btn" onclick="toggleCommentsDrawer('${post.id}')" title="Discussion">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>${(post.comments || []).length}</span>
          </button>

          <button class="action-btn" onclick="openShareModal('${post.id}')" title="Share & Export">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Share</span>
          </button>
        </div>

        <div>
          <button class="action-btn ${isSaved ? 'bookmarked' : ''}" onclick="toggleBookmark('${post.id}')" title="Save to Reading List">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>${isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </footer>

      <!-- Expandable Discussion Drawer -->
      <div class="discussion-drawer" id="comments-${post.id}">
        <div class="comment-input-row">
          <input type="text" id="comment-input-${post.id}" placeholder="Add scientific commentary or questions..." onkeydown="if(event.key==='Enter') submitComment('${post.id}')">
          <button class="btn btn-sm btn-primary" onclick="submitComment('${post.id}')">Post</button>
        </div>
        <div class="comments-list">
          ${(post.comments || []).map(c => `
            <div class="comment-item">
              <span class="comment-author">${c.author}</span>
              <span class="comment-text">${c.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </article>
  `;
}

/**
 * Attach listeners to carousel navigation tracks and buttons
 */
function attachCarouselEvents() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    const dots = container.querySelectorAll('.dot');

    if (!track) return;

    // Track scroll synchronization for dots
    track.addEventListener('scroll', () => {
      const slideWidth = track.clientWidth;
      const activeIdx = Math.round(track.scrollLeft / slideWidth);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    });

    // Arrow navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
      });
    }
  });
}

/**
 * Social Action Handlers
 */
async function toggleLike(postId) {
  const isLiked = state.likedPostIds.has(postId);
  if (isLiked) {
    state.likedPostIds.delete(postId);
    await SupabaseBridge.toggleLike(postId, false);
  } else {
    state.likedPostIds.add(postId);
    await SupabaseBridge.toggleLike(postId, true);
  }

  const post = state.posts.find(p => p.id === postId);
  if (post) {
    post.likes = Math.max(0, (post.likes || 0) + (isLiked ? -1 : 1));
  }

  renderFeed();
}

function toggleBookmark(postId) {
  if (state.savedPostIds.has(postId)) {
    state.savedPostIds.delete(postId);
  } else {
    state.savedPostIds.add(postId);
  }
  renderFeed();
}

function toggleCommentsDrawer(postId) {
  const drawer = document.getElementById(`comments-${postId}`);
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

async function submitComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  if (!input || !input.value.trim()) return;

  const comment = {
    author: 'Ihtisham Naeem (Researcher)',
    text: input.value.trim()
  };

  await SupabaseBridge.addComment(postId, comment);
  const post = state.posts.find(p => p.id === postId);
  if (post) {
    if (!post.comments) post.comments = [];
    post.comments.push(comment);
  }

  input.value = '';
  renderFeed();
  toggleCommentsDrawer(postId); // Keep open
}

/**
 * Creator Studio & Live Preview Engine
 */
function initCreatorStudio() {
  const formInputs = ['postTitle', 'postAuthors', 'postField', 'postHook', 'postMethod', 'postResults', 'postCritique', 'postDoi'];
  
  formInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateCreatorLivePreview);
    }
  });

  // Theme selector
  document.querySelectorAll('.theme-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
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

  // Publish Post
  document.getElementById('publishPostBtn')?.addEventListener('click', async () => {
    const data = getCreatorFormData();
    if (!data.title || !data.hook) {
      alert('Please provide at least a Paper Title and a 1-sentence Breakthrough Claim (Hook).');
      return;
    }

    const newPost = {
      id: 'post-' + Date.now(),
      title: data.title,
      authors: data.authors || 'Independent Researcher',
      field: data.field,
      doi: data.doi,
      theme: state.creator.selectedTheme,
      likes: 1,
      createdAt: new Date().toISOString(),
      comments: [],
      slides: [
        { type: 'hero', hook: data.hook },
        { type: 'method', title: 'Methodology & Setup', content: data.method || 'Standard experimental protocols applied.' },
        { type: 'results', title: 'Breakthrough Findings', content: data.results || 'Data highlights significant effects across primary parameters.' },
        { type: 'critique', title: 'Critical Evaluation', content: data.critique || 'Future cross-validation studies needed.' }
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
 * Filter & Modal Event Listeners
 */
function initEventListeners() {
  // Topic filter pills
  document.querySelectorAll('.topic-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.topic-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentTopic = btn.dataset.topic;
      renderFeed();
    });
  });

  // Saved toggle
  document.getElementById('filterSavedOnly')?.addEventListener('click', (e) => {
    state.showSavedOnly = !state.showSavedOnly;
    e.currentTarget.classList.toggle('active', state.showSavedOnly);
    renderFeed();
  });

  // Search input
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    renderFeed();
  });

  // Modals opening/closing
  const createModal = document.getElementById('createPostModal');
  document.getElementById('openNewPostBtn')?.addEventListener('click', () => {
    createModal.style.display = 'flex';
    updateCreatorLivePreview();
  });
  document.getElementById('closeCreatePostBtn')?.addEventListener('click', () => createModal.style.display = 'none');
  document.getElementById('cancelPostBtn')?.addEventListener('click', () => createModal.style.display = 'none');

  // Supabase Config Modal
  const configModal = document.getElementById('configModal');
  document.getElementById('openConfigBtn')?.addEventListener('click', () => {
    document.getElementById('sbUrl').value = SupabaseBridge.config.url || '';
    document.getElementById('sbAnonKey').value = SupabaseBridge.config.anonKey || '';
    configModal.style.display = 'flex';
  });
  document.getElementById('closeConfigBtn')?.addEventListener('click', () => configModal.style.display = 'none');
  document.getElementById('saveSbConfigBtn')?.addEventListener('click', async () => {
    const url = document.getElementById('sbUrl').value;
    const key = document.getElementById('sbAnonKey').value;
    SupabaseBridge.saveCredentials(url, key);
    updateSupabaseStatusIndicator();
    configModal.style.display = 'none';
    await loadPosts();
  });
  document.getElementById('clearSbConfigBtn')?.addEventListener('click', async () => {
    SupabaseBridge.clearCredentials();
    updateSupabaseStatusIndicator();
    configModal.style.display = 'none';
    await loadPosts();
  });

  // Share Modal
  const shareModal = document.getElementById('shareModal');
  document.getElementById('closeShareBtn')?.addEventListener('click', () => shareModal.style.display = 'none');
  document.getElementById('copyShareUrlBtn')?.addEventListener('click', () => {
    const input = document.getElementById('shareUrlInput');
    input.select();
    navigator.clipboard.writeText(input.value);
    alert('Link copied to clipboard!');
  });
}

let activeSharePostId = null;
function openShareModal(postId) {
  activeSharePostId = postId;
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('shareModal');
  const input = document.getElementById('shareUrlInput');
  const url = `${window.location.origin}${window.location.pathname}#post-${postId}`;
  input.value = url;

  // Social share buttons
  document.getElementById('shareOnXBtn').onclick = () => {
    const text = encodeURIComponent(`Check out this breakthrough paper summary on Synapse: "${post.title}"\n${url}`);
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
  if (!name) return 'RS';
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

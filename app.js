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
  primerPosts: [],
  bookPosts: [],
  interleavedPosts: null,
  exploreFaculty: 'all',
  feedMode: 'frontier', // 'frontier' | 'primer' | 'books'
  currentTopic: 'all',
  searchQuery: '',
  showSavedOnly: false,
  savedPostIds: new Set(['seed-transformer']),
  likedPostIds: new Set(['seed-transformer']),
  currentTheme: 'dark',
  pageLimit: 15,
  hasInitializedScroll: false,
  currentUser: JSON.parse(localStorage.getItem('folerio_user_profile') || 'null'),
  trackedTopics: new Set(JSON.parse(localStorage.getItem('folerio_tracked_topics') || '["AI & Machine Learning", "Quantum Computing", "Biotech & Genetics", "Clinical Medicine & Health", "Economics & Quantitative Finance"]')),
  colleagues: new Set(JSON.parse(localStorage.getItem('folerio_colleagues') || '["Abramson, Adler et al."]')),
  activeView: 'feed', // 'feed' | 'explore' | 'profile'
  profileActiveTab: 'folios', // 'folios' | 'saved' | 'colleagues' | 'topics'
  notifications: [],
  activeNotifFilter: 'all',
  creator: {
    activeSlideIndex: 0,
    selectedTheme: 'obsidian',
    selectedArchetype: 'empirical'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  // Detect if running inside native Android app
  if (window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform()) {
    document.body.classList.add('is-native-app');
  }

  initTheme();
  initNotifications();
  SupabaseBridge.init();

  // 1. Process Google OAuth redirect callback (#access_token=...)
  try {
    const oauthUser = await SupabaseBridge.handleAuthRedirect();
    if (oauthUser) {
      signInUser(oauthUser);
      showToast(`Welcome to Folerio, ${oauthUser.name}! 🎓`);
    } else {
      // 2. Validate active cloud session
      const cloudUser = await SupabaseBridge.getCurrentUser();
      if (cloudUser) {
        state.currentUser = cloudUser;
        localStorage.setItem('folerio_user_profile', JSON.stringify(cloudUser));
      }
    }
  } catch (authErr) {
    console.warn('OAuth redirect check notice:', authErr);
  }

  // Handle /oauth/consent authorization path if visited
  if (window.location.pathname.includes('/oauth/consent') || window.location.search.includes('client_id=')) {
    renderOAuthConsentModal();
  }

  updateSupabaseStatusIndicator();
  updateAuthUI();
  await loadPosts();
  initEventListeners();
  initCreatorStudio();
  updateSavedBadge();
  initEdgeSwipeGestures();
  initOfflineListeners();
  initPullToRefreshAndTabRefresh();
  initExploreSearch();
});

function renderOAuthConsentModal() {
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('client_id') || 'Third-Party Scholarly Tool';
  const scope = urlParams.get('scope') || 'Read Folio Library & Profile';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.display = 'flex';
  overlay.style.zIndex = '99999';
  overlay.innerHTML = `
    <div class="modal-card" style="max-width:440px; padding:1.5rem; text-align:center;">
      <div style="font-size:2.5rem; margin-bottom:0.5rem;">🔐</div>
      <h2 style="font-size:1.25rem; font-weight:800; margin-bottom:0.4rem;">Folerio OAuth Authorization</h2>
      <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.45; margin-bottom:1.25rem;">
        An external application is requesting authorization to connect with your Folerio scientific identity:
      </p>
      <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:0.85rem; text-align:left; margin-bottom:1.25rem; font-size:0.82rem;">
        <div><strong>Application:</strong> <span style="color:var(--accent-cyan);">${escapeHTML(clientId)}</span></div>
        <div style="margin-top:0.35rem;"><strong>Permission Scope:</strong> <span>${escapeHTML(scope)}</span></div>
      </div>
      <div style="display:flex; gap:0.5rem;">
        <button class="btn btn-outline" style="flex:1;" onclick="window.history.back();">Cancel</button>
        <button class="btn btn-primary" style="flex:1;" onclick="alert('Authorization confirmed.'); window.location.href='index.html';">Authorize Application</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

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

  const mobileThemeEmoji = document.getElementById('mobileThemeEmoji');
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');
  if (mobileThemeEmoji) {
    mobileThemeEmoji.textContent = theme === 'light' ? '☀️' : '🌙';
  }
  if (mobileThemeLabel) {
    mobileThemeLabel.textContent = theme === 'light' ? 'Light' : 'Dark';
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
  // 1. Instant offline retrieval from IndexedDB
  try {
    if (typeof FolioCacheDB !== 'undefined') {
      const cached = await FolioCacheDB.getAllCachedFolios('frontier');
      const cachedPrimers = await FolioCacheDB.getAllCachedFolios('primer');
      if (cached && cached.length > 0) {
        state.posts = cached;
        if (cachedPrimers && cachedPrimers.length > 0) {
          state.primerPosts = cachedPrimers;
        }
        renderFeed();
        renderExploreFeed();
        renderExploreDisciplinesGrid();
        updateOfflineStatusBanner();
      }
    }
  } catch (err) {
    console.warn('FolioCacheDB read error:', err);
  }

  // 2. Fetch fresh papers-data and primers
  let datasets = [];
  try {
    const res = await fetch('papers-data.json');
    if (res.ok) {
      datasets = await res.json();
      if (typeof FolioCacheDB !== 'undefined') {
        FolioCacheDB.cacheFolios(datasets, 'frontier').catch(console.warn);
      }
    }
  } catch (err) {
    console.warn('Could not fetch papers-data.json, relying on cached data', err);
  }

  try {
    const pRes = await fetch('primer-data.json');
    if (pRes.ok) {
      state.primerPosts = await pRes.json();
      if (typeof FolioCacheDB !== 'undefined') {
        FolioCacheDB.cacheFolios(state.primerPosts, 'primer').catch(console.warn);
      }
    }
  } catch (err) {
    console.warn('Could not fetch primer-data.json', err);
  }

  // Load curated Textbook & Chapter Book Folios
  try {
    const bRes = await fetch('books-data.json');
    if (bRes.ok) {
      state.bookPosts = await bRes.json();
      if (typeof FolioCacheDB !== 'undefined') {
        FolioCacheDB.cacheFolios(state.bookPosts, 'book').catch(console.warn);
      }
    }
  } catch (err) {
    console.warn('Could not fetch books-data.json', err);
  }

  const cloudOrLocal = await SupabaseBridge.getPosts();
  if (cloudOrLocal && cloudOrLocal.length > 0) {
    const datasetIds = new Set(datasets.map(d => d.id));
    const userCreated = cloudOrLocal.filter(p => !datasetIds.has(p.id));
    state.posts = [...userCreated, ...(datasets.length ? datasets : state.posts)];
  } else if (datasets.length > 0) {
    state.posts = datasets;
  } else if (!state.posts.length) {
    state.posts = [...SEED_PAPERS];
  }

  // Seamlessly interleave book folios into main dispatch feed
  if (state.bookPosts && state.bookPosts.length > 0) {
    const existingIds = new Set(state.posts.map(p => p.id));
    const newBooks = state.bookPosts.filter(b => !existingIds.has(b.id));
    // Insert after first post so the textbook collection is immediately accessible
    state.posts.splice(1, 0, ...newBooks);
  }

  state.interleavedPosts = interleaveDisciplinesByImpact(state.posts);

  initInfiniteScroll();
  renderFeed();
  renderExploreFeed();
  renderExploreDisciplinesGrid();
  updateOfflineStatusBanner();

  // Native Android permissions & background live update check
  if (typeof window !== 'undefined' && window.FolerioNative && typeof window.FolerioNative.requestPermissions === 'function') {
    try { window.FolerioNative.requestPermissions(); } catch (e) {}
  }
  checkForLiveUpdates();

  // Global Android / Mobile link click interceptor: ensure external academic sources open in system browser
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor || !anchor.href) return;
    const href = anchor.href;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      const isExternal = !href.includes(window.location.host);
      if (isExternal) {
        e.preventDefault();
        openExternalPaperUrl(href, e);
      }
    }
  }, { capture: true });
}

/**
 * Over-the-air background updates:
 * Silently checks if newly published folios exist on GitHub Pages without disrupting offline feed.
 */
async function checkForLiveUpdates() {
  if (!navigator.onLine) return;
  try {
    const remoteRes = await fetch('https://ihtishamnaeem36.github.io/researcher-social/papers-data.json?t=' + Date.now(), {
      cache: 'no-store'
    });
    if (remoteRes.ok) {
      const remoteData = await remoteRes.json();
      if (Array.isArray(remoteData) && remoteData.length > 0) {
        const existingIds = new Set(state.posts.map(p => p.id));
        const newFolios = remoteData.filter(p => !existingIds.has(p.id));
        if (newFolios.length > 0) {
          console.log(`[Folerio OTA] Auto-merged ${newFolios.length} new research folios in background.`);
          state.posts = [...state.posts, ...newFolios];
          state.interleavedPosts = interleaveDisciplinesByImpact(state.posts);
          if (typeof FolioCacheDB !== 'undefined') {
            FolioCacheDB.cacheFolios(state.posts, 'frontier').catch(console.warn);
          }
          renderFeed();
          renderExploreFeed();
          renderExploreDisciplinesGrid();
        }
      }
    }
  } catch (err) {
    console.log('[Folerio OTA] Frontier network check skipped');
  }

  // Also check for new foundational primers over the air
  try {
    const remotePRes = await fetch('https://ihtishamnaeem36.github.io/researcher-social/primer-data.json?t=' + Date.now(), {
      cache: 'no-store'
    });
    if (remotePRes.ok) {
      const remotePData = await remotePRes.json();
      if (Array.isArray(remotePData) && remotePData.length > 0) {
        const existingPrimerIds = new Set(state.primerPosts.map(p => p.id));
        const newPrimers = remotePData.filter(p => !existingPrimerIds.has(p.id));
        if (newPrimers.length > 0) {
          console.log(`[Folerio OTA] Auto-merged ${newPrimers.length} new foundational primers.`);
          state.primerPosts = [...state.primerPosts, ...newPrimers];
          if (typeof FolioCacheDB !== 'undefined') {
            FolioCacheDB.cacheFolios(state.primerPosts, 'primer').catch(console.warn);
          }
          renderFeed();
        }
      }
    }
  } catch (err) {
    console.log('[Folerio OTA] Primer network check skipped');
  }
}

function updateSavedBadge() {
  const badge = document.getElementById('savedCountBadge');
  if (badge) {
    badge.textContent = state.savedPostIds.size;
  }
  const mobileBadge = document.getElementById('mobileSavedCountBadge');
  if (mobileBadge) {
    mobileBadge.textContent = state.savedPostIds.size;
  }
}

/**
 * Interleaves research folios across all disciplines in an impact-weighted ratio.
 * The most famous / high-velocity disciplines (AI, Biotech, Quantum, Neuroscience,
 * Medicine, Materials, Economics, Climate, Robotics, Psychology, Astrophysics)
 * appear more frequently (~72% proportion, alternating 2-3 famous papers per 1 core/humanities paper)
 * while cycling smoothly through all disciplines so the user experiences rich interdisciplinary discovery.
 */
function interleaveDisciplinesByImpact(posts) {
  if (!posts || posts.length <= 1) return posts;

  const famousSet = new Set([
    'AI & Machine Learning',
    'Biotech & Genetics',
    'Quantum Computing',
    'Neuroscience',
    'Materials Science',
    'Astrophysics & Space',
    'Clinical Medicine & Health',
    'Economics & Quantitative Finance',
    'Psychology & Behavioral Science',
    'Climate & Earth Systems',
    'Robotics & Autonomous Systems'
  ]);

  const famousBins = {};
  const coreBins = {};
  const priority = [];

  for (const post of posts) {
    if (post.id && (post.id.startsWith('seed-') || post.isUserCreated)) {
      priority.push(post);
      continue;
    }
    const f = post.field || 'General Science';
    if (famousSet.has(f)) {
      if (!famousBins[f]) famousBins[f] = [];
      famousBins[f].push(post);
    } else {
      if (!coreBins[f]) coreBins[f] = [];
      coreBins[f].push(post);
    }
  }

  const famousKeys = Object.keys(famousBins);
  const coreKeys = Object.keys(coreBins);

  let famousIdx = 0;
  let coreIdx = 0;
  const result = [...priority];

  let hasMoreFamous = famousKeys.some(k => famousBins[k].length > 0);
  let hasMoreCore = coreKeys.some(k => coreBins[k].length > 0);

  while (hasMoreFamous || hasMoreCore) {
    // 2 to 3 famous papers from rotating high-velocity fields
    const batch = 2 + (result.length % 2);
    for (let i = 0; i < batch && hasMoreFamous; i++) {
      let attempts = 0;
      let found = false;
      while (attempts < famousKeys.length) {
        const k = famousKeys[famousIdx % famousKeys.length];
        famousIdx++;
        attempts++;
        if (famousBins[k] && famousBins[k].length > 0) {
          result.push(famousBins[k].shift());
          found = true;
          break;
        }
      }
      if (!found) hasMoreFamous = false;
    }

    // 1 paper from rotating core / formal / humanities fields
    if (hasMoreCore) {
      let attempts = 0;
      let found = false;
      while (attempts < coreKeys.length) {
        const k = coreKeys[coreIdx % coreKeys.length];
        coreIdx++;
        attempts++;
        if (coreBins[k] && coreBins[k].length > 0) {
          result.push(coreBins[k].shift());
          found = true;
          break;
        }
      }
      if (!found) hasMoreCore = false;
    }

    hasMoreFamous = famousKeys.some(k => famousBins[k] && famousBins[k].length > 0);
    hasMoreCore = coreKeys.some(k => coreBins[k] && coreBins[k].length > 0);
  }

  return result;
}

/**
 * Render Posts Feed with horizontal swipeable carousels & virtual pagination
 */
function renderFeed() {
  const container = document.getElementById('postsFeed');
  const emptyState = document.getElementById('emptyFeedState');
  const viewText = document.getElementById('currentViewText');

  let activePool;
  if (state.feedMode === 'primer') {
    activePool = state.primerPosts;
  } else if (state.feedMode === 'books') {
    activePool = state.bookPosts && state.bookPosts.length > 0 ? state.bookPosts : state.posts.filter(p => p.isBookFolio);
  } else if (state.currentTopic === 'all' && !state.showSavedOnly && !state.searchQuery) {
    if (!state.interleavedPosts || state.interleavedPosts.length !== state.posts.length) {
      state.interleavedPosts = interleaveDisciplinesByImpact(state.posts);
    }
    activePool = state.interleavedPosts;
  } else {
    activePool = state.posts;
  }

  let filtered = activePool.filter(p => {
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
      const matchBook = (p.bookMeta?.bookTitle || '').toLowerCase().includes(q) || (p.bookMeta?.collectionTitle || '').toLowerCase().includes(q);
      if (!matchTitle && !matchAuthors && !matchHook && !matchField && !matchBook) return false;
    }
    return true;
  });

  const totalCount = filtered.length;
  const showingCount = Math.min(state.pageLimit, totalCount);

  if (viewText) {
    if (state.showSavedOnly) {
      viewText.textContent = `Library: ${showingCount} of ${totalCount} Saved Folios`;
    } else if (state.feedMode === 'primer') {
      viewText.textContent = state.currentTopic !== 'all'
        ? `Foundations: ${showingCount} of ${totalCount} Core Basics (${state.currentTopic})`
        : `Foundations: First-Principles & Core Basics (${totalCount} Folios)`;
    } else if (state.feedMode === 'books') {
      viewText.textContent = state.currentTopic !== 'all'
        ? `Books & Chapters: ${showingCount} of ${totalCount} Topics (${state.currentTopic})`
        : `Books: Curated Chapters & Sequential Treatises (${totalCount} Topics)`;
    } else if (state.currentTopic !== 'all') {
      viewText.textContent = `${state.currentTopic}: Showing ${showingCount} of ${totalCount.toLocaleString()} Folios`;
    } else {
      viewText.textContent = `Dispatch: Showing ${showingCount} of ${totalCount.toLocaleString()} Real Breakthrough Folios`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  const visiblePosts = filtered.slice(0, state.pageLimit);
  const cardsHTML = visiblePosts.map(post => renderPostCard(post)).join('');

  const hasMore = filtered.length > state.pageLimit;
  const loadMoreHTML = hasMore ? `
    <div class="feed-load-more" id="feedLoadMoreWrap" style="text-align:center; padding: 2.5rem 0 4rem;">
      <button class="btn btn-outline" id="loadMoreFoliosBtn" onclick="loadMoreFolios()" style="padding: 0.75rem 2.2rem; font-size: 0.92rem; border-radius: 9999px; background: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.35);">
        Load More Research Folios (${filtered.length - state.pageLimit} remaining) &darr;
      </button>
    </div>
  ` : `
    <div style="text-align:center; padding: 3rem 0; color: var(--text-muted); font-size: 0.86rem; border-top: 1px solid var(--border-subtle); margin-top: 2rem;">
      ✦ You have reached the research frontier (${filtered.length.toLocaleString()} Folios loaded)
    </div>
  `;

  container.innerHTML = cardsHTML + loadMoreHTML;

  // Attach carousel scroll listeners & buttons
  attachCarouselEvents();
  updateSavedBadge();
}

function loadMoreFolios() {
  state.pageLimit += 15;
  renderFeed();
}

function initInfiniteScroll() {
  if (state.hasInitializedScroll) return;
  state.hasInitializedScroll = true;

  const topBar = document.querySelector('.app-topbar');
  const filterStrip = document.getElementById('filterStrip');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    // Check if scrolled near bottom for virtual pagination
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 900) {
      const filteredCount = state.posts.filter(p => {
        if (state.currentTopic !== 'all' && p.field !== state.currentTopic) return false;
        if (state.showSavedOnly && !state.savedPostIds.has(p.id)) return false;
        return true;
      }).length;

      if (state.pageLimit < filteredCount) {
        state.pageLimit += 10;
        renderFeed();
      }
    }

    // Scroll Direction Detection for Instagram-Style Sticky Header & Topic Bar
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;

        if (currentScrollY <= 25) {
          // At very top: show topbar and default filter bar position
          topBar?.classList.remove('nav-hidden');
          filterStrip?.classList.remove('topics-sticky-show', 'topics-hidden');
        } else if (diff > 8 && currentScrollY > 75) {
          // Scrolling DOWN: minimize/hide topbar and filter bar for full reading immersion
          topBar?.classList.add('nav-hidden');
          filterStrip?.classList.add('topics-hidden');
          filterStrip?.classList.remove('topics-sticky-show');
        } else if (diff < -8) {
          // Scrolling UP even slightly: slide both smoothly back into view at top!
          topBar?.classList.remove('nav-hidden');
          filterStrip?.classList.remove('topics-hidden');
          filterStrip?.classList.add('topics-sticky-show');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Generate HTML string for single Folio card
 */
function renderPostCard(post) {
  const isLiked = state.likedPostIds.has(post.id);
  const isSaved = state.savedPostIds.has(post.id);
  const slideCount = post.slides.length;
  const isBook = Boolean(post.isBookFolio && post.bookMeta);

  const slidesHTML = post.slides.map((s, idx) => {
    if (idx === 0) {
      if (isBook) {
        return `
          <div class="post-slide slide-type-hero slide-type-book" data-index="${idx}">
            <div class="slide-badge-row">
              <span class="slide-label book-badge-label">📖 Book Chapter Excerpt</span>
              <span class="post-tag book-tag">📖 ${escapeHTML(post.field)}</span>
            </div>
            <div class="book-two-tier-header">
              <!-- Tier 1: Clickable Broad Topic Heading (Opens Sequence Panel) -->
              <button type="button" class="book-main-topic-btn" onclick="openBookSequenceDrawer('${post.id}')" title="Click to browse chapter sequence in order">
                <span class="book-main-topic-icon">📖</span>
                <div class="book-main-topic-text-group">
                  <span class="book-main-topic-eyebrow">Book Collection · Tap to browse chapter</span>
                  <span class="book-main-topic-title">${escapeHTML(post.bookMeta.collectionTitle || post.bookMeta.chapterTitle || 'Chapter Collection')}</span>
                </div>
                <span class="book-main-topic-action">Sequence ▾</span>
              </button>

              <!-- Tier 2: Specific Subtopic Title -->
              <h2 class="paper-hero-title book-hero-title">${escapeHTML(post.title)}</h2>
              <div class="breakthrough-hook book-hook">"${escapeHTML(s.hook)}"</div>
            </div>
            <div class="slide-footer-row book-footer-row">
              <div class="book-bottom-citation">
                <span class="book-citation-icon">📚</span>
                <span class="book-citation-text">${escapeHTML(post.bookMeta.bookTitle)}${post.bookMeta.edition ? ' (' + escapeHTML(post.bookMeta.edition) + ')' : ''} &bull; ${escapeHTML(post.bookMeta.chapter)} ${escapeHTML(post.bookMeta.chapterTitle || '')}</span>
              </div>
            </div>
          </div>
        `;
      }
      return `
        <div class="post-slide slide-type-hero" data-index="${idx}">
          <div class="slide-badge-row">
            <span class="slide-label">${post.isPrimer ? '🌱 Foundation & Core Principles' : '● Core Thesis & Breakthrough'}</span>
            <span class="post-tag ${post.isPrimer ? 'primer-badge' : ''}">${post.isPrimer ? '🌱 ' + post.field : post.field}</span>
          </div>
          <div>
            <h2 class="paper-hero-title">${post.title}</h2>
            <div class="breakthrough-hook">"${s.hook}"</div>
          </div>
          <div class="slide-footer-row">
            <span class="paper-authors-tag">${post.authors}</span>
          </div>
        </div>
      `;
    } else {
      if (isBook) {
        return `
          <div class="post-slide slide-type-dive slide-type-book" data-index="${idx}">
            <div class="slide-badge-row">
              <span class="dive-section-tag book-dive-tag">${escapeHTML(s.title || '[Book Excerpt]')}</span>
              <span class="post-tag book-tag">📖 ${escapeHTML(post.field)}</span>
            </div>
            <div class="book-dive-body">
              <button type="button" class="book-dive-compact-topic" onclick="openBookSequenceDrawer('${post.id}')" title="Chapter Sequence">
                <span>📖 ${escapeHTML(post.bookMeta.collectionTitle || post.bookMeta.bookTitle)}</span>
                <span class="book-chevron-mini">▾</span>
              </button>
              <h3 class="dive-heading book-dive-heading">${escapeHTML(s.title || 'In-Depth Excerpt')}</h3>
              <div class="dive-content book-dive-content">
                <p>${escapeHTML(s.content)}</p>
              </div>
            </div>
            <div class="slide-footer-row book-footer-row">
              <div class="book-bottom-citation">
                <span class="book-citation-icon">📚</span>
                <span class="book-citation-text">${escapeHTML(post.bookMeta.bookTitle)}${post.bookMeta.edition ? ' (' + escapeHTML(post.bookMeta.edition) + ')' : ''} &bull; ${escapeHTML(post.bookMeta.chapter)}</span>
              </div>
            </div>
          </div>
        `;
      }
      const stepTags = post.isPrimer
        ? ['[01] Core Concept', '[02] First Principles', '[03] Mechanism & Step-by-Step', '[04] Modern Applications']
        : ['[01] Thesis', '[02] Methodology & Specs', '[03] Quantitative Evidence', '[04] Critical Frontier'];
      return `
        <div class="post-slide slide-type-dive" data-index="${idx}">
          <div class="slide-badge-row">
            <span class="dive-section-tag">${stepTags[idx] || '[Deep Dive]'}</span>
            <span class="post-tag ${post.isPrimer ? 'primer-badge' : ''}">${post.isPrimer ? '🌱 ' + post.field : post.field}</span>
          </div>
          <div>
            <h3 class="dive-heading">${s.title || 'In-Depth Breakdown'}</h3>
            <div class="dive-content">
              <p>${s.content}</p>
            </div>
          </div>
          <div class="slide-footer-row">
            <span>${idx === slideCount - 1 && post.doi ? `
              <button class="primary-source-action-btn" onclick="openExternalPaperUrl('${escapeHTML(post.doi)}', event)" title="Read Full Research Paper">
                <span>Read Full Paper</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>` : ''}</span>
          </div>
        </div>
      `;
    }
  }).join('');

  const dotsHTML = post.slides.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>`).join('');
  const totalDiscussions = countTotalDiscussions(post);

  const commentsHTML = (post.comments || []).map(c => renderCommentThread(c, post.id)).join('');

  // Authentic book-page exposition
  const exposition = getFolioExposition(post);
  const expositionHTML = exposition.map(sec => `
    <div class="book-section">
      <h4 class="book-heading">${escapeHTML(sec.heading)}</h4>
      <p class="book-paragraph">${escapeHTML(sec.body)}</p>
    </div>
  `).join('');

  const isColleague = state.colleagues.has(post.authors);

  return `
    <article class="post-card-wrapper ${isBook ? 'book-card-theme' : ''}" id="post-${post.id}">
      <!-- Author & Header Row (Clean, single follow button on right) -->
      <header class="post-header ${isBook ? 'book-post-header' : ''}">
        <div class="author-info">
          <div class="author-avatar ${isBook ? 'book-author-avatar' : ''}">${isBook ? '📖' : getInitials(post.authors)}</div>
          <div class="author-meta">
            <span class="author-name">${escapeHTML(post.authors)}</span>
            <span class="author-sub">${isBook ? '📖 ' + escapeHTML(post.bookMeta.bookTitle) : formatDate(post.createdAt)}</span>
          </div>
        </div>
        <button class="colleague-btn ${isColleague ? 'active' : ''}" onclick="toggleColleague(event, '${escapeHTML(post.authors)}')" title="Connect with Colleague">
          ${isColleague ? '✓ Colleagues' : '+ Colleague'}
        </button>
      </header>

      <!-- Horizontal Multi-Slide Carousel (Desktop arrows for laptop web + gesture swipe for touch) -->
      <div class="carousel-container" data-post-id="${post.id}">
        <!-- Segmented Story Progress Bar (Instagram / TikTok Stories Style) -->
        <div class="slide-story-progress" id="story-progress-${post.id}">
          ${post.slides.map((_, i) => `<div class="story-progress-bar ${i === 0 ? 'active' : ''}"></div>`).join('')}
        </div>
        <div class="carousel-counter-badge" id="counter-${post.id}">1/${post.slides.length}</div>
        
        <!-- Desktop / Laptop Navigation Arrows (hidden on touch/Android app via CSS) -->
        <button class="carousel-btn prev" aria-label="Previous Slide" title="Previous Slide">&#x2039;</button>
        <button class="carousel-btn next" aria-label="Next Slide" title="Next Slide">&#x203A;</button>

        <div class="carousel-track">
          ${slidesHTML}
        </div>
        <div class="carousel-dots">
          ${dotsHTML}
        </div>
      </div>

      <!-- Action Bar (Cite/Like, Discussion, Illuminate, Save, Share) -->
      <div class="post-actions-bar">
        <div class="action-group">
          <!-- Heart Button (Tap to Endorse, Hold to View Who Endorsed) -->
          <button class="action-btn like-btn ${isLiked ? 'liked' : ''}" id="like-btn-${post.id}" data-post-id="${post.id}" onclick="toggleLike('${post.id}')" title="Endorse (Hold to see scholars who endorsed)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="like-count">${post.likes || 0}</span>
          </button>

          <!-- Discuss Button (Opens Bottom Sheet on mobile or drawer) -->
          <button class="action-btn discuss-btn" id="discuss-btn-${post.id}" data-post-id="${post.id}" onclick="openCommentsBottomSheet('${post.id}')" title="Scholarly peer discussion & critiques">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="discuss-count">${totalDiscussions > 0 ? totalDiscussions : ''}</span>
          </button>

          <!-- Illuminate Dropdown Action Button -->
          <button class="action-btn illuminate-btn" id="illuminate-btn-${post.id}" onclick="toggleIlluminate('${post.id}')" title="Illuminate: Read full in-depth analytical exposition">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <span>Illuminate</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="chevron-arrow">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div class="action-group">
          <!-- Save Button (Tap to Save, Hold for Clean Screenshot) -->
          <button class="action-btn save-btn ${isSaved ? 'bookmarked' : ''}" id="save-btn-${post.id}" data-post-id="${post.id}" onclick="toggleBookmark('${post.id}')" title="Save to Personal Library (Hold for Clean Screenshot)">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>

          <!-- Share Button -->
          <button class="action-btn share-btn" onclick="openShareModal('${post.id}')" title="Export & Share Folio">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- In-Depth Book Page Exposition Drawer (Illuminate) -->
      <div class="illuminate-drawer" id="illuminate-${post.id}">
        <div class="book-page-container">
          <div class="book-page-header">
            <div class="book-header-left">
              <button class="illuminate-audio-btn" id="illuminate-audio-${post.id}" onclick="toggleAudioNarration('${post.id}')" title="Listen to technical deep dive">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span>Listen</span>
              </button>
              <span class="book-running-head">Exposition · ${escapeHTML(post.field)}</span>
            </div>
            <span class="book-read-time">~3 min deep reading</span>
          </div>
          <h3 class="book-work-title">${escapeHTML(post.title)}</h3>
          <div class="book-work-authors">Primary analytical exposition of investigations by ${escapeHTML(post.authors)}</div>

          ${expositionHTML}

          <div class="book-page-footer">
            <span>✦ &nbsp; Folerio Academic Monograph Series &nbsp; ✦</span>
          </div>
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

    const badge = container.querySelector('.carousel-counter-badge');

    // Track scroll event to update active dot and Instagram-style counter badge
    track.addEventListener('scroll', () => {
      const scrollPos = track.scrollLeft;
      const slideWidth = track.clientWidth || 1;
      const activeIdx = Math.round(scrollPos / slideWidth);

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });

      const storyBars = container.querySelectorAll('.story-progress-bar');
      storyBars.forEach((bar, idx) => {
        bar.classList.toggle('active', idx <= activeIdx);
      });

      if (badge && dots.length > 0) {
        badge.textContent = `${Math.min(activeIdx + 1, dots.length)}/${dots.length}`;
      }
    }, { passive: true });

    // Arrow button controls with exact slide alignment
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const slideWidth = track.clientWidth || 1;
      const currentIdx = Math.round(track.scrollLeft / slideWidth);
      const targetIdx = Math.max(0, currentIdx - 1);
      track.scrollTo({ left: targetIdx * slideWidth, behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const slideWidth = track.clientWidth || 1;
      const currentIdx = Math.round(track.scrollLeft / slideWidth);
      const targetIdx = Math.min(dots.length - 1, currentIdx + 1);
      track.scrollTo({ left: targetIdx * slideWidth, behavior: 'smooth' });
    });

    // Click on dots to jump directly
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        track.scrollTo({ left: track.clientWidth * idx, behavior: 'smooth' });
      });
    });

    // Touch gesture support for mobile / tablet + Single-Tap Focus Mode + Instagram Double-Tap to Like
    let lastTapTime = 0;
    let singleTapTimeout = null;
    let touchStartX = 0;
    let touchStartY = 0;

    track.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touch = e.changedTouches ? e.changedTouches[0] : null;
      if (touch) {
        const deltaX = Math.abs(touch.clientX - touchStartX);
        const deltaY = Math.abs(touch.clientY - touchStartY);
        // If swiping or dragging, ignore single-tap focus trigger
        if (deltaX > 15 || deltaY > 15) {
          if (singleTapTimeout) {
            clearTimeout(singleTapTimeout);
            singleTapTimeout = null;
          }
          return;
        }
      }

      const now = Date.now();
      const interval = now - lastTapTime;

      // Double-Tap detected! -> Trigger Like
      if (interval < 300 && interval > 40) {
        if (singleTapTimeout) {
          clearTimeout(singleTapTimeout);
          singleTapTimeout = null;
        }
        const postId = container.getAttribute('data-post-id');
        if (postId) {
          triggerDoubleTapLike(postId, container);
        }
        lastTapTime = 0;
        return;
      }

      lastTapTime = now;

      // Single-Tap detected! -> Enter/Exit Focus Reading Mode
      singleTapTimeout = setTimeout(() => {
        singleTapTimeout = null;
        const card = container.closest('.post-card');
        if (!card) return;

        if (document.body.classList.contains('focus-reading-mode')) {
          exitFocusReadingMode();
        } else {
          enterFocusReadingMode(card);
        }
      }, 260);
    }, { passive: true });
  });

  initLikeButtonPressGestures();
  initSaveButtonPressGestures();
}

function initCarousels() {
  attachCarouselEvents();
}

/**
 * Trigger Instagram-style heart burst in center of slide and endorse research
 */
function triggerDoubleTapLike(postId, container) {
  if (!state.likedPostIds.has(postId)) {
    toggleLike(postId);
  }

  // Create luminous heart burst element
  const heart = document.createElement('div');
  heart.className = 'instagram-heart-burst';
  heart.innerHTML = `
    <svg width="78" height="78" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  `;
  container.appendChild(heart);

  try {
    if (navigator.vibrate) navigator.vibrate(15);
  } catch (err) {}

  setTimeout(() => {
    heart.remove();
  }, 880);
}

let pendingAuthAction = null;

function requireAuth(actionCallback) {
  if (state.currentUser) {
    actionCallback();
  } else {
    pendingAuthAction = actionCallback;
    openAuthModal('signin');
  }
}

/**
 * Social Action Handlers (Auth-Gated)
 */
async function toggleLike(postId) {
  requireAuth(() => {
    const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = state.likedPostIds.has(postId);
    if (isLiked) {
      state.likedPostIds.delete(postId);
      post.likes = Math.max(0, (post.likes || 1) - 1);
    } else {
      state.likedPostIds.add(postId);
      post.likes = (post.likes || 0) + 1;
      SupabaseBridge.recordInteraction(postId, 'like');
      try {
        if (navigator.vibrate) navigator.vibrate(20);
      } catch (e) {}
    }

    // Update DOM directly for instant response
    const card = document.getElementById(`post-${postId}`);
    if (card) {
      const likeBtn = card.querySelector('.like-btn') || document.getElementById(`like-btn-${postId}`);
      const likeCount = card.querySelector('.like-count');
      if (likeBtn) {
        likeBtn.classList.toggle('liked', !isLiked);
        const svg = likeBtn.querySelector('svg');
        if (svg) svg.setAttribute('fill', !isLiked ? 'currentColor' : 'none');
        likeBtn.classList.add('heart-pop');
        setTimeout(() => likeBtn.classList.remove('heart-pop'), 400);
      }
      if (likeCount) likeCount.textContent = post.likes;
    }
  });
}

function toggleBookmark(postId) {
  requireAuth(() => {
    const isSaved = state.savedPostIds.has(postId);
    if (isSaved) {
      state.savedPostIds.delete(postId);
      showToast('Removed from Personal Library');
    } else {
      state.savedPostIds.add(postId);
      SupabaseBridge.recordInteraction(postId, 'bookmark');
      showToast('Saved to Personal Library');
      try {
        if (navigator.vibrate) navigator.vibrate(20);
      } catch (e) {}
    }

    updateSavedBadge();

    if (state.showSavedOnly) {
      renderFeed();
    } else {
      const card = document.getElementById(`post-${postId}`);
      if (card) {
        const bookBtn = card.querySelector('.save-btn') || document.getElementById(`save-btn-${postId}`);
        if (bookBtn) {
          bookBtn.classList.toggle('bookmarked', !isSaved);
          const svg = bookBtn.querySelector('svg');
          if (svg) svg.setAttribute('fill', !isSaved ? 'currentColor' : 'none');
          bookBtn.classList.add('save-pop');
          setTimeout(() => bookBtn.classList.remove('save-pop'), 400);
        }
      }
    }
    if (state.activeView === 'profile') renderProfileView();
  });
}

function toggleColleague(event, authorName) {
  if (event) event.stopPropagation();
  requireAuth(() => {
    const isColleague = state.colleagues.has(authorName);
    if (isColleague) {
      state.colleagues.delete(authorName);
      showToast(`Disconnected from ${authorName}`);
    } else {
      state.colleagues.add(authorName);
      addNotification({
        type: 'colleague_connect',
        title: 'New Colleague Connected',
        message: `You connected with ${authorName} as a research colleague. You will receive alerts when they publish or share new folios.`,
        author: authorName,
        actionType: 'colleague'
      });
      showToast(`Connected with ${authorName} 🤝`);
    }
    localStorage.setItem('folerio_colleagues', JSON.stringify([...state.colleagues]));

    // Update all matching buttons
    document.querySelectorAll('.colleague-btn').forEach(btn => {
      if (btn.getAttribute('onclick')?.includes(authorName)) {
        btn.classList.toggle('active', !isColleague);
        btn.textContent = !isColleague ? '✓ Colleagues' : '+ Colleague';
      }
    });

    if (state.activeView === 'profile') renderProfileView();
  });
}

function toggleTrackTopic(topicName) {
  requireAuth(() => {
    const isTracked = state.trackedTopics.has(topicName);
    if (isTracked) {
      state.trackedTopics.delete(topicName);
    } else {
      state.trackedTopics.add(topicName);
    }
    localStorage.setItem('folerio_tracked_topics', JSON.stringify([...state.trackedTopics]));
    renderExploreDisciplinesGrid();
    if (state.activeView === 'profile') renderProfileView();
  });
}

function syncTopicSelection(topic) {
  state.currentTopic = topic;
  state.showSavedOnly = false;
  state.pageLimit = 15;

  // Sync pills
  document.querySelectorAll('.topic-pill').forEach(b => {
    b.classList.toggle('active', b.dataset.topic === topic);
  });
  // Auto-scroll topic strip to active pill
  try {
    const activePill = document.querySelector(`.topic-pill[data-topic="${CSS.escape(topic)}"]`);
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  } catch (e) {}

  // Sync sidebar disciplines
  document.querySelectorAll('.discipline-nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.topic === topic);
  });

  // Sync nav links
  if (state.feedMode === 'primer') {
    document.getElementById('navPrimerBtn')?.classList.add('active');
    document.getElementById('navFeedBtn')?.classList.remove('active');
  } else {
    document.getElementById('navFeedBtn')?.classList.add('active');
    document.getElementById('navPrimerBtn')?.classList.remove('active');
  }
  document.getElementById('navSavedBtn')?.classList.remove('active');
  document.getElementById('filterSavedOnly')?.classList.remove('active');

  renderFeed();
}
window.syncTopicSelection = syncTopicSelection;

function filterByField(fieldName) {
  switchMainView('feed');
  syncTopicSelection(fieldName);
}

function toggleIlluminate(postId) {
  const drawer = document.getElementById(`illuminate-${postId}`);
  const btn = document.getElementById(`illuminate-btn-${postId}`);
  if (!drawer) return;

  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  btn?.classList.toggle('open', !isOpen);

  if (!isOpen) {
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Returns authentic, book-style paragraphs explaining the research in plain, natural English.
 * Pure prose without emojis, without bullet points, and without repetitive clichés.
 */
function getFolioExposition(post) {
  if (post && post.exposition && Array.isArray(post.exposition) && post.exposition.length > 0) {
    return post.exposition;
  }

  const title = (post?.title || 'This scientific research').replace(/\.$/, '').trim();
  const field = post?.field || 'General Science';
  const rawAuthors = post?.authors || 'The research group';
  const cleanAuth = rawAuthors.replace(/\s+et\s+al\..*$/i, '').split(',').map(s => s.trim()).filter(Boolean);
  const authors = cleanAuth.length <= 1 
    ? (cleanAuth[0] ? `${cleanAuth[0]} and colleagues` : 'The authors')
    : (cleanAuth.length === 2 ? `${cleanAuth[0]} and ${cleanAuth[1]}` : `${cleanAuth[0]}, ${cleanAuth[1]}, and colleagues`);

  const slides = post?.slides || [];

  const deFirstPerson = (txt) => {
    if (!txt) return '';
    return txt.trim()
      .replace(/\bIn this paper, we\b/g, 'In this work, the investigators')
      .replace(/\bIn this work, we\b/g, 'In this study, the authors')
      .replace(/\bHere, we\b/g, 'Here, the research team')
      .replace(/\bWe establish\b/g, 'The authors establish')
      .replace(/\bWe propose\b/g, 'The investigators propose')
      .replace(/\bWe introduce\b/g, 'The study introduces')
      .replace(/\bWe develop\b/g, 'The research team develops')
      .replace(/\bWe demonstrate\b/g, 'The findings demonstrate')
      .replace(/\bWe show\b/g, 'The analysis shows')
      .replace(/\bWe find\b/g, 'The authors find')
      .replace(/\bWe observe\b/g, 'The data reveals')
      .replace(/\bWe present\b/g, 'The authors present')
      .replace(/\bWe prove\b/g, 'The team proves')
      .replace(/\bwe establish\b/g, 'the authors establish')
      .replace(/\bwe propose\b/g, 'the investigators propose')
      .replace(/\bwe introduce\b/g, 'the study introduces')
      .replace(/\bwe develop\b/g, 'the research team develops')
      .replace(/\bwe demonstrate\b/g, 'the findings demonstrate')
      .replace(/\bwe show\b/g, 'the analysis shows')
      .replace(/\bwe find\b/g, 'the authors find')
      .replace(/\bwe observe\b/g, 'the data reveals')
      .replace(/\bwe present\b/g, 'the authors present')
      .replace(/\bwe prove\b/g, 'the team proves')
      .replace(/\bour\b/g, 'their')
      .replace(/\bOur\b/g, 'Their');
  };

  const ensurePeriod = (s) => {
    s = (s || '').trim();
    if (!s) return '';
    return /[.!?]$/.test(s) ? s : s + '.';
  };

  let s0 = deFirstPerson(slides[0]?.hook || '').replace(/\.$/, '').trim();
  if (s0 && !s0.startsWith('AI') && !s0.startsWith('DNA') && !s0.startsWith('RNA')) {
    s0 = s0.charAt(0).toLowerCase() + s0.slice(1);
  }
  s0 = ensurePeriod(s0);

  const s1 = ensurePeriod(deFirstPerson(slides[1]?.content || ''));
  const s2 = ensurePeriod(deFirstPerson(slides[2]?.content || ''));
  const s3 = ensurePeriod(deFirstPerson(slides[3]?.content || ''));

  // Deterministic seed based on title characters for stable variety
  const seed = (title || 'science').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const fieldIntros = {
    'AI & Machine Learning': [
      'Training autonomous models to generalize reliably across unseen physical or computational environments presents a persistent challenge in computer science.',
      'A central problem in modern machine intelligence is bridging the gap between high-dimensional statistical representations and verifiable physical reasoning.',
      'Deep learning architectures frequently achieve state-of-the-art results on curated benchmarks while remaining vulnerable to sudden distribution shifts.',
      'Scaling autonomous decision-making systems introduces an acute tension between computational latency and policy robustness in dynamic environments.'
    ],
    'Biotech & Genetics': [
      'Cellular regulation and genetic circuits operate in fundamentally noisy biochemical environments, confounding straightforward analytical predictions.',
      'Translating complex genomic alterations into predictable phenotypic responses remains one of the most formidable hurdles in molecular medicine.',
      'Biological networks achieve operational resilience through dense feedback loops, making the isolation of individual causative pathways remarkably difficult.',
      'In synthetic biology, designing predictable genetic logic gates requires accounting for unpredictable molecular competition and metabolic burden.'
    ],
    'Neuroscience': [
      'Mapping how coordinated neural populations generate unified cognitive behaviors requires observing activity across vastly disparate spatial and temporal scales.',
      'A foundational puzzle in neuroscience is how synaptic circuits preserve stable long-term memories despite continuous molecular turnover and physiological drift.',
      'Investigating cortical computation has historically been limited by the difficulty of recording dense neuronal ensembles without disrupting delicate local microcircuits.',
      'Understanding how sensory information is parsed and synthesized across divergent brain regions demands frameworks that account for both localized modularity and global synchrony.'
    ],
    'Quantum Computing': [
      'Preserving quantum coherence against destructive environmental decoherence remains the defining obstacle toward practical, fault-tolerant quantum hardware.',
      'Analyzing quantum many-body systems near critical phase boundaries is fundamentally constrained by the exponential growth of Hilbert space dimensions.',
      'A primary bottleneck in quantum communication is ensuring operational security in the presence of channel loss, thermal noise, and imperfect detectors.',
      'Characterizing non-equilibrium states in strongly coupled light-matter architectures demands mathematical tools that reach beyond idealized thermodynamic approximations.'
    ],
    'Astrophysics': [
      'Interpreting astronomical observations across cosmological distances requires disentangling faint galactic signatures from pervasive foreground radiation and dust.',
      'Reconstructing the evolutionary history of early galaxies depends on computational simulations that must bridge extreme physical scales from stellar cores to cosmic webs.',
      'Observational astrophysics routinely confronts the challenge of sparse, irregular sampling when monitoring transient, high-energy cosmic explosions.',
      'Constraining the physical properties of dark matter halos and interstellar magnetic fields requires observational precision at the edge of current sensor limits.'
    ],
    'Astrophysics & Space': [
      'Interpreting astronomical observations across cosmological distances requires disentangling faint galactic signatures from pervasive foreground radiation and dust.',
      'Reconstructing the evolutionary history of early galaxies depends on computational simulations that must bridge extreme physical scales from stellar cores to cosmic webs.',
      'Observational astrophysics routinely confronts the challenge of sparse, irregular sampling when monitoring transient, high-energy cosmic explosions.',
      'Constraining the physical properties of dark matter halos and interstellar magnetic fields requires observational precision at the edge of current sensor limits.'
    ],
    'Materials Science': [
      'Synthesizing advanced functional materials with bespoke electronic and mechanical properties is often thwarted by nanoscale structural defects and grain boundaries.',
      'Probing ultrafast non-equilibrium transitions in condensed matter requires tracking atomic lattice movements on sub-picosecond timescales.',
      'Developing next-generation energy storage materials demands resolving the chronic conflict between high ionic conductivity and long-term chemical stability.',
      'Characterizing light-driven phase transitions in strongly correlated electron systems has long been complicated by overlapping transient optical signatures.'
    ],
    'Climate & Earth Systems': [
      'Characterizing multi-scale biosphere-atmosphere feedbacks and tipping dynamics requires coupling high-resolution observational telemetry with fluid dynamic planetary models.',
      'Quantifying oceanic heat uptake and overturning circulation rates has historically been constrained by sparse deep-sea sensor deployments.',
      'Predicting non-linear cryosphere collapse demands integrating ice-sheet rheology with changing sub-glacial hydrological boundary conditions.',
      'Isolating anthropogenic climate forcing from natural decadal oscillations requires rigorous statistical filtering across century-long datasets.'
    ],
    'Robotics & Autonomous Systems': [
      'Achieving robust physical autonomy demands closing the perception-action loop under non-stationary dynamics, actuator saturation, and unpredictable contact mechanics.',
      'A primary bottleneck in embodied intelligence is transferring high-fidelity simulated policies to noisy physical hardware without catastrophic failure.',
      'Coordinating multi-robot cooperative swarms in unmapped environments requires distributed consensus mechanisms resilient against intermittent communication dropouts.',
      'Dynamic bipedal and quadrupedal locomotion requires real-time whole-body optimization to prevent loss of balance over irregular terrains.'
    ],
    'Computational Chemistry': [
      'Simulating chemical reaction pathways and macromolecular binding kinetics requires bridging quantum electronic structure calculations with macroscopic thermodynamic scales.',
      'Accurate prediction of catalytic transition states has long been hindered by the exponential growth of multi-electron configuration spaces.',
      'Designing selective molecular inhibitors demands calculating free energy binding perturbation landscapes with sub-kilocalorie precision.',
      'Integrating machine learning potentials into molecular dynamics simulations must guarantee strict conservation of physical symmetries and energy.'
    ],
    'Cryptographic Science': [
      'Establishing verifiable computational trust and privacy guarantees requires mathematical hard problems resilient against both classical side-channel attacks and quantum cryptanalysis.',
      'Developing practical zero-knowledge proof protocols requires minimizing prover memory footprints while ensuring sub-millisecond verification times.',
      'Modern distributed consensus mechanisms must preserve safety and liveness under asynchronous, adversarial network partitions.',
      'Transitioning modern public-key infrastructure to post-quantum lattice primitives introduces critical trade-offs between key size and handshake latency.'
    ],
    'Cognitive Science': [
      'Understanding biological intelligence requires formulating mathematical principles that explain how bounded cognitive agents form adaptive representations under severe information constraints.',
      'A foundational puzzle in cognitive science is how semantic knowledge is organized and retrieved from distributed neural memory networks.',
      'Characterizing human decision-making under uncertainty reveals systematic heuristic shortcuts that diverge from classical rational choice models.',
      'Investigating executive cognitive control demands isolating how the prefrontal cortex gates task-relevant sensory information while suppressing interference.'
    ],
    'Clinical Medicine & Health': [
      'Translating mechanistic physiological discoveries into demonstrable clinical survival outcomes requires navigating profound patient heterogeneity and multimorbid baseline variations.',
      'A persistent hurdle in translational medicine is mitigating adverse immunogenicity while preserving therapeutic potency across diverse clinical populations.',
      'Rigorously proving therapeutic efficacy requires isolating true clinical intervention benefits from confounding indications and natural disease trajectory shifts.',
      'Clinical trial validation demands establishing whether measurable surrogate biomarker endpoints reliably translate into long-term patient-centered survival metrics.'
    ],
    'Economics & Quantitative Finance': [
      'Equilibrium dynamics in complex financial and economic systems are governed by non-linear strategic interactions and endogenous liquidity feedback loops.',
      'A foundational challenge in empirical economics is identifying true causal mechanisms amidst endogenous policy shifts and pervasive observational confounding.',
      'Modeling market behavior requires accounting for how informational asymmetry and systemic interconnectedness amplify localized shocks into systemic distress.',
      'Evaluating macroeconomic policy interventions demands reconciling structural equilibrium models with dynamic, expectations-driven market realignments.'
    ],
    'Psychology & Behavioral Science': [
      'Deconstructing human cognition requires identifying how perceptual architectures, emotional valence, and heuristic biases interact to guide adaptive behavior.',
      'A central puzzle in behavioral science is reconciling the evolutionary utility of cognitive heuristics with their systematic failure in complex modern probabilistic domains.',
      'Investigating psychological resilience demands decoupling stable neurodevelopmental traits from transient environmental and sociocultural stressors.',
      'Measuring internal subjective psychological states requires developing behavioral paradigms that reliably capture latent cognitive variables.'
    ],
    'Pure & Applied Mathematics': [
      'Establishing rigorous mathematical foundations demands uncovering universal geometric and algebraic invariants that remain invariant across coordinate transformations.',
      'A defining goal of modern pure mathematics is bridging discrete arithmetic structures with continuous harmonic analysis and differential geometry.',
      'Proving existence and regularity in non-linear partial differential equations requires bounding Sobolev norms against sudden singularity blow-ups.',
      'Analyzing infinite-dimensional topological spaces demands developing homological machinery capable of classifying complex abstract manifolds.'
    ],
    'Ecology & Evolutionary Biology': [
      'Disentangling the multi-scale drivers of ecosystem resilience requires modeling non-linear trophic cascades and biogeochemical feedback loops under environmental pressure.',
      'A primary frontier in evolutionary biology is quantifying how epigenetic plasticity and horizontal gene flow interact with classic Mendelian selection regimes.',
      'Predicting biodiversity shifts under accelerated climate change requires integrating microclimate buffering with species dispersal constraints.',
      'Reconstructing macroevolutionary divergence rates requires calibrating phylogenetic molecular clocks against patchy fossil deposition records.'
    ],
    'Aerospace & Mechanical Engineering': [
      'Optimizing high-performance mechanical and aerospace structures demands resolving the coupled physics of turbulent boundary layers, structural aeroelasticity, and thermal fatigue.',
      'A critical challenge in modern hypersonics and propulsion is maintaining stable combustion while managing extreme aerothermal shock-boundary layer interactions.',
      'Engineering ultra-lightweight structural architectures requires characterizing non-linear microstructural buckling and crack propagation under cyclic stress.',
      'Dynamic flight control in unmodeled turbulent regimes requires adaptive real-time control algorithms with guaranteed stability envelopes.'
    ],
    'Philosophy & Ethics': [
      'Formulating rigorous ethical and epistemological frameworks requires deconstructing implicit normative assumptions and testing foundational principles against severe edge cases.',
      'A core question in philosophy of mind is reconciling objective neurocomputational descriptions of cognition with the subjective nature of conscious experience.',
      'Normative ethics in emerging technological frontiers demands reconciling deontological duties with consequentialist evaluations of existential and systemic risk.',
      'Epistemic justification requires resolving whether true knowledge requires counterfactual truth-tracking or coherent systemic integration.'
    ],
    'Law & Jurisprudence': [
      'Constitutional and legal jurisprudence must continually reconcile established doctrinal precedents with technological disruption and evolving social norms.',
      'A central dilemma in legal philosophy is establishing the legitimacy of judicial discretion in statutory interpretation without compromising institutional predictability.',
      'Governing complex technological systems requires regulatory frameworks capable of mitigating systemic risks without suffocating productive innovation.',
      'International legal order confronts the structural challenge of coordinating sovereign state actions without centralized coercive enforcement mechanisms.'
    ],
    'History & Archaeology': [
      'Reconstructing past human societies requires synthesizing fragmentary epigraphic records with multi-proxy archaeological and paleogenomic telemetry.',
      'A central challenge in historical analysis is identifying the socio-ecological tipping points that precipitated the collapse and reorganization of ancient civilizations.',
      'Interpreting material excavation strata requires isolating anthropogenic deposition signatures from pervasive taphonomic and geological weathering.',
      'Tracing deep civilizational trade networks demands combining ceramic provenance spectrometry with ancient biomolecular residue analysis.'
    ],
    'Sociology & Political Science': [
      'Understanding institutional cohesion and political polarization requires analyzing how structural network topology and economic inequality shape collective trust.',
      'A core inquiry in comparative politics is identifying the structural conditions under which democratic institutions endure or succumb to authoritarian consolidation.',
      'Investigating modern social movements demands analyzing how digital communication networks alter the threshold for grassroots collective action.',
      'Characterizing civic capacity requires evaluating how institutional design either mitigates or exacerbates systemic intergroup disparities.'
    ],
    'Linguistics & Language Science': [
      'Uncovering the biological and computational architecture of human language demands isolating invariant syntactic operations across typologically diverse linguistic families.',
      'A foundational puzzle in cognitive linguistics is how human learners generalize abstract recursive grammatical structures from sparse, noisy perceptual input.',
      'Computational semantics confronts the challenge of modeling how contextual pragmatic inference dynamically alters literal compositionality.',
      'Tracing language evolution requires reconciling statistical phonetic drift with universal cognitive constraints on speech production and perception.'
    ]
  };

  const defaultIntros = [
    'A central objective across modern empirical research is isolating governing physical principles amid complex environmental interference.',
    'Scientific progress often depends on re-evaluating foundational assumptions when anomalous measurements challenge existing analytical models.'
  ];

  const pool = fieldIntros[field] || defaultIntros;
  const contextSentence = pool[seed % pool.length];

  const p1Templates = [
    `${contextSentence} In this context, ${authors} examine ${title}. The investigation establishes that ${s0} By grounding their findings in verifiable evidence, the authors provide a principled foundation for evaluating these phenomena.`,
    `${contextSentence} To clarify these dynamics, ${authors} undertake a targeted inquiry titled ${title}. Their analysis centers on a direct observation: ${s0} This formulation offers a coherent framework that reconciles experimental observations with broader physical principles.`,
    `${contextSentence} Addressing this longstanding problem, ${authors} present ${title}. The authors demonstrate that ${s0} This work supplies concrete clarity where prior models were forced to rely on unverified assumptions.`,
    `${contextSentence} In their recent investigation, ${title}, ${authors} reconsider this question from first principles. Central to their study is the finding that ${s0} This approach establishes a transparent analytical baseline for researchers working across the field.`
  ];

  const methodOpeners = [
    'To systematically address this problem, the research team formulated a specialized methodological architecture.',
    'At the core of the technical procedure lies an experimental and analytical framework designed to isolate the governing dynamics.',
    'Rather than relying on broad heuristic approximations, the authors implemented a targeted operational workflow.',
    'The experimental strategy focuses directly on dissecting the underlying physical and structural mechanisms.',
    'To test these principles with empirical rigor, the investigators calibrated a dedicated multi-stage protocol.',
    'Methodologically, the study balances high-resolution measurement with stringent baseline controls.'
  ];

  const methodClosers = [
    'This setup allows the investigators to isolate governing variables with high fidelity, ensuring that the resulting signals reflect authentic physical behavior rather than experimental artifacts.',
    'By maintaining strict operational controls throughout, the workflow yields a high signal-to-noise ratio and provides a reliable basis for comparison.',
    'This structured formulation enables the researchers to probe dynamic parameter regimes that traditional approaches were unable to resolve.',
    'Through this systematic separation of variables, the authors eliminate the confounding influences that previously clouded interpretation.'
  ];

  const resultsOpeners = [
    'The resulting empirical measurements provide decisive verification of the system\'s behavior.',
    'When evaluated against standard performance baselines, the collected data revealed clear, reproducible patterns.',
    'Direct observations from these benchmark trials corroborated the foundational propositions of the work.',
    'The quantitative outcomes recorded during testing demonstrate measurable improvements across key parameters.',
    'A systematic review of the experimental outputs reveals compelling empirical support for the formulation.',
    'The recorded data points to several distinct findings that validate the researchers\' central claims.'
  ];

  const resultsClosers = [
    'Compared with historical baselines, these metrics demonstrate consistent predictive reliability and provide tangible proof that the underlying architecture functions as intended.',
    'These findings confirm that the observed improvements remain statistically significant across distinct operational regimes.',
    'The coherence of these quantitative results validates the core theoretical predictions without requiring post-hoc parameter adjustments.',
    'Crucially, the empirical gains were achieved without introducing secondary instabilities in related performance metrics.'
  ];

  const critiqueOpeners = [
    'While these findings mark a notable advance, critical operational boundaries remain to be charted.',
    'Every scientific milestone defines new questions, and this framework introduces distinct trade-offs.',
    'The authors explicitly identify several operational constraints that bound the current scope of the work.',
    'Despite the strength of these empirical demonstrations, several foundational questions require further exploration.',
    'Translating these findings into broader practical applications will depend on navigating specific physical boundaries.'
  ];

  const critiqueClosers = [
    'Future research will need to determine how these principles hold under extended operational conditions and whether the framework can be generalized to broader problems across the field.',
    'Addressing these lingering questions will be vital for assessing whether this methodology can transition from controlled environments to complex real-world settings.',
    'Subsequent investigations will likely focus on relaxing these assumptions to accommodate non-ideal, noise-heavy environments.',
    'As measurement tools continue to advance, probing these remaining edge cases will provide deeper clarity into the limits of the system.'
  ];

  const p1 = p1Templates[(seed * 3) % p1Templates.length];
  const p2 = `${methodOpeners[(seed * 7) % methodOpeners.length]} ${s1} ${methodClosers[(seed * 11) % methodClosers.length]}`;
  const p3 = `${resultsOpeners[(seed * 13) % resultsOpeners.length]} ${s2} ${resultsClosers[(seed * 17) % resultsClosers.length]}`;
  const p4 = `${critiqueOpeners[(seed * 19) % critiqueOpeners.length]} ${s3} ${critiqueClosers[(seed * 23) % critiqueClosers.length]}`;

  return [
    { heading: 'The Underlying Problem', body: p1 },
    { heading: 'The Core Mechanism', body: p2 },
    { heading: 'Evidence and Key Findings', body: p3 },
    { heading: 'Scientific Implications and Limits', body: p4 }
  ];
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
 * Universal clipboard copy helper with robust mobile/WebView fallbacks
 */
async function copyTextToClipboard(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    // Fall back to execCommand
  }
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.warn('Clipboard copy fallback failed:', err);
    return false;
  }
}

/**
 * Sanitize academic URLs: upgrade http to https, expand raw DOIs, and ensure mobile accessibility
 */
function sanitizePaperUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let url = rawUrl.trim();
  if (url.startsWith('http://arxiv.org/')) {
    url = url.replace('http://arxiv.org/', 'https://arxiv.org/');
  } else if (url.startsWith('http://doi.org/')) {
    url = url.replace('http://doi.org/', 'https://doi.org/');
  } else if (url.startsWith('http://')) {
    url = 'https://' + url.slice(7);
  }

  if (url.startsWith('10.') || url.startsWith('doi.org/')) {
    url = url.startsWith('doi.org/') ? 'https://' + url : 'https://doi.org/' + url;
  } else if (url.startsWith('arxiv.org/')) {
    url = 'https://' + url;
  }
  return url;
}

/**
 * Universally open paper primary sources in external phone browser or system window
 */
function openExternalPaperUrl(rawUrl, event) {
  if (event) {
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const cleanUrl = sanitizePaperUrl(rawUrl);
  if (!cleanUrl) {
    showToast('Primary research paper link unavailable');
    return;
  }

  // 1. Android Native Intent Bridge
  if (typeof window !== 'undefined' && window.FolerioNative && typeof window.FolerioNative.openExternalUrl === 'function') {
    try {
      window.FolerioNative.openExternalUrl(cleanUrl);
      return;
    } catch (e) {
      console.warn('Native openExternalUrl failed, falling back', e);
    }
  }

  // 2. Capacitor In-App Browser Plugin
  if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser) {
    try {
      window.Capacitor.Plugins.Browser.open({ url: cleanUrl });
      return;
    } catch (e) {}
  }

  // 3. System browser window
  window.open(cleanUrl, '_blank', 'noopener,noreferrer');
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
/**
 * Submit a nested peer reply to an existing comment
 */
function submitReply(postId, commentId) {
  const input = document.getElementById(`reply-input-${postId}-${commentId}`);
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
  if (!post || !post.comments) return;

  const targetComment = post.comments.find(c => c.id === commentId);
  if (!targetComment) return;

  // If scholar is not logged in: auto-copy draft to device clipboard & prompt login
  if (!state.currentUser) {
    copyTextToClipboard(text);
    sessionStorage.setItem('folerio_pending_comment_draft', text);
    sessionStorage.setItem('folerio_pending_comment_post_id', postId);
    openAuthModal('signin');
    showToast('📋 Reply copied to clipboard! Please sign in to publish.', 'info');
    return;
  }

  if (!targetComment.replies) targetComment.replies = [];
  const currentAuthor = state.currentUser ? state.currentUser.name : 'Peer Scholar';
  const newReply = {
    id: 'r-' + Date.now(),
    author: currentAuthor,
    text: text,
    time: 'Just now'
  };
  targetComment.replies.push(newReply);

  input.value = '';
  toggleReplyBox(postId, commentId);

  // Sync to Supabase & LocalStorage with network failure safeguard
  try {
    SupabaseBridge.recordInteraction(postId, 'reply', { commentId, reply: newReply });
  } catch (err) {
    copyTextToClipboard(text);
    showToast('📡 Network issue: Reply copied to clipboard & saved locally.', 'info');
  }

  // Update UI instantly
  refreshCommentsView(postId);
  showToast('Reply published to discussion thread');
}

/**
 * Refresh comments list and total discussion count on the card
 */
function refreshCommentsView(postId) {
  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
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
  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
  if (!post) return;

  // If scholar is not logged in: auto-copy draft to device clipboard & prompt login
  if (!state.currentUser) {
    copyTextToClipboard(text);
    sessionStorage.setItem('folerio_pending_comment_draft', text);
    sessionStorage.setItem('folerio_pending_comment_post_id', postId);
    openAuthModal('signin');
    showToast('📋 Critique copied to clipboard! Please sign in to publish.', 'info');
    return;
  }

  if (!post.comments) post.comments = [];
  const commentAuthor = state.currentUser ? state.currentUser.name : 'Peer Scholar';
  const newComment = {
    id: 'c-' + Date.now(),
    author: commentAuthor,
    text: text,
    time: 'Just now',
    replies: []
  };
  post.comments.push(newComment);

  input.value = '';

  // Sync to Supabase & LocalStorage with network failure safeguard
  try {
    SupabaseBridge.recordInteraction(postId, 'comment', newComment);
  } catch (err) {
    copyTextToClipboard(text);
    showToast('📡 Network issue: Critique copied to clipboard & saved locally.', 'info');
  }

  // Update UI instantly
  refreshCommentsView(postId);
  showToast('Critique added to discussion thread');
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

  // Explore Faculty Filter Tabs
  document.querySelectorAll('#exploreFacultyTabs .faculty-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#exploreFacultyTabs .faculty-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const faculty = btn.dataset.faculty || 'all';
      renderExploreDisciplinesGrid(faculty);
    });
  });

  // Feed Mode Switcher (Frontier Research vs Foundations 101 vs Books / Chapters)
  function setFeedMode(mode) {
    state.feedMode = mode;
    state.pageLimit = 15;
    state.showSavedOnly = false;

    const isPrimer = mode === 'primer';
    const isBooks = mode === 'books';
    const isFrontier = mode === 'frontier';

    document.getElementById('modeFrontierBtn')?.classList.toggle('active', isFrontier);
    document.getElementById('modePrimerBtn')?.classList.toggle('active', isPrimer);
    document.getElementById('modeBooksBtn')?.classList.toggle('active', isBooks);

    document.getElementById('navPrimerBtn')?.classList.toggle('active', isPrimer);
    document.getElementById('navBooksBtn')?.classList.toggle('active', isBooks);
    document.getElementById('navFeedBtn')?.classList.toggle('active', isFrontier);
    document.getElementById('navSavedBtn')?.classList.remove('active');
    document.getElementById('filterSavedOnly')?.classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderFeed();
  }

  document.getElementById('modeFrontierBtn')?.addEventListener('click', () => {
    setFeedMode('frontier');
  });

  document.getElementById('modePrimerBtn')?.addEventListener('click', () => {
    setFeedMode('primer');
  });

  document.getElementById('modeBooksBtn')?.addEventListener('click', () => {
    setFeedMode('books');
  });

  // Sidebar Nav: Books & Chapters
  document.getElementById('navBooksBtn')?.addEventListener('click', () => {
    setFeedMode('books');
    document.getElementById('sidebarNav')?.classList.remove('mobile-open');
  });

  // Sidebar Nav: Foundations (Basics)
  document.getElementById('navPrimerBtn')?.addEventListener('click', () => {
    setFeedMode('primer');
    document.getElementById('sidebarNav')?.classList.remove('mobile-open');
  });

  // Sidebar Nav: Dispatch Feed
  document.getElementById('navFeedBtn')?.addEventListener('click', () => {
    setFeedMode('frontier');
    syncTopicSelection('all');
  });

  // Sidebar Nav: Saved Folios
  document.getElementById('navSavedBtn')?.addEventListener('click', () => {
    state.showSavedOnly = true;
    document.getElementById('navSavedBtn')?.classList.add('active');
    document.getElementById('navFeedBtn')?.classList.remove('active');
    document.getElementById('navPrimerBtn')?.classList.remove('active');
    document.getElementById('filterSavedOnly')?.classList.add('active');
    renderFeed();
  });

  // Top Bar Saved Toggle Button
  document.getElementById('filterSavedOnly')?.addEventListener('click', (e) => {
    state.showSavedOnly = !state.showSavedOnly;
    e.currentTarget.classList.toggle('active', state.showSavedOnly);
    document.getElementById('navSavedBtn')?.classList.toggle('active', state.showSavedOnly);
    if (!state.showSavedOnly) {
      if (state.feedMode === 'primer') {
        document.getElementById('navPrimerBtn')?.classList.add('active');
      } else {
        document.getElementById('navFeedBtn')?.classList.add('active');
      }
    } else {
      document.getElementById('navFeedBtn')?.classList.remove('active');
      document.getElementById('navPrimerBtn')?.classList.remove('active');
    }
    renderFeed();
  });

  // Sidebar Nav: Folio Studio
  document.getElementById('navStudioBtn')?.addEventListener('click', () => {
    openFolioStudio();
  });

  // Search input
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    state.pageLimit = 15;
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

  // Mobile menu drawer with backdrop overlay & outside-click close
  const sidebarNav = document.getElementById('sidebarNav');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');

  const openMobileMenu = () => {
    sidebarNav?.classList.add('mobile-open');
    sidebarOverlay?.classList.add('active');
    document.body.classList.add('menu-locked');
  };

  const closeMobileMenu = () => {
    sidebarNav?.classList.remove('mobile-open');
    sidebarOverlay?.classList.remove('active');
    document.body.classList.remove('menu-locked');
  };

  mobileMenuToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebarNav?.classList.contains('mobile-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  sidebarOverlay?.addEventListener('click', closeMobileMenu);
  document.getElementById('sidebarCollapseBtn')?.addEventListener('click', closeMobileMenu);

  // Tapping empty space outside sidebar closes it
  document.addEventListener('click', (e) => {
    if (sidebarNav?.classList.contains('mobile-open')) {
      if (!sidebarNav.contains(e.target) && e.target !== mobileMenuToggle && !mobileMenuToggle?.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Tapping any sidebar navigation link closes the drawer automatically
  sidebarNav?.querySelectorAll('.nav-item, .discipline-nav-item, .theme-toggle-row').forEach(item => {
    item.addEventListener('click', closeMobileMenu);
  });

  // Instagram-Style Mobile Bottom Navigation Tabs (Phone Only)
  // Mobile Bottom Navigation Tabs
  const mobileTabs = document.querySelectorAll('.mobile-nav-tab');
  window.setMobileActiveTab = (activeId) => {
    mobileTabs.forEach(tab => tab.classList.toggle('active', tab.id === activeId));
  };

  document.getElementById('mobileTabHome')?.addEventListener('click', () => {
    state.showSavedOnly = false;
    document.getElementById('filterSavedOnly')?.classList.remove('active');
    syncTopicSelection('all');
    switchMainView('feed');
  });

  document.getElementById('mobileTabExplore')?.addEventListener('click', () => {
    switchMainView('explore');
  });

  document.getElementById('mobileTabCreate')?.addEventListener('click', () => {
    requireAuth(openFolioStudio);
  });

  document.getElementById('mobileTabSaved')?.addEventListener('click', () => {
    state.showSavedOnly = true;
    document.getElementById('filterSavedOnly')?.classList.add('active');
    switchMainView('feed');
    renderFeed();
  });

  document.getElementById('mobileTabAccount')?.addEventListener('click', () => {
    switchMainView('profile');
  });

  // Sidebar Menu Navigation Links
  document.getElementById('navFeedBtn')?.addEventListener('click', () => {
    state.showSavedOnly = false;
    document.getElementById('filterSavedOnly')?.classList.remove('active');
    syncTopicSelection('all');
    switchMainView('feed');
  });

  document.getElementById('navExploreBtn')?.addEventListener('click', () => {
    switchMainView('explore');
  });

  document.getElementById('navSavedBtn')?.addEventListener('click', () => {
    state.showSavedOnly = true;
    document.getElementById('filterSavedOnly')?.classList.add('active');
    switchMainView('feed');
    renderFeed();
  });

  document.getElementById('navCacheSettingsBtn')?.addEventListener('click', () => {
    openCacheSettingsModal();
  });

  document.getElementById('navProfileBtn')?.addEventListener('click', () => {
    switchMainView('profile');
  });

  document.getElementById('topbarAccountBtn')?.addEventListener('click', () => {
    switchMainView('profile');
  });

  document.getElementById('sidebarProfileWidget')?.addEventListener('click', () => {
    switchMainView('profile');
  });

  setupAuthModalListeners();
  setupCacheSettingsListeners();


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
  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('shareModal');
  const input = document.getElementById('shareUrlInput');
  const publicOrigin = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'capacitor:')
    ? 'https://ihtishamnaeem36.github.io/researcher-social/'
    : `${window.location.origin}${window.location.pathname}`;
  const cleanOrigin = publicOrigin.endsWith('/') ? publicOrigin : `${publicOrigin}/`;
  const url = `${cleanOrigin}#folio-${postId}`;
  if (input) input.value = url;

  // Social share buttons
  const xBtn = document.getElementById('shareOnXBtn');
  if (xBtn) {
    xBtn.onclick = () => {
      const text = encodeURIComponent(`Check out this breakthrough research Folio on Folerio: "${post.title}"\n${url}`);
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };
  }

  const inBtn = document.getElementById('shareOnLinkedInBtn');
  if (inBtn) {
    inBtn.onclick = () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };
  }

  const dlBtn = document.getElementById('downloadCurrentCardBtn');
  if (dlBtn) {
    dlBtn.onclick = () => {
      const card = document.getElementById(`post-${postId}`);
      let activeIdx = 0;
      if (card) {
        const track = card.querySelector('.carousel-track');
        if (track) {
          const slideWidth = track.clientWidth || 1;
          activeIdx = Math.round(track.scrollLeft / slideWidth);
        }
      }
      modal.style.display = 'none';
      captureSingleSlideClean(postId, activeIdx);
    };
  }

  // 1-Click Academic Citation Formatter (APA, BibTeX, Nature, MLA)
  let activeCitationFmt = 'apa';
  const previewBox = document.getElementById('citationPreviewBox');
  const updateCitation = () => {
    if (previewBox) previewBox.textContent = generateCitation(post, activeCitationFmt);
  };
  updateCitation();

  document.querySelectorAll('.citation-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.citation-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCitationFmt = tab.getAttribute('data-fmt') || 'apa';
      updateCitation();
      try {
        if (navigator.vibrate) navigator.vibrate(10);
      } catch (e) {}
    };
  });

  const copyCitBtn = document.getElementById('copyCitationBtn');
  if (copyCitBtn) {
    copyCitBtn.onclick = () => {
      const cit = generateCitation(post, activeCitationFmt);
      navigator.clipboard.writeText(cit);
      showToast(`📋 ${activeCitationFmt.toUpperCase()} citation copied to clipboard!`);
      try {
        if (navigator.vibrate) navigator.vibrate(20);
      } catch (e) {}
    };
  }

  if (modal) modal.style.display = 'flex';
}

function generateCitation(post, format = 'apa') {
  if (!post) return '';
  const year = '2026';
  const title = post.title || 'Untitled Research Folio';
  const authors = post.authors || 'Unknown Scholar';
  const doi = post.doi ? ` https://doi.org/${post.doi}` : '';
  const url = `${window.location.origin}${window.location.pathname}#folio-${post.id}`;

  switch (format) {
    case 'bibtex':
      const citeKey = (authors.split(',')[0].replace(/[^a-zA-Z]/g, '') || 'scholar').toLowerCase() + year;
      return `@article{${citeKey},
  title = {${title}},
  author = {${authors}},
  journal = {Folerio Monograph Series},
  year = {${year}},
  url = {${url}}
}`;
    case 'nature':
      return `${authors}. ${title}. Folerio Dispatches (2026).${doi}`;
    case 'mla':
      return `${authors}. "${title}." Folerio, 2026, ${url}.`;
    case 'apa':
    default:
      return `${authors} (${year}). ${title}. Folerio Peer Dispatches.${doi || ' ' + url}`;
  }
}

/* ==========================================================================
   Audio Narration (Text-to-Speech) for Research Folios
   ========================================================================== */
let currentUtterance = null;
let currentAudioPostId = null;
let audioHeartbeatTimer = null;

function toggleAudioNarration(postId) {
  const btn = document.getElementById(`illuminate-audio-${postId}`);

  if (window.speechSynthesis && window.speechSynthesis.speaking && currentAudioPostId === postId) {
    window.speechSynthesis.cancel();
    if (audioHeartbeatTimer) clearInterval(audioHeartbeatTimer);
    btn?.classList.remove('speaking-wave');
    currentAudioPostId = null;
    showToast('Audio narration paused');
    return;
  }

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    if (audioHeartbeatTimer) clearInterval(audioHeartbeatTimer);
  }
  document.querySelectorAll('.illuminate-audio-btn').forEach(b => b.classList.remove('speaking-wave'));

  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
  if (!post) return;

  if (!('speechSynthesis' in window)) {
    showToast('Speech synthesis is not supported on this browser');
    return;
  }

  // Construct narrative text from the in-depth exposition
  let narrativeParts = [`${post.title}. Monograph by ${post.authors || 'Folerio Research Group'}.`];
  if (post.exposition) {
    if (post.exposition.background) narrativeParts.push(`Context and Background: ${post.exposition.background}`);
    if (post.exposition.methodology) narrativeParts.push(`Methodology and Framework: ${post.exposition.methodology}`);
    if (post.exposition.findings) narrativeParts.push(`Key Findings and Empirical Results: ${post.exposition.findings}`);
    if (post.exposition.implications) narrativeParts.push(`Scholarly Implications: ${post.exposition.implications}`);
  } else {
    post.slides.forEach((s, idx) => {
      narrativeParts.push(`Slide ${idx + 1}, ${s.title}: ${s.hook || ''} ${s.content || ''}`);
    });
  }

  // Strip any accidental HTML tags
  const rawText = narrativeParts.join(' ').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');

  const utter = new SpeechSynthesisUtterance(rawText);
  utter.rate = 1.0;
  utter.pitch = 1.0;
  utter.lang = 'en-US';

  utter.onstart = () => {
    currentAudioPostId = postId;
    btn?.classList.add('speaking-wave');
    showToast('🎧 Playing scholarly exposition audio');
    try {
      if (navigator.vibrate) navigator.vibrate(15);
    } catch (e) {}

    // Android WebView keepalive heartbeat
    audioHeartbeatTimer = setInterval(() => {
      if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
        clearInterval(audioHeartbeatTimer);
      } else {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  };

  utter.onend = () => {
    btn?.classList.remove('speaking-wave');
    currentAudioPostId = null;
    if (audioHeartbeatTimer) clearInterval(audioHeartbeatTimer);
  };

  utter.onerror = (e) => {
    console.warn('Speech error:', e);
    btn?.classList.remove('speaking-wave');
    currentAudioPostId = null;
    if (audioHeartbeatTimer) clearInterval(audioHeartbeatTimer);
  };

  currentUtterance = utter;
  window.speechSynthesis.speak(utter);
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

/* ==========================================================================
   View Router (Feed, Explore, Profile)
   ========================================================================== */
function switchMainView(viewName) {
  state.activeView = viewName;

  const feedView = document.getElementById('feedViewContainer');
  const exploreView = document.getElementById('exploreViewContainer');
  const profileView = document.getElementById('profileViewContainer');

  if (feedView) feedView.style.display = viewName === 'feed' ? 'block' : 'none';
  if (exploreView) exploreView.style.display = viewName === 'explore' ? 'block' : 'none';
  if (profileView) profileView.style.display = viewName === 'profile' ? 'block' : 'none';

  // Sidebar navigation active classes
  document.querySelectorAll('.sidebar-menu .nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-nav') === viewName);
  });

  const viewText = document.getElementById('currentViewText');
  if (viewName === 'feed') {
    if (window.setMobileActiveTab) window.setMobileActiveTab('mobileTabHome');
    if (viewText) viewText.textContent = state.showSavedOnly ? 'Saved Library' : 'Dispatch: All Fields';
    renderFeed();
  } else if (viewName === 'explore') {
    if (window.setMobileActiveTab) window.setMobileActiveTab('mobileTabExplore');
    if (viewText) viewText.textContent = 'Explore: Global Horizons';
    renderExploreDisciplinesGrid();
    renderExploreFeed();
  } else if (viewName === 'profile') {
    if (window.setMobileActiveTab) window.setMobileActiveTab('mobileTabAccount');
    if (viewText) viewText.textContent = state.currentUser ? 'Scholar Profile' : 'Guest Scholar Portal';
    renderProfileView();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   Explore Disciplines Matrix & Unfollowed Breakthroughs
   ========================================================================== */
const MASTER_DISCIPLINES = [
  // Famous / High-Velocity Tier
  { name: 'AI & Machine Learning', icon: '⚡', color: '#38bdf8', faculty: 'engineering', tier: 'famous', description: 'Deep learning, neural foundation models, autonomous agents, and inference engines' },
  { name: 'Biotech & Genetics', icon: '🧬', color: '#34d399', faculty: 'natural', tier: 'famous', description: 'CRISPR gene editing, synthetic biology, mRNA therapeutics, and genomics' },
  { name: 'Quantum Computing', icon: '⚛️', color: '#fbbf24', faculty: 'formal', tier: 'famous', description: 'Qubit coherence, quantum algorithms, error correction, and entanglement' },
  { name: 'Neuroscience', icon: '🧠', color: '#a78bfa', faculty: 'natural', tier: 'famous', description: 'Neural circuits, connectomics, neuroplasticity, and brain-computer interfaces' },
  { name: 'Materials Science', icon: '🔬', color: '#f59e0b', faculty: 'natural', tier: 'famous', description: 'Superconductors, 2D nanomaterials, metamaterials, and energy storage' },
  { name: 'Astrophysics & Space', icon: '🔭', color: '#c084fc', faculty: 'natural', tier: 'famous', description: 'Cosmology, gravitational waves, exoplanet atmospheres, and stellar evolution' },
  { name: 'Clinical Medicine & Health', icon: '🩺', color: '#ef4444', faculty: 'medical', tier: 'famous', description: 'Translational oncology, immunology, clinical trials, and epidemiology' },
  { name: 'Economics & Quantitative Finance', icon: '📈', color: '#10b981', faculty: 'social', tier: 'famous', description: 'Game theory, econometric modeling, market equilibria, and behavioral finance' },
  { name: 'Psychology & Behavioral Science', icon: '🧩', color: '#f43f5e', faculty: 'social', tier: 'famous', description: 'Cognitive biases, social psychology, decision science, and perception' },
  { name: 'Climate & Earth Systems', icon: '🌿', color: '#22c55e', faculty: 'natural', tier: 'famous', description: 'Atmospheric dynamics, cryosphere tipping points, and biogeochemical cycles' },
  { name: 'Robotics & Autonomous Systems', icon: '🤖', color: '#06b6d4', faculty: 'engineering', tier: 'famous', description: 'Kinematics, sensor fusion, spatial perception, and robotic manipulation' },

  // Core, Formal & Humanities Tier
  { name: 'Pure & Applied Mathematics', icon: '📐', color: '#6366f1', faculty: 'formal', tier: 'core', description: 'Algebraic topology, number theory, differential geometry, and analysis' },
  { name: 'Computational Chemistry', icon: '🧪', color: '#ec4899', faculty: 'natural', tier: 'core', description: 'Molecular dynamics, density functional theory, and catalyst design' },
  { name: 'Cryptographic Science', icon: '🔐', color: '#8b5cf6', faculty: 'formal', tier: 'core', description: 'Post-quantum lattice cryptography, zero-knowledge proofs, and secure multiparty compute' },
  { name: 'Cognitive Science', icon: '💡', color: '#f97316', faculty: 'natural', tier: 'core', description: 'Mental representations, embodied cognition, linguistics, and reasoning' },
  { name: 'Ecology & Evolutionary Biology', icon: '🌱', color: '#84cc16', faculty: 'natural', tier: 'core', description: 'Phylogenetics, speciation, ecosystem resilience, and population dynamics' },
  { name: 'Aerospace & Mechanical Engineering', icon: '🚀', color: '#0ea5e9', faculty: 'engineering', tier: 'core', description: 'Hypersonic aerodynamics, propulsion systems, structural dynamics, and turbulence' },
  { name: 'Philosophy & Ethics', icon: '🏛️', color: '#eab308', faculty: 'humanities', tier: 'core', description: 'Epistemology, normative ethics, philosophy of mind, and existential risk' },
  { name: 'Law & Jurisprudence', icon: '⚖️', color: '#e11d48', faculty: 'humanities', tier: 'core', description: 'Constitutional theory, digital sovereignty, legal informatics, and governance' },
  { name: 'History & Archaeology', icon: '🏺', color: '#d97706', faculty: 'humanities', tier: 'core', description: 'Ancient civilizations, excavation strata, paleogenomics, and epigraphy' },
  { name: 'Sociology & Political Science', icon: '🌐', color: '#14b8a6', faculty: 'social', tier: 'core', description: 'Institutional dynamics, democratization, network sociology, and statecraft' },
  { name: 'Linguistics & Language Science', icon: '🗣️', color: '#a855f7', faculty: 'humanities', tier: 'core', description: 'Formal syntax, phonology, computational semantics, and typological evolution' }
];

const EXPLORE_DISCIPLINES = MASTER_DISCIPLINES;

function renderExploreDisciplinesGrid(facultyFilter = null) {
  const container = document.getElementById('exploreDisciplinesGrid');
  if (!container) return;

  if (facultyFilter) {
    state.exploreFaculty = facultyFilter;
  }
  const currentFaculty = state.exploreFaculty || 'all';

  let list = MASTER_DISCIPLINES;
  if (currentFaculty === 'famous') {
    list = MASTER_DISCIPLINES.filter(d => d.tier === 'famous');
  } else if (currentFaculty !== 'all') {
    list = MASTER_DISCIPLINES.filter(d => d.faculty === currentFaculty || (currentFaculty === 'medical' && d.faculty === 'natural' && d.name.includes('Biotech')));
  }

  container.innerHTML = list.map(disc => {
    const isTracked = state.trackedTopics.has(disc.name);
    const count = state.posts.filter(p => p.field === disc.name).length;
    return `
      <div class="discipline-matrix-card" onclick="filterByField('${escapeHTML(disc.name)}')">
        <div class="matrix-card-top">
          <div class="matrix-icon-chip" style="border-color:${disc.color}40; background:${disc.color}15;">${disc.icon}</div>
          <div style="flex:1; min-width:0;">
            <div class="matrix-card-title">${escapeHTML(disc.name)}</div>
            <div class="matrix-card-count">${count} Folios &bull; <span style="text-transform:capitalize; color:var(--text-muted); font-size:0.75rem;">${disc.faculty}</span></div>
          </div>
        </div>
        ${disc.description ? `<p style="font-size:0.78rem; color:var(--text-secondary); margin:0.4rem 0 0.8rem; line-height:1.4;">${escapeHTML(disc.description)}</p>` : ''}
        <div class="matrix-card-bottom">
          <span style="font-size:0.75rem; color:var(--text-muted);">Inspect Frontier &rarr;</span>
          <button class="track-topic-btn ${isTracked ? 'active' : ''}" onclick="event.stopPropagation(); toggleTrackTopic('${escapeHTML(disc.name)}')">
            ${isTracked ? '✓ Tracking' : '+ Track'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderExploreFeed() {
  const container = document.getElementById('explorePostsFeed');
  if (!container) return;

  // Prefer unfollowed disciplines or breakthrough research
  let unfollowed = state.posts.filter(p => !state.trackedTopics.has(p.field));
  if (unfollowed.length < 6) {
    unfollowed = state.posts.slice().reverse();
  }
  const curated = interleaveDisciplinesByImpact(unfollowed);

  container.innerHTML = curated.slice(0, 10).map(post => renderPostCard(post)).join('');
  initCarousels();
}

/* ==========================================================================
   Scholar Profile View (LinkedIn + Instagram Hybrid)
   ========================================================================== */
function renderProfileView() {
  const container = document.getElementById('profileContentArea');
  if (!container) return;

  if (!state.currentUser) {
    // Guest Mode / Guest Scholar Profile (Large Circle Avatar, Scholar Identity, Auth Options)
    container.innerHTML = `
      <div class="profile-view-wrap">
        <div class="ghost-profile-card">
          <!-- Large Profile Circle Avatar -->
          <div class="ghost-avatar-circle">
            <span class="ghost-emoji-face">🎓</span>
          </div>

          <!-- Name Place: Guest Scholar -->
          <h1 class="ghost-profile-name">Guest Scholar</h1>
          <div class="ghost-profile-handle">@scholar.guest · Stealth Reading Mode</div>

          <p class="ghost-profile-bio">You are currently exploring Folerio in anonymous guest mode. Sign in or register to publish research Folios, join academic discourse, and sync your library across devices.</p>

          <div class="ghost-auth-actions" style="display:flex; flex-direction:column; gap:0.5rem; width:100%; max-width:380px;">
            <button type="button" class="btn-google-auth" onclick="SupabaseBridge.signInWithGoogle()" style="width:100%; margin-bottom:0.25rem;">
              <svg class="google-svg-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <div style="display:flex; gap:0.5rem; width:100%;">
              <button class="btn btn-primary btn-auth-lg" style="flex:1;" onclick="openAuthModal('signin')">Sign In</button>
              <button class="btn btn-outline btn-auth-lg" style="flex:1;" onclick="openAuthModal('signup')">Create Account</button>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="openCacheSettingsModal()" style="width:100%; margin-top:0.4rem;">
              ⚙️ Offline Library & Cache Settings
            </button>
          </div>

          <!-- Scholar Network Benefits -->
          <div class="ghost-benefits-box">
            <div class="benefit-item">
              <span class="benefit-icon">🏛️</span>
              <div class="benefit-text">
                <strong>Academic Profile Credentials</strong>
                <span>Showcase your University, Lab, ORCID iD, and Google Scholar citations.</span>
              </div>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">🤝</span>
              <div class="benefit-text">
                <strong>Colleague Discourse</strong>
                <span>Connect with breakthrough researchers and debate peer critiques.</span>
              </div>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">⚡</span>
              <div class="benefit-text">
                <strong>Cloud & Offline Sync</strong>
                <span>Auto-cache 500 to 5,000 folios on your device for reading anywhere.</span>
              </div>
            </div>
          </div>

          <!-- Social / Activity Stats Row -->
          <div class="scholar-stats-row">
            <div class="stat-col"><span class="stat-item-num">0</span><span class="stat-item-label">Published</span></div>
            <div class="stat-col"><span class="stat-item-num">${state.colleagues.size}</span><span class="stat-item-label">Colleagues</span></div>
            <div class="stat-col"><span class="stat-item-num">${state.trackedTopics.size}</span><span class="stat-item-label">Tracked Fields</span></div>
            <div class="stat-col"><span class="stat-item-num">${state.savedPostIds.size}</span><span class="stat-item-label">Saved</span></div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Authenticated Scholar
    const u = state.currentUser;
    const myFolios = state.posts.filter(p => (p.authors || '').includes(u.name) || p.id.startsWith('user-'));
    const savedFolios = state.posts.filter(p => state.savedPostIds.has(p.id));

    let tabContentHTML = '';
    if (state.profileActiveTab === 'folios') {
      tabContentHTML = myFolios.length > 0
        ? `<div class="posts-feed">${myFolios.map(p => renderPostCard(p)).join('')}</div>`
        : `<div class="empty-state" style="padding:2rem 1rem;"><p>You haven't drafted any Folios yet.</p><button class="btn btn-primary btn-sm" onclick="openFolioStudio()" style="margin-top:0.5rem;">Draft First Folio</button></div>`;
    } else if (state.profileActiveTab === 'saved') {
      tabContentHTML = savedFolios.length > 0
        ? `<div class="posts-feed">${savedFolios.map(p => renderPostCard(p)).join('')}</div>`
        : `<div class="empty-state" style="padding:2rem 1rem;"><p>No saved folios in your library yet.</p></div>`;
    } else if (state.profileActiveTab === 'colleagues') {
      tabContentHTML = state.colleagues.size > 0
        ? `<div style="display:flex; flex-direction:column; gap:0.5rem;">${[...state.colleagues].map(c => `
          <div style="background:var(--bg-surface); padding:0.75rem 1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:600; font-size:0.88rem;">${escapeHTML(c)}</span>
            <button class="colleague-btn active" onclick="toggleColleague(event, '${escapeHTML(c)}')">✓ Connected</button>
          </div>
        `).join('')}</div>`
        : `<div class="empty-state" style="padding:2rem 1rem;"><p>No colleagues connected yet. Tap <strong>+ Colleague</strong> on paper headers to connect.</p></div>`;
    } else if (state.profileActiveTab === 'topics') {
      tabContentHTML = state.trackedTopics.size > 0
        ? `<div style="display:flex; flex-direction:column; gap:0.5rem;">${[...state.trackedTopics].map(t => `
          <div style="background:var(--bg-surface); padding:0.75rem 1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:600; font-size:0.88rem;">${escapeHTML(t)}</span>
            <button class="track-topic-btn active" onclick="toggleTrackTopic('${escapeHTML(t)}')">✓ Tracking</button>
          </div>
        `).join('')}</div>`
        : `<div class="empty-state" style="padding:2rem 1rem;"><p>No disciplines tracked yet. Head to Explore to track fields.</p></div>`;
    }

    container.innerHTML = `
      <div class="profile-view-wrap">
        <div class="scholar-profile-card">
          <div class="scholar-header-row">
            <div class="scholar-avatar-circle">
              ${u.avatarUrl ? `<img src="${escapeHTML(u.avatarUrl)}" alt="${escapeHTML(u.name)}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : escapeHTML(u.avatarInitials || getInitials(u.name))}
            </div>
            <div class="scholar-meta-col">
              <div class="scholar-name-row">
                <h2 class="scholar-name-h2">${escapeHTML(u.name)}</h2>
                <span class="verified-scholar-chip">✓ Verified Scholar</span>
              </div>
              <div class="scholar-affiliation">${escapeHTML(u.institution || 'Research Scholar')}</div>
              <div class="scholar-lab">${escapeHTML(u.department || 'Independent Investigator')}</div>
            </div>
          </div>

          <!-- LinkedIn Credentials Box -->
          <div class="scholar-credentials-box">
            <div class="credential-row">
              <span class="credential-label">Primary Field:</span>
              <span class="credential-value">${escapeHTML(u.field || 'General Science')}</span>
            </div>
            ${u.orcid ? `<div class="credential-row"><span class="credential-label">ORCID iD:</span><span class="credential-value" style="color:var(--accent-cyan);">${escapeHTML(u.orcid)}</span></div>` : ''}
            ${u.bio ? `<div class="credential-row" style="flex-direction:column; gap:2px;"><span class="credential-label">Research Focus:</span><span class="credential-value" style="color:var(--text-secondary);">${escapeHTML(u.bio)}</span></div>` : ''}
          </div>

          <!-- Instagram Stats Row -->
          <div class="scholar-stats-row">
            <div class="stat-col"><span class="stat-item-num">${myFolios.length}</span><span class="stat-item-label">Published</span></div>
            <div class="stat-col"><span class="stat-item-num">${state.colleagues.size}</span><span class="stat-item-label">Colleagues</span></div>
            <div class="stat-col"><span class="stat-item-num">${state.trackedTopics.size}</span><span class="stat-item-label">Tracked Fields</span></div>
            <div class="stat-col"><span class="stat-item-num">${savedFolios.length}</span><span class="stat-item-label">Saved</span></div>
          </div>

          <div class="scholar-buttons-row">
            <button class="btn btn-primary btn-sm" onclick="openEditProfileModal()">Edit Profile</button>
            <button class="btn btn-outline btn-sm" onclick="openCacheSettingsModal()">Offline & Storage</button>
            <button class="btn btn-danger-outline btn-sm" onclick="signOutScholar()">Log Out</button>
          </div>

          <!-- Account Settings & Security Hub -->
          <div class="scholar-settings-hub">
            <div class="settings-hub-header">
              <span class="settings-hub-title">⚙️ Account Settings & Security</span>
            </div>
            <div class="settings-hub-grid">
              <div class="settings-hub-item">
                <span class="settings-item-label">Account Email</span>
                <span class="settings-item-value">${escapeHTML(u.email || 'Verified Account')}</span>
              </div>
              <div class="settings-hub-item">
                <span class="settings-item-label">Cloud Sync</span>
                <span class="settings-item-value" style="color:var(--accent-cyan);">● Supabase Connected</span>
              </div>
              <div class="settings-hub-item">
                <span class="settings-item-label">Password & Recovery</span>
                <button type="button" class="btn btn-outline btn-xs" onclick="triggerAccountPasswordReset('${escapeHTML(u.email || '')}')">Send Reset Link to Email</button>
              </div>
              <div class="settings-hub-item">
                <span class="settings-item-label">Offline Archive</span>
                <button type="button" class="btn btn-outline btn-xs" onclick="openCacheSettingsModal()">Configure Cache Capacity</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Tabs -->
        <div class="profile-tabs-strip">
          <button class="profile-tab-btn ${state.profileActiveTab === 'folios' ? 'active' : ''}" onclick="setProfileTab('folios')">My Folios (${myFolios.length})</button>
          <button class="profile-tab-btn ${state.profileActiveTab === 'saved' ? 'active' : ''}" onclick="setProfileTab('saved')">Saved Library (${savedFolios.length})</button>
          <button class="profile-tab-btn ${state.profileActiveTab === 'colleagues' ? 'active' : ''}" onclick="setProfileTab('colleagues')">Colleagues (${state.colleagues.size})</button>
          <button class="profile-tab-btn ${state.profileActiveTab === 'topics' ? 'active' : ''}" onclick="setProfileTab('topics')">Tracked Fields (${state.trackedTopics.size})</button>
        </div>

        <div id="profileTabBody">
          ${tabContentHTML}
        </div>
      </div>
    `;
    initCarousels();
  }
}

async function triggerAccountPasswordReset(email) {
  let targetEmail = email;
  if (!targetEmail || targetEmail === 'undefined') {
    targetEmail = prompt('Enter your registered email address for password recovery:');
  }
  if (!targetEmail) return;
  try {
    showToast('Sending password recovery email...');
    await SupabaseBridge.resetPassword(targetEmail);
    alert(`A password reset link has been dispatched to ${targetEmail}.\n\nWhen you open the link from Gmail, it will open directly in Folerio!`);
  } catch (err) {
    alert('Password recovery: ' + (err.message || err));
  }
}

function setProfileTab(tabName) {
  state.profileActiveTab = tabName;
  renderProfileView();
}

function updateAuthUI() {
  const avatarWrap = document.getElementById('mobileAccountAvatarWrap');
  const label = document.getElementById('mobileAccountLabel');
  const sidebarAvatarText = document.getElementById('sidebarAvatarText');
  const sidebarProfileName = document.getElementById('sidebarProfileName');
  const sidebarProfileCaption = document.getElementById('sidebarProfileCaption');

  const topbarAvatar = document.getElementById('topbarAccountAvatar');

  if (state.currentUser) {
    const initials = state.currentUser.avatarInitials || getInitials(state.currentUser.name);
    if (avatarWrap) {
      if (state.currentUser.avatarUrl) {
        avatarWrap.innerHTML = `<img src="${escapeHTML(state.currentUser.avatarUrl)}" alt="${escapeHTML(state.currentUser.name)}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;border:1.5px solid var(--accent-cyan);">`;
      } else {
        avatarWrap.innerHTML = `<span style="font-weight:700; font-size:0.75rem; color:var(--accent-cyan);">${initials}</span>`;
      }
    }
    if (topbarAvatar) {
      if (state.currentUser.avatarUrl) {
        topbarAvatar.innerHTML = `<img src="${escapeHTML(state.currentUser.avatarUrl)}" alt="${escapeHTML(state.currentUser.name)}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">`;
      } else {
        topbarAvatar.innerHTML = `<span style="font-weight:700; font-size:0.75rem; color:var(--accent-cyan);">${initials}</span>`;
      }
    }
    if (label) label.textContent = state.currentUser.name.split(' ')[0] || 'Profile';
    if (sidebarAvatarText) {
      if (state.currentUser.avatarUrl) {
        sidebarAvatarText.innerHTML = `<img src="${escapeHTML(state.currentUser.avatarUrl)}" alt="${escapeHTML(state.currentUser.name)}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
      } else {
        sidebarAvatarText.textContent = initials;
      }
    }
    if (sidebarProfileName) sidebarProfileName.textContent = state.currentUser.name;
    if (sidebarProfileCaption) sidebarProfileCaption.textContent = state.currentUser.title || 'Verified Scholar';
  } else {
    if (avatarWrap) {
      avatarWrap.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      `;
    }
    if (topbarAvatar) {
      topbarAvatar.textContent = '🎓';
    }
    if (label) label.textContent = 'Account';
    if (sidebarAvatarText) sidebarAvatarText.textContent = '🎓';
    if (sidebarProfileName) sidebarProfileName.textContent = 'Guest Scholar';
    if (sidebarProfileCaption) sidebarProfileCaption.textContent = 'Tap to Sign In / Join';
  }
}

/* ==========================================================================
   Authentication Handlers (Email, Phone OTP, Demo Scholar)
   ========================================================================== */
function openAuthModal(defaultTab = 'signin') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.style.display = 'flex';
  const alertBox = document.getElementById('authAlertBox');
  if (alertBox) {
    alertBox.style.display = 'none';
    alertBox.textContent = '';
  }
  setAuthTab(defaultTab);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.style.display = 'none';
  const alertBox = document.getElementById('authAlertBox');
  if (alertBox) alertBox.style.display = 'none';
}

function setAuthTab(tab) {
  const signInBtn = document.getElementById('authTabSignIn');
  const signUpBtn = document.getElementById('authTabSignUp');
  const nameGroup = document.getElementById('authNameGroup');
  const heading = document.getElementById('authModalHeading');
  const subtitle = document.getElementById('authModalSubtitle');
  const submitBtn = document.getElementById('authEmailSubmitBtn');
  const tabsContainer = document.getElementById('authTabsContainer');
  const googleBtn = document.getElementById('btnGoogleAuth');
  const divider = document.getElementById('authDivider');
  const emailForm = document.getElementById('authEmailForm');
  const forgotWrap = document.getElementById('authForgotWrap');
  const forgotLink = document.getElementById('authForgotPwLink');
  const alertBox = document.getElementById('authAlertBox');

  if (alertBox) alertBox.style.display = 'none';

  if (tab === 'forgot') {
    if (tabsContainer) tabsContainer.style.display = 'none';
    if (googleBtn) googleBtn.style.display = 'none';
    if (divider) divider.style.display = 'none';
    if (emailForm) emailForm.style.display = 'none';
    if (forgotWrap) forgotWrap.style.display = 'flex';
    if (heading) heading.textContent = 'Reset Password';
    if (subtitle) subtitle.textContent = 'Enter your academic email to receive recovery instructions.';
    const emailVal = document.getElementById('authEmailInput')?.value || '';
    const forgotInput = document.getElementById('authForgotEmailInput');
    if (forgotInput && emailVal) forgotInput.value = emailVal;
    return;
  }

  // Normal Form Mode
  if (tabsContainer) tabsContainer.style.display = 'flex';
  if (googleBtn) googleBtn.style.display = 'flex';
  if (divider) divider.style.display = 'flex';
  if (emailForm) emailForm.style.display = 'flex';
  if (forgotWrap) forgotWrap.style.display = 'none';

  if (tab === 'signup') {
    signInBtn?.classList.remove('active');
    signUpBtn?.classList.add('active');
    if (nameGroup) nameGroup.style.display = 'block';
    if (heading) heading.textContent = 'Create Scholar Account';
    if (subtitle) subtitle.textContent = 'Join Folerio to publish findings, follow fields, and connect globally.';
    if (submitBtn) submitBtn.textContent = 'Join Folerio Network';
    if (forgotLink) forgotLink.style.display = 'none';
  } else {
    signInBtn?.classList.add('active');
    signUpBtn?.classList.remove('active');
    if (nameGroup) nameGroup.style.display = 'none';
    if (heading) heading.textContent = 'Sign In to Folerio';
    if (subtitle) subtitle.textContent = 'Access your frontier research library & academic network.';
    if (submitBtn) submitBtn.textContent = 'Sign In with Email';
    if (forgotLink) forgotLink.style.display = 'inline';
  }
}

function signInUser(userProfile) {
  state.currentUser = userProfile;
  localStorage.setItem('folerio_user_profile', JSON.stringify(userProfile));
  updateAuthUI();
  closeAuthModal();
  if (state.activeView === 'profile') renderProfileView();

  // Auto-restore any pending drafted critique if one was drafted before signing in
  const pendingDraft = sessionStorage.getItem('folerio_pending_comment_draft');
  const pendingPostId = sessionStorage.getItem('folerio_pending_comment_post_id');
  if (pendingDraft && pendingPostId) {
    sessionStorage.removeItem('folerio_pending_comment_draft');
    sessionStorage.removeItem('folerio_pending_comment_post_id');
    setTimeout(() => {
      openCommentsBottomSheet(pendingPostId);
      const sheetInput = document.getElementById('sheetCommentInput');
      if (sheetInput) {
        sheetInput.value = pendingDraft;
        sheetInput.focus();
      }
      showToast('Welcome back! Your critique is ready to publish.');
    }, 380);
  }

  if (pendingAuthAction) {
    const act = pendingAuthAction;
    pendingAuthAction = null;
    act();
  }
}

async function signOutScholar() {
  await SupabaseBridge.signOut();
  state.currentUser = null;
  localStorage.removeItem('folerio_user_profile');
  updateAuthUI();
  if (state.activeView === 'profile') renderProfileView();
  showToast('Signed out of Folerio');
}

function setupAuthModalListeners() {
  document.getElementById('closeAuthModalBtn')?.addEventListener('click', closeAuthModal);
  document.getElementById('authTabSignIn')?.addEventListener('click', () => setAuthTab('signin'));
  document.getElementById('authTabSignUp')?.addEventListener('click', () => setAuthTab('signup'));
  document.getElementById('authForgotPwLink')?.addEventListener('click', () => setAuthTab('forgot'));
  document.getElementById('authBackToLoginBtn')?.addEventListener('click', () => setAuthTab('signin'));

  // Password Visibility Toggle
  const togglePwBtn = document.getElementById('btnTogglePassword');
  const pwInput = document.getElementById('authPasswordInput');
  togglePwBtn?.addEventListener('click', () => {
    if (!pwInput) return;
    const isPw = pwInput.type === 'password';
    pwInput.type = isPw ? 'text' : 'password';
    togglePwBtn.innerHTML = isPw
      ? `<svg class="pw-eye-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
           <line x1="1" y1="1" x2="23" y2="23"></line>
         </svg>`
      : `<svg class="pw-eye-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
           <circle cx="12" cy="12" r="3"></circle>
         </svg>`;
  });

  // 1. Official Google OAuth Authentication
  document.getElementById('btnGoogleAuth')?.addEventListener('click', () => {
    const alertBox = document.getElementById('authAlertBox');
    if (alertBox) {
      alertBox.className = 'auth-alert-box';
      alertBox.style.display = 'block';
      alertBox.innerHTML = '⚡ Connecting to Google Authentication...';
    }
    SupabaseBridge.signInWithGoogle();
  });

  // 2. Real Supabase Email + Password Sign In & Sign Up
  const emailForm = document.getElementById('authEmailForm');
  emailForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const alertBox = document.getElementById('authAlertBox');
    const isSignUp = document.getElementById('authTabSignUp')?.classList.contains('active');
    const email = document.getElementById('authEmailInput')?.value?.trim();
    const password = document.getElementById('authPasswordInput')?.value;
    const fullName = document.getElementById('authFullNameInput')?.value?.trim();
    const submitBtn = document.getElementById('authEmailSubmitBtn');

    if (!email || !password) {
      if (alertBox) {
        alertBox.className = 'auth-alert-box error';
        alertBox.style.display = 'block';
        alertBox.textContent = 'Please provide both your academic email and password.';
      }
      return;
    }

    if (alertBox) alertBox.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = isSignUp ? 'Creating Scholar Account...' : 'Signing In...';
    }

    try {
      if (isSignUp) {
        const res = await SupabaseBridge.signUpWithEmail(email, password, fullName);
        if (res.needsConfirmation) {
          if (alertBox) {
            alertBox.className = 'auth-alert-box success';
            alertBox.style.display = 'block';
            alertBox.innerHTML = `✉️ Confirmation email sent to <strong>${escapeHTML(email)}</strong>. Please verify your email or sign in.`;
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join Folerio Network';
          }
          return;
        }
        signInUser(res);
        showToast(`Welcome to Folerio, ${res.name}! 🎓`);
      } else {
        const user = await SupabaseBridge.signInWithEmail(email, password);
        signInUser(user);
        showToast(`Welcome back, ${user.name}! ⚡`);
      }
    } catch (err) {
      if (alertBox) {
        alertBox.className = 'auth-alert-box error';
        alertBox.style.display = 'block';
        alertBox.textContent = err.message || 'Authentication failed. Please verify credentials.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = isSignUp ? 'Join Folerio Network' : 'Sign In with Email';
      }
    }
  });

  // 3. Password Reset Recovery Flow
  document.getElementById('authSendResetBtn')?.addEventListener('click', async () => {
    const alertBox = document.getElementById('authAlertBox');
    const email = document.getElementById('authForgotEmailInput')?.value?.trim();
    const btn = document.getElementById('authSendResetBtn');

    if (!email) {
      if (alertBox) {
        alertBox.className = 'auth-alert-box error';
        alertBox.style.display = 'block';
        alertBox.textContent = 'Please enter your registered academic email address.';
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending Recovery Link...';
    }

    try {
      await SupabaseBridge.resetPassword(email);
      if (alertBox) {
        alertBox.className = 'auth-alert-box success';
        alertBox.style.display = 'block';
        alertBox.innerHTML = `✉️ Password recovery link dispatched to <strong>${escapeHTML(email)}</strong>. Please check your inbox.`;
      }
    } catch (err) {
      if (alertBox) {
        alertBox.className = 'auth-alert-box error';
        alertBox.style.display = 'block';
        alertBox.textContent = err.message || 'Could not send recovery link. Please verify the email address.';
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Send Recovery Link';
      }
    }
  });


  // Edit Profile Modal
  document.getElementById('closeEditProfileBtn')?.addEventListener('click', closeEditProfileModal);
  document.getElementById('cancelEditProfileBtn')?.addEventListener('click', closeEditProfileModal);
  document.getElementById('editProfileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.currentUser) return;
    state.currentUser.name = document.getElementById('editNameInput').value;
    state.currentUser.institution = document.getElementById('editInstitutionInput').value;
    state.currentUser.department = document.getElementById('editDepartmentInput').value;
    state.currentUser.field = document.getElementById('editFieldInput').value;
    state.currentUser.orcid = document.getElementById('editOrcidInput').value;
    state.currentUser.bio = document.getElementById('editBioInput').value;
    state.currentUser.avatarInitials = getInitials(state.currentUser.name);

    localStorage.setItem('folerio_user_profile', JSON.stringify(state.currentUser));
    updateAuthUI();
    closeEditProfileModal();
    renderProfileView();
  });
}

function openEditProfileModal() {
  if (!state.currentUser) return;
  const modal = document.getElementById('editProfileModal');
  if (!modal) return;
  document.getElementById('editNameInput').value = state.currentUser.name || '';
  document.getElementById('editInstitutionInput').value = state.currentUser.institution || '';
  document.getElementById('editDepartmentInput').value = state.currentUser.department || '';
  document.getElementById('editFieldInput').value = state.currentUser.field || '';
  document.getElementById('editOrcidInput').value = state.currentUser.orcid || '';
  document.getElementById('editBioInput').value = state.currentUser.bio || '';
  modal.style.display = 'flex';
}

function closeEditProfileModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) modal.style.display = 'none';
}

/* ==========================================================================
   Offline Storage & Cache Settings Handlers
   ========================================================================== */
async function openCacheSettingsModal() {
  const modal = document.getElementById('cacheSettingsModal');
  if (!modal) return;
  modal.style.display = 'flex';

  if (typeof FolioCacheDB !== 'undefined') {
    const stats = await FolioCacheDB.getStorageEstimate();
    const countEl = document.getElementById('cacheTotalCount');
    const sizeEl = document.getElementById('cacheTotalSize');
    if (countEl) countEl.textContent = stats.count.toLocaleString();
    if (sizeEl) sizeEl.textContent = `${stats.sizeMB} MB`;

    const settings = await FolioCacheDB.getSettings();
    document.querySelectorAll('.capacity-chip').forEach(chip => {
      chip.classList.toggle('active', parseInt(chip.dataset.capacity) === settings.capacity);
    });
    const retentionSelect = document.getElementById('retentionPolicySelect');
    if (retentionSelect) retentionSelect.value = String(settings.retentionDays);
  }
}

function closeCacheSettingsModal() {
  const modal = document.getElementById('cacheSettingsModal');
  if (modal) modal.style.display = 'none';
}

function setupCacheSettingsListeners() {
  document.getElementById('closeCacheSettingsBtn')?.addEventListener('click', closeCacheSettingsModal);

  // Capacity selector chips
  document.querySelectorAll('.capacity-chip').forEach(chip => {
    chip.addEventListener('click', async () => {
      const cap = parseInt(chip.dataset.capacity);
      document.querySelectorAll('.capacity-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      if (typeof FolioCacheDB !== 'undefined') {
        const cur = await FolioCacheDB.getSettings();
        cur.capacity = cap;
        await FolioCacheDB.saveSettings(cur);
        await FolioCacheDB.enforceCapacity(cap);
        const stats = await FolioCacheDB.getStorageEstimate();
        document.getElementById('cacheTotalCount').textContent = stats.count.toLocaleString();
        document.getElementById('cacheTotalSize').textContent = `${stats.sizeMB} MB`;
      }
    });
  });

  // Retention selector
  document.getElementById('retentionPolicySelect')?.addEventListener('change', async (e) => {
    const days = parseInt(e.target.value);
    if (typeof FolioCacheDB !== 'undefined') {
      const cur = await FolioCacheDB.getSettings();
      cur.retentionDays = days;
      await FolioCacheDB.saveSettings(cur);
      await FolioCacheDB.enforceRetentionPolicy();
    }
  });

  // Clear cache button
  document.getElementById('clearCacheBtn')?.addEventListener('click', async () => {
    if (confirm('Clear all offline cached folios from IndexedDB?')) {
      if (typeof FolioCacheDB !== 'undefined') {
        await FolioCacheDB.clearAllCache();
        document.getElementById('cacheTotalCount').textContent = '0';
        document.getElementById('cacheTotalSize').textContent = '0.00 MB';
        alert('Offline cache cleared.');
      }
    }
  });

  // Sync fresh folios button
  document.getElementById('syncFreshCacheBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('syncFreshCacheBtn');
    if (btn) btn.textContent = '⏳ Syncing...';
    await loadPosts();
    if (btn) btn.textContent = '✓ Synced!';
    setTimeout(() => {
      if (btn) btn.textContent = '🔄 Sync Fresh Folios';
      openCacheSettingsModal();
    }, 1200);
  });
}

/* ==========================================================================
   Offline Status & Banner Listeners
   ========================================================================== */
function updateOfflineStatusBanner() {
  const banner = document.getElementById('offlineStatusBanner');
  const countBadge = document.getElementById('offlineCountBadge');
  if (!banner) return;

  const isOffline = !navigator.onLine;
  banner.style.display = isOffline ? 'block' : 'none';
  if (countBadge && isOffline) {
    countBadge.textContent = `${state.posts.length} Folios Cached`;
  }
}

function initOfflineListeners() {
  window.addEventListener('online', () => {
    updateOfflineStatusBanner();
    if (typeof FolioCacheDB !== 'undefined') {
      FolioCacheDB.cacheFolios(state.posts, 'frontier').catch(console.warn);
    }
  });
  window.addEventListener('offline', updateOfflineStatusBanner);
  updateOfflineStatusBanner();
}

/* ==========================================================================
   Edge-Swipe Gestures (Native iPhone/Android Physics)
   ========================================================================== */
function initEdgeSwipeGestures() {
  const sidebarNav = document.getElementById('sidebarNav');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  let startX = 0;
  let startY = 0;
  let isTracking = false;

  window.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    const isEdgeStart = startX < 45 && !sidebarNav?.classList.contains('mobile-open');
    const isDrawerOpen = sidebarNav?.classList.contains('mobile-open');

    if (isEdgeStart || isDrawerOpen) {
      isTracking = true;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isTracking || !e.touches || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    // If mainly vertical scroll, cancel tracking
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 20) {
      isTracking = false;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isTracking) return;
    isTracking = false;
    const touch = e.changedTouches ? e.changedTouches[0] : null;
    if (!touch) return;

    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX > 45 && !sidebarNav?.classList.contains('mobile-open') && startX < 60) {
        // Swiped right from left edge: open drawer
        sidebarNav?.classList.add('mobile-open');
        sidebarOverlay?.classList.add('active');
        document.body.classList.add('menu-locked');
      } else if (deltaX < -45 && sidebarNav?.classList.contains('mobile-open')) {
        // Swiped left while open: close drawer
        sidebarNav?.classList.remove('mobile-open');
        sidebarOverlay?.classList.remove('active');
        document.body.classList.remove('menu-locked');
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   Gesture Features:
   - Hold Heart: View Who Endorsed (Scholarly Endorsements Modal)
   - Hold Save: Clean Slide Screenshot (450ms) or Full Folio Capture (1500ms)
   ========================================================================== */

function initLikeButtonPressGestures() {
  document.querySelectorAll('.action-btn.like-btn').forEach(btn => {
    if (btn.hasAttribute('data-like-hold-init')) return;
    btn.setAttribute('data-like-hold-init', 'true');

    const postId = btn.getAttribute('data-post-id');
    if (!postId) return;

    let holdTimer = null;
    let didHold = false;

    const onStart = () => {
      didHold = false;
      holdTimer = setTimeout(() => {
        didHold = true;
        openLikedByModal(postId);
        try {
          if (navigator.vibrate) navigator.vibrate(25);
        } catch (e) {}
      }, 500);
    };

    const onEnd = (e) => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      if (didHold) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    const onCancel = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
    };

    btn.addEventListener('touchstart', onStart, { passive: true });
    btn.addEventListener('touchend', onEnd);
    btn.addEventListener('touchcancel', onCancel);

    btn.addEventListener('mousedown', onStart);
    btn.addEventListener('mouseup', onEnd);
    btn.addEventListener('mouseleave', onCancel);

    // If hold was triggered, block click event
    btn.addEventListener('click', (e) => {
      if (didHold) {
        e.preventDefault();
        e.stopPropagation();
        didHold = false;
        return false;
      }
    });
  });
}

function initSaveButtonPressGestures() {
  document.querySelectorAll('.action-btn.save-btn').forEach(btn => {
    if (btn.hasAttribute('data-save-hold-init')) return;
    btn.setAttribute('data-save-hold-init', 'true');

    const postId = btn.getAttribute('data-post-id');
    if (!postId) return;

    let pressTimer = null;
    let fullFolioTimer = null;
    let isLongHold = false;

    // Suppress Android default long-press context menu
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    const startPress = () => {
      isLongHold = false;
      btn.classList.add('capturing-glow');

      // 450ms hold -> Immediately capture clean screenshot of current slide!
      pressTimer = setTimeout(() => {
        isLongHold = true;
        btn.classList.remove('capturing-glow');
        captureSingleSlideClean(postId);

        // If user keeps holding for 1500ms total -> Auto-capture full folio!
        fullFolioTimer = setTimeout(() => {
          captureFullFolioClean(postId);
        }, 1050);
      }, 450);
    };

    const endPress = (e) => {
      btn.classList.remove('capturing-glow');
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
      if (fullFolioTimer) {
        clearTimeout(fullFolioTimer);
        fullFolioTimer = null;
      }

      if (isLongHold) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    const cancelPress = () => {
      btn.classList.remove('capturing-glow');
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
      if (fullFolioTimer) {
        clearTimeout(fullFolioTimer);
        fullFolioTimer = null;
      }
    };

    // Mobile touch events
    btn.addEventListener('touchstart', startPress, { passive: true });
    btn.addEventListener('touchend', endPress);
    btn.addEventListener('touchcancel', cancelPress);

    // Desktop pointer / mouse events
    btn.addEventListener('mousedown', startPress);
    btn.addEventListener('mouseup', endPress);
    btn.addEventListener('mouseleave', cancelPress);

    // Block standard click if a long press screenshot was executed
    btn.addEventListener('click', (e) => {
      if (isLongHold) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => { isLongHold = false; }, 350);
        return false;
      }
    });
  });
}

const PEER_SCHOLARS_POOL = [
  { name: "Dr. Sarah Chen", title: "Principal Investigator · Stanford AI Lab", initials: "SC", color: "linear-gradient(135deg, #38bdf8, #6366f1)" },
  { name: "Prof. Julian Thorne", title: "Chair of Applied Physics · Cambridge University", initials: "JT", color: "linear-gradient(135deg, #10b981, #059669)" },
  { name: "Dr. Elena Rostova", title: "Senior Fellow · Max Planck Institute for Quantum Optics", initials: "ER", color: "linear-gradient(135deg, #f43f5e, #be123c)" },
  { name: "Dr. Amara Okafor", title: "Genomics & Precision Medicine · Oxford University", initials: "AO", color: "linear-gradient(135deg, #8b5cf6, #6d28d9)" },
  { name: "Prof. Kenji Sato", title: "Laboratory of Quantum Devices · Tokyo Institute of Tech", initials: "KS", color: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { name: "Dr. Maya Lindqvist", title: "Department of Neuroscience · Karolinska Institutet", initials: "ML", color: "linear-gradient(135deg, #06b6d4, #0891b2)" },
  { name: "Dr. Liam MacIntyre", title: "Climate & Planetary Sciences · ETH Zürich", initials: "LM", color: "linear-gradient(135deg, #ec4899, #be185d)" }
];

function openLikedByModal(postId) {
  const modal = document.getElementById('likedByModal');
  const backdrop = document.getElementById('likedByModalBackdrop');
  const list = document.getElementById('likedByList');
  const badge = document.getElementById('likedByCountBadge');

  if (!modal || !backdrop || !list) return;

  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
  if (!post) return;

  const likesCount = post.likes || (state.likedPostIds.has(postId) ? 1 : 0);
  if (badge) {
    badge.textContent = `${likesCount} Scholar${likesCount === 1 ? '' : 's'}`;
  }

  // Generate peer scholars list
  let html = '';

  // If current user endorsed, display them first
  if (state.likedPostIds.has(postId)) {
    const userName = state.currentUser?.user_metadata?.full_name || state.currentUser?.email?.split('@')[0] || 'You (Guest Scholar)';
    html += `
      <div class="scholar-like-row">
        <div class="scholar-like-info">
          <div class="scholar-like-avatar" style="background: linear-gradient(135deg, #38bdf8, #818cf8);">🎓</div>
          <div class="scholar-like-meta">
            <div class="scholar-like-name">${escapeHTML(userName)} <span class="verified-badge">✦</span></div>
            <div class="scholar-like-inst">Folerio Scholar · Endorsed this publication</div>
          </div>
        </div>
      </div>
    `;
  }

  // Deterministic sample of peer scholars for consistency
  const seed = postId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const sampleCount = Math.min(PEER_SCHOLARS_POOL.length, Math.max(3, Math.min(5, likesCount)));

  for (let i = 0; i < sampleCount; i++) {
    const scholar = PEER_SCHOLARS_POOL[(seed + i) % PEER_SCHOLARS_POOL.length];
    const isColleague = state.colleagues.has(scholar.name);
    html += `
      <div class="scholar-like-row">
        <div class="scholar-like-info">
          <div class="scholar-like-avatar" style="background: ${scholar.color};">${scholar.initials}</div>
          <div class="scholar-like-meta">
            <div class="scholar-like-name">${escapeHTML(scholar.name)} <span class="verified-badge">✦</span></div>
            <div class="scholar-like-inst">${escapeHTML(scholar.title)}</div>
          </div>
        </div>
        <button class="scholar-colleague-toggle-btn ${isColleague ? 'active' : ''}" onclick="toggleColleague(event, '${escapeHTML(scholar.name)}')">
          ${isColleague ? 'Colleague ✓' : 'Colleague +'}
        </button>
      </div>
    `;
  }

  const remaining = Math.max(0, likesCount - (state.likedPostIds.has(postId) ? 1 : 0) - sampleCount);
  if (remaining > 0) {
    html += `<div class="liked-by-footer-note">and ${remaining} other peer researchers endorsed this publication</div>`;
  } else {
    html += `<div class="liked-by-footer-note">✦ Verified academic endorsements across research networks</div>`;
  }

  list.innerHTML = html;

  backdrop.classList.add('open');
  modal.classList.add('open');
}

function closeLikedByModal() {
  const modal = document.getElementById('likedByModal');
  const backdrop = document.getElementById('likedByModalBackdrop');
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

/* ==========================================================================
   Book Chapter Sequence Navigation Panel (#bookSequenceDrawer)
   Sequential topic reading in exact book order (without bulky numbering)
   ========================================================================== */
function openBookSequenceDrawer(postId) {
  const allFolios = (state.posts || []).concat(state.bookPosts || []);
  const currentPost = allFolios.find(p => p.id === postId);
  if (!currentPost || !currentPost.bookMeta) return;

  const meta = currentPost.bookMeta;
  const collectionId = meta.collectionId;

  // Filter all siblings in this chapter collection
  let siblings = allFolios.filter(p => p.bookMeta && p.bookMeta.collectionId === collectionId);
  const seen = new Set();
  siblings = siblings.filter(p => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  // Sort strictly by sequenceIndex
  siblings.sort((a, b) => (a.bookMeta.sequenceIndex || 0) - (b.bookMeta.sequenceIndex || 0));

  const drawer = document.getElementById('bookSequenceDrawer');
  const backdrop = document.getElementById('bookSequenceBackdrop');
  const bookTitleEl = document.getElementById('bookSequenceBookTitle');
  const editionEl = document.getElementById('bookSequenceEdition');
  const chapterEl = document.getElementById('bookSequenceChapter');
  const mainTopicEl = document.getElementById('bookSequenceMainTopic');
  const countEl = document.getElementById('bookSequenceCount');
  const listEl = document.getElementById('bookSequenceList');

  if (bookTitleEl) bookTitleEl.textContent = meta.bookTitle || 'Book Chapter Sequence';
  if (editionEl) editionEl.textContent = meta.edition || 'Textbook Edition';
  if (chapterEl) chapterEl.textContent = `${meta.chapter || ''} ${meta.chapterTitle ? '· ' + meta.chapterTitle : ''}`;
  if (mainTopicEl) mainTopicEl.textContent = meta.collectionTitle || currentPost.title;
  if (countEl) countEl.textContent = `${siblings.length} Topics in Sequence`;

  if (listEl) {
    listEl.innerHTML = siblings.map(sib => {
      const isCurrent = sib.id === currentPost.id;
      return `
        <div class="book-sequence-item ${isCurrent ? 'active-reading' : ''}" onclick="selectBookSequenceTopic('${sib.id}')" role="button" tabindex="0">
          <div class="sequence-bullet-col">
            <span class="sequence-node ${isCurrent ? 'current-node' : ''}"></span>
          </div>
          <div class="sequence-item-content">
            <div class="sequence-topic-title">${escapeHTML(sib.title)}</div>
            <div class="sequence-topic-meta">
              ${isCurrent ? '<span class="sequence-current-badge">● Currently Reading</span>' : '<span class="sequence-read-action">Read Topic &rarr;</span>'}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (backdrop) backdrop.classList.add('visible');
  if (drawer) drawer.classList.add('visible');
}

function closeBookSequenceDrawer() {
  const drawer = document.getElementById('bookSequenceDrawer');
  const backdrop = document.getElementById('bookSequenceBackdrop');
  if (drawer) drawer.classList.remove('visible');
  if (backdrop) backdrop.classList.remove('visible');
}

function selectBookSequenceTopic(postId) {
  closeBookSequenceDrawer();
  const allFolios = (state.posts || []).concat(state.bookPosts || []);
  const targetPost = allFolios.find(p => p.id === postId);
  if (!targetPost) return;

  // If in primer mode, switch to books or frontier
  if (state.feedMode === 'primer') {
    setFeedMode('books');
  }

  // Clear filters that would hide the post
  if (state.currentTopic !== 'all' && state.currentTopic !== targetPost.field) {
    syncTopicSelection('all');
  }
  if (state.searchQuery) {
    state.searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
  }

  // Ensure post is present in state.posts
  if (!state.posts.some(p => p.id === postId)) {
    state.posts.unshift(targetPost);
  }

  renderFeed();

  // Scroll smoothly to target post and pulse
  setTimeout(() => {
    const postEl = document.getElementById(`post-${postId}`);
    if (postEl) {
      postEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      postEl.classList.add('folio-highlight-pulse');
      setTimeout(() => postEl.classList.remove('folio-highlight-pulse'), 2500);
    }
  }, 120);
}

/* ==========================================================================
   Focus Reading Window Mode Handlers
   - Single-tap card to immerse in full-screen reading
   - Scrolling or swiping down smoothly exits Focus Mode
   ========================================================================== */
function enterFocusReadingMode(card) {
  if (!card) return;
  document.querySelectorAll('.post-card').forEach(c => c.classList.remove('focused-folio-card'));
  card.classList.add('focused-folio-card');
  document.body.classList.add('focus-reading-mode');
  try {
    if (navigator.vibrate) navigator.vibrate(15);
  } catch (e) {}
  showToast('✦ Focus Mode: Distraction-free reading. Swipe down to return.');
}

function exitFocusReadingMode() {
  if (!document.body.classList.contains('focus-reading-mode')) return;
  document.body.classList.remove('focus-reading-mode');
  document.querySelectorAll('.post-card.focused-folio-card').forEach(c => {
    c.classList.remove('focused-folio-card');
  });
}

// Swipe down & scroll down gesture detection to exit Focus Mode
let focusTouchStartY = 0;
let focusTouchStartX = 0;

window.addEventListener('touchstart', (e) => {
  if (!document.body.classList.contains('focus-reading-mode')) return;
  if (e.touches && e.touches[0]) {
    focusTouchStartY = e.touches[0].clientY;
    focusTouchStartX = e.touches[0].clientX;
  }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (!document.body.classList.contains('focus-reading-mode')) return;
  if (e.touches && e.touches[0]) {
    const deltaY = e.touches[0].clientY - focusTouchStartY;
    const deltaX = Math.abs(e.touches[0].clientX - focusTouchStartX);
    // If swiping downwards (> 45px) and mostly vertical -> smoothly exit Focus Mode!
    if (deltaY > 45 && deltaY > deltaX * 1.2) {
      exitFocusReadingMode();
    }
  }
}, { passive: true });

window.addEventListener('wheel', (e) => {
  if (!document.body.classList.contains('focus-reading-mode')) return;
  // Scrolling down on mousewheel / trackpad -> exit Focus Mode
  if (e.deltaY > 25) {
    exitFocusReadingMode();
  }
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('focus-reading-mode')) {
    exitFocusReadingMode();
  }
});

/**
 * Capture current slide cleanly with NO header, NO counter badge, and NO overlays.
 * Uses html2canvas with bulletproof fallback to CardGenerator 2D Canvas so it never fails.
 */
async function captureSingleSlideClean(postId, requestedSlideIdx = null) {
  const card = document.getElementById(`post-${postId}`);
  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);

  let activeIdx = requestedSlideIdx !== null ? requestedSlideIdx : 0;
  let activeSlide = null;
  let totalSlides = post?.slides?.length || 4;

  if (card) {
    const track = card.querySelector('.carousel-track');
    if (track) {
      const slideWidth = track.clientWidth || 1;
      if (requestedSlideIdx === null) {
        activeIdx = Math.round(track.scrollLeft / slideWidth);
      }
      const slides = track.querySelectorAll('.post-slide');
      totalSlides = slides.length || totalSlides;
      activeSlide = slides[activeIdx] || slides[0];
    }
  }

  triggerCameraFlash();
  if (card) card.classList.add('clean-screenshot-mode');

  let imgData = null;
  const filename = `folerio-${postId}-slide-${activeIdx + 1}.png`;

  // 1. Try html2canvas DOM rasterization
  if (activeSlide && typeof html2canvas === 'function') {
    try {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const canvas = await html2canvas(activeSlide, {
        scale: Math.max(window.devicePixelRatio || 1, 2),
        useCORS: true,
        allowTaint: true,
        backgroundColor: isDark ? '#0b0f19' : '#ffffff',
        logging: false
      });
      imgData = canvas.toDataURL('image/png');
    } catch (err) {
      console.warn('html2canvas rasterization error, using 2D canvas fallback:', err);
    }
  }

  // 2. Pure HTML5 2D Canvas fallback (always guaranteed and ultra-crisp 1080x1350)
  if (!imgData && post && typeof CardGenerator !== 'undefined') {
    try {
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
      imgData = CardGenerator.exportToCanvas(data, activeIdx, post.theme || 'obsidian');
    } catch (err2) {
      console.warn('CardGenerator fallback error:', err2);
    }
  }

  if (card) card.classList.remove('clean-screenshot-mode');

  if (imgData) {
    saveScreenshot(imgData, filename, { postId, slideIdx: activeIdx + 1, totalSlides });
    showToast(`📸 Slide ${activeIdx + 1} captured cleanly!`);
  } else {
    showToast('📸 Screenshot captured');
  }
}

/**
 * Auto-capture ALL slides in the folio with NO header or overlays, scrolling automatically
 */
async function captureFullFolioClean(postId) {
  const card = document.getElementById(`post-${postId}`);
  if (!card) return;

  const track = card.querySelector('.carousel-track');
  if (!track) return;

  const slides = track.querySelectorAll('.post-slide');
  const totalSlides = slides.length;
  const originalScrollLeft = track.scrollLeft;
  const slideWidth = track.clientWidth || 1;

  triggerCameraFlash();
  showToast(`📸 Auto-capturing all ${totalSlides} slides in Folio...`);
  card.classList.add('clean-screenshot-mode');

  try {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    for (let i = 0; i < totalSlides; i++) {
      track.scrollTo({ left: i * slideWidth, behavior: 'auto' });
      await new Promise(r => setTimeout(r, 150));

      if (typeof html2canvas === 'function') {
        const canvas = await html2canvas(slides[i], {
          scale: Math.max(window.devicePixelRatio || 1, 2),
          useCORS: true,
          allowTaint: true,
          backgroundColor: isDark ? '#0b0f19' : '#ffffff',
          logging: false
        });
        const imgData = canvas.toDataURL('image/png');
        const filename = `folerio-${postId}-slide-${i + 1}-of-${totalSlides}.png`;
        saveScreenshot(imgData, filename, { postId, slideIdx: i + 1, totalSlides, silentModal: i < totalSlides - 1 });
      }
    }
    showToast(`📸 Complete Folio (${totalSlides} slides) captured cleanly!`);
    try {
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    } catch (e) {}
  } catch (err) {
    console.warn('Full folio capture:', err);
  } finally {
    track.scrollTo({ left: originalScrollLeft, behavior: 'auto' });
    card.classList.remove('clean-screenshot-mode');
  }
}

function triggerCameraFlash() {
  const overlay = document.getElementById('cameraFlashOverlay');
  if (overlay) {
    overlay.classList.add('flashing');
    setTimeout(() => overlay.classList.remove('flashing'), 280);
  }
  try {
    if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
  } catch (e) {}
}

let currentScreenshotState = { dataUrl: null, filename: null };

/**
 * Universal screenshot saving:
 * 1. Native Android MediaStore (saved directly to Pictures/Folerio via Java bridge)
 * 2. Browser standard <a> download trigger
 * 3. Shows the in-app Screenshot Preview Modal for immediate visual confirmation & sharing
 */
function saveScreenshot(dataUrl, filename, meta = {}) {
  currentScreenshotState = { dataUrl, filename, meta };
  let savedNatively = false;

  // 1. Android Native Java bridge (Direct MediaStore save to Pictures/Folerio)
  if (typeof window !== 'undefined' && window.FolerioNative && typeof window.FolerioNative.saveImageToGallery === 'function') {
    try {
      window.FolerioNative.saveImageToGallery(dataUrl, filename);
      savedNatively = true;
    } catch (e) {
      console.warn('FolerioNative save error:', e);
    }
  }

  // 2. Standard Browser <a> download link
  try {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {}

  // 3. Open Screenshot Preview Modal for confirmation
  if (!meta.silentModal) {
    openScreenshotModal(dataUrl, filename, savedNatively, meta);
  }
}

function openScreenshotModal(dataUrl, filename, savedNatively, meta = {}) {
  const modal = document.getElementById('screenshotModal');
  const backdrop = document.getElementById('screenshotModalBackdrop');
  const img = document.getElementById('screenshotPreviewImg');
  const status = document.getElementById('screenshotSaveStatus');
  
  if (!modal || !backdrop || !img) return;

  img.src = dataUrl;
  if (status) {
    if (savedNatively) {
      status.innerHTML = '📸 <strong>Saved directly to your Gallery / Photos album</strong> in <code>Pictures/Folerio</code>.';
    } else {
      status.innerHTML = '📸 Slide captured cleanly! Click <strong>Save to Photos</strong> or tap & hold the image to save.';
    }
  }

  backdrop.classList.add('open');
  modal.classList.add('open');
}

function closeScreenshotModal() {
  const modal = document.getElementById('screenshotModal');
  const backdrop = document.getElementById('screenshotModalBackdrop');
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function triggerManualDownloadScreenshot() {
  if (!currentScreenshotState.dataUrl) return;
  if (typeof window !== 'undefined' && window.FolerioNative && typeof window.FolerioNative.saveImageToGallery === 'function') {
    window.FolerioNative.saveImageToGallery(currentScreenshotState.dataUrl, currentScreenshotState.filename || 'folerio-slide.png');
  }
  const link = document.createElement('a');
  link.download = currentScreenshotState.filename || 'folerio-slide.png';
  link.href = currentScreenshotState.dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('💾 Saving screenshot to Photos...');
}

async function triggerShareScreenshot() {
  if (!currentScreenshotState.dataUrl) return;
  try {
    const res = await fetch(currentScreenshotState.dataUrl);
    const blob = await res.blob();
    const file = new File([blob], currentScreenshotState.filename || 'folerio-slide.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'Folerio Research Slide',
        text: 'Scholarly Folio slide from Folerio',
        files: [file]
      });
      return;
    }
  } catch (e) {
    console.warn('Share error:', e);
  }
  showToast('Sharing not supported on this browser; image is saved.');
}

/* ==========================================================================
   Instagram/TikTok Style Comments Bottom Sheet
   ========================================================================== */
let currentSheetPostId = null;

function openCommentsBottomSheet(postId) {
  currentSheetPostId = postId;
  const post = state.posts.find(p => p.id === postId) || state.primerPosts.find(p => p.id === postId);
  if (!post) return;

  const sheet = document.getElementById('commentsBottomSheet');
  const backdrop = document.getElementById('commentsSheetBackdrop');
  const countBadge = document.getElementById('sheetCommentCount');
  const commentsList = document.getElementById('sheetCommentsList');
  const avatarEl = document.getElementById('sheetUserAvatar');

  if (avatarEl) {
    avatarEl.textContent = state.currentUser ? getInitials(state.currentUser.name) : '👻';
  }

  const totalDiscussions = countTotalDiscussions(post);
  if (countBadge) {
    countBadge.textContent = `${totalDiscussions} critique${totalDiscussions === 1 ? '' : 's'}`;
  }

  const commentsHTML = (post.comments || []).map(c => renderCommentThread(c, post.id)).join('');
  if (commentsList) {
    commentsList.innerHTML = commentsHTML.length > 0 
      ? commentsHTML 
      : '<div style="text-align:center;color:var(--text-muted);font-size:0.88rem;padding:2.5rem 0;">No peer critiques yet. Initiate the academic discussion.</div>';
  }

  backdrop?.classList.add('open');
  sheet?.classList.add('open');
  document.body.classList.add('menu-locked');

  try {
    if (navigator.vibrate) navigator.vibrate(15);
  } catch (e) {}
}

function closeCommentsBottomSheet() {
  currentSheetPostId = null;
  const sheet = document.getElementById('commentsBottomSheet');
  const backdrop = document.getElementById('commentsSheetBackdrop');
  sheet?.classList.remove('open');
  backdrop?.classList.remove('open');
  document.body.classList.remove('menu-locked');
}

function submitSheetComment() {
  if (!currentSheetPostId) return;
  const input = document.getElementById('sheetCommentInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const post = state.posts.find(p => p.id === currentSheetPostId) || state.primerPosts.find(p => p.id === currentSheetPostId);
  if (!post) return;

  // If scholar is not logged in: auto-copy draft to device clipboard & prompt login
  if (!state.currentUser) {
    copyTextToClipboard(text);
    sessionStorage.setItem('folerio_pending_comment_draft', text);
    sessionStorage.setItem('folerio_pending_comment_post_id', currentSheetPostId);
    closeCommentsBottomSheet();
    openAuthModal('signin');
    showToast('📋 Critique copied to clipboard! Please sign in to publish.', 'info');
    return;
  }

  if (!post.comments) post.comments = [];
  const authorName = state.currentUser ? state.currentUser.name : 'Peer Scholar';
  const newComment = {
    id: 'c-' + Date.now(),
    author: authorName,
    time: 'Just now',
    text: text,
    replies: []
  };

  post.comments.unshift(newComment);
  input.value = '';

  // Sync to Supabase & LocalStorage with network failure safeguard
  try {
    SupabaseBridge.recordInteraction(currentSheetPostId, 'comment', newComment);
  } catch (err) {
    copyTextToClipboard(text);
    showToast('📡 Network issue: Critique copied to clipboard & saved locally.', 'info');
  }

  // Update sheet view
  openCommentsBottomSheet(currentSheetPostId);

  // Update post card badge
  const discussCountEl = document.querySelector(`#discuss-btn-${currentSheetPostId} .discuss-count`);
  if (discussCountEl) {
    const total = countTotalDiscussions(post);
    discussCountEl.textContent = total > 0 ? total : '';
  }

  showToast('Critique added to discussion thread');
  try {
    if (navigator.vibrate) navigator.vibrate(20);
  } catch (e) {}
}

/* ==========================================================================
   Instagram-Style Pull-To-Refresh & Active Tab Scroll-To-Top
   ========================================================================== */
function initPullToRefreshAndTabRefresh() {
  // 1. Instagram-Style Pull-To-Refresh on Mobile
  const pullIndicator = document.getElementById('pullRefreshIndicator');
  const spinner = document.getElementById('refreshSpinner');
  let pullStartY = 0;
  let isPulling = false;
  let hasTriggeredPullHaptic = false;

  window.addEventListener('touchstart', (e) => {
    if (window.scrollY <= 2 && e.touches.length === 1) {
      pullStartY = e.touches[0].clientY;
      isPulling = true;
      hasTriggeredPullHaptic = false;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isPulling || window.scrollY > 2) {
      isPulling = false;
      if (pullIndicator) pullIndicator.classList.remove('pulling');
      return;
    }

    const currentY = e.touches[0].clientY;
    const diff = currentY - pullStartY;

    if (diff > 10) {
      const pullDist = Math.min(diff * 0.42, 85);
      if (pullIndicator) {
        pullIndicator.classList.add('pulling');
        pullIndicator.style.top = `${pullDist - 30}px`;
      }
      if (spinner) {
        spinner.style.transform = `rotate(${diff * 2.2}deg)`;
      }

      if (diff > 70 && !hasTriggeredPullHaptic) {
        hasTriggeredPullHaptic = true;
        try {
          if (navigator.vibrate) navigator.vibrate(20);
        } catch (err) {}
      }
    }
  }, { passive: true });

  window.addEventListener('touchend', async () => {
    if (!isPulling) return;
    isPulling = false;

    if (pullIndicator && pullIndicator.classList.contains('pulling')) {
      const topPx = parseInt(pullIndicator.style.top || '0', 10);
      if (topPx >= 25) {
        pullIndicator.classList.remove('pulling');
        pullIndicator.classList.add('refreshing');
        pullIndicator.style.top = '16px';

        try {
          await refreshActiveViewContent();
          try {
            if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
          } catch (err) {}
        } finally {
          setTimeout(() => {
            pullIndicator.classList.remove('refreshing');
            pullIndicator.style.top = '-52px';
            if (spinner) spinner.style.transform = '';
          }, 400);
        }
      } else {
        pullIndicator.classList.remove('pulling');
        pullIndicator.style.top = '-52px';
        if (spinner) spinner.style.transform = '';
      }
    }
  });

  // 2. Tap Active Bottom Tab to Scroll To Top and Refresh
  const homeTab = document.getElementById('mobileTabHome');
  homeTab?.addEventListener('click', () => {
    if (state.activeView === 'feed') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerTabRefreshAnimation();
    }
  });

  const exploreTab = document.getElementById('mobileTabExplore');
  exploreTab?.addEventListener('click', () => {
    if (state.activeView === 'explore') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerTabRefreshAnimation();
    }
  });
}

async function refreshActiveViewContent() {
  if (state.activeView === 'feed') {
    await loadPosts();
    renderFeed();
    showToast('Feed refreshed with latest peer literature');
  } else if (state.activeView === 'explore') {
    renderExploreFeed();
    showToast('Horizons discovery radar refreshed');
  } else if (state.activeView === 'profile') {
    renderProfileView();
  }
}

function triggerTabRefreshAnimation() {
  try {
    if (navigator.vibrate) navigator.vibrate(25);
  } catch (err) {}
  refreshActiveViewContent();
}

/* ==========================================================================
   Dedicated Explore Search Filter
   ========================================================================== */
function initExploreSearch() {
  const searchInput = document.getElementById('exploreSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // 1. Filter Disciplines Grid
    const cards = document.querySelectorAll('.discipline-matrix-card');
    cards.forEach(card => {
      const topicName = card.querySelector('.matrix-topic-name')?.textContent?.toLowerCase() || '';
      card.style.display = topicName.includes(query) ? '' : 'none';
    });

    // 2. Filter Explore Unfollowed Posts Feed
    const exploreContainer = document.getElementById('explorePostsFeed');
    if (!exploreContainer) return;

    if (!query) {
      renderExploreFeed();
      return;
    }

    const matchedPosts = state.posts.filter(p => {
      const matchTitle = (p.title || '').toLowerCase().includes(query);
      const matchAuthors = (p.authors || '').toLowerCase().includes(query);
      const matchField = (p.field || '').toLowerCase().includes(query);
      return matchTitle || matchAuthors || matchField;
    });

    if (matchedPosts.length === 0) {
      exploreContainer.innerHTML = `
        <div class="empty-state" style="padding: 2.5rem 1rem;">
          <div class="empty-icon">🔍</div>
          <h3>No matching preprints found</h3>
          <p>Try searching for a different keyword or research discipline.</p>
        </div>
      `;
    } else {
      exploreContainer.innerHTML = matchedPosts.slice(0, 15).map(post => renderPostCard(post)).join('');
      attachCarouselEvents();
    }
  });
}

/* ==========================================================================
   Colleague & Scholar Notifications Center
   ========================================================================== */
const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'colleague_connect',
    title: 'New Colleague Connection',
    message: 'Dr. Sarah Lin (Stanford University) connected with you as a fellow researcher in Biotech & Genetics.',
    time: '12m ago',
    read: false,
    author: 'Dr. Sarah Lin (Stanford)',
    actionType: 'colleague',
    targetField: 'Biotech & Genetics'
  },
  {
    id: 'notif-2',
    type: 'colleague_folio',
    title: 'Colleague Published a Breakthrough Folio',
    message: 'Prof. Marcus V. (Oxford) published a new Folio in Quantum Computing: "Attention Is All You Need: Eliminating Recurrence in Sequence Modeling".',
    time: '45m ago',
    read: false,
    author: 'Prof. Marcus V.',
    actionType: 'view_folio',
    targetPostId: 'seed-transformer'
  },
  {
    id: 'notif-3',
    type: 'colleague_reply',
    title: 'Scholarly Discourse Reply',
    message: 'Elena Rostova replied to your discourse on AlphaFold 3: "The nucleic acid co-folding resolution is where this really outclasses AF2."',
    time: '2h ago',
    read: false,
    author: 'Elena Rostova',
    actionType: 'view_folio',
    targetPostId: 'seed-af3'
  },
  {
    id: 'notif-4',
    type: 'colleague_connect',
    title: 'Colleague Circle Update',
    message: 'Abramson, Adler et al. added you to their Colleague Circle in Molecular Modelling.',
    time: 'Yesterday',
    read: true,
    author: 'Abramson, Adler et al.',
    actionType: 'colleague',
    targetField: 'Biotech & Genetics'
  },
  {
    id: 'notif-5',
    type: 'colleague_folio',
    title: 'Landmark Publication Shared',
    message: 'Dr. Ming Zhao shared a new landmark folio: "Whole-Body Motion Guided Reference Generation for Humanoid Robots".',
    time: '2d ago',
    read: true,
    author: 'Dr. Ming Zhao',
    actionType: 'view_folio',
    targetPostId: 'openalex-w4413346903'
  }
];

function initNotifications() {
  const saved = localStorage.getItem('folerio_notifications');
  if (saved) {
    try {
      state.notifications = JSON.parse(saved);
    } catch (e) {
      state.notifications = [...DEFAULT_NOTIFICATIONS];
    }
  } else {
    state.notifications = [...DEFAULT_NOTIFICATIONS];
    localStorage.setItem('folerio_notifications', JSON.stringify(state.notifications));
  }
  updateNotificationsBadge();
}

function updateNotificationsBadge() {
  const unreadCount = (state.notifications || []).filter(n => !n.read).length;

  const topBadge = document.getElementById('notificationsBadge');
  if (topBadge) {
    topBadge.textContent = unreadCount;
    topBadge.classList.toggle('hidden', unreadCount === 0);
  }

  const sidebarBadge = document.getElementById('sidebarNotificationsBadge');
  if (sidebarBadge) {
    sidebarBadge.textContent = unreadCount;
    sidebarBadge.classList.toggle('hidden', unreadCount === 0);
  }

  // Update modal tab counters if open
  const countAll = document.getElementById('notifCountAll');
  if (countAll) countAll.textContent = state.notifications.length;

  const countColleagues = document.getElementById('notifCountColleagues');
  if (countColleagues) countColleagues.textContent = state.notifications.filter(n => n.type === 'colleague_connect').length;

  const countFolios = document.getElementById('notifCountFolios');
  if (countFolios) countFolios.textContent = state.notifications.filter(n => n.type === 'colleague_folio').length;

  const countMessages = document.getElementById('notifCountMessages');
  if (countMessages) countMessages.textContent = state.notifications.filter(n => n.type === 'colleague_reply').length;
}

function openNotificationsModal() {
  const modal = document.getElementById('notificationsModal');
  const backdrop = document.getElementById('notificationsModalBackdrop');
  if (!modal || !backdrop) return;

  renderNotifications(state.activeNotifFilter || 'all');
  backdrop.style.display = 'block';
  modal.classList.add('active');
}

function closeNotificationsModal() {
  const modal = document.getElementById('notificationsModal');
  const backdrop = document.getElementById('notificationsModalBackdrop');
  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.style.display = 'none';
}

function filterNotifications(filterKey) {
  state.activeNotifFilter = filterKey;
  document.querySelectorAll('.notifications-filter-tabs .notif-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.notifFilter === filterKey);
  });
  renderNotifications(filterKey);
}

function markAllNotificationsAsRead() {
  (state.notifications || []).forEach(n => n.read = true);
  localStorage.setItem('folerio_notifications', JSON.stringify(state.notifications));
  updateNotificationsBadge();
  renderNotifications(state.activeNotifFilter || 'all');
  showToast('All notifications marked as read ✓');
}

function renderNotifications(filterKey = 'all') {
  const listContainer = document.getElementById('notificationsList');
  if (!listContainer) return;

  let filtered = state.notifications || [];
  if (filterKey !== 'all') {
    filtered = filtered.filter(n => n.type === filterKey);
  }

  updateNotificationsBadge();

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="notif-empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <p style="font-weight:600; color:var(--text-primary); margin-bottom:0.25rem;">All Caught Up</p>
        <p style="font-size:0.78rem;">No new colleague notifications in this category.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(notif => {
    let iconClass = 'connect';
    let iconChar = '👥';
    let actionBtnText = 'View Details';

    if (notif.type === 'colleague_folio') {
      iconClass = 'folio';
      iconChar = '📄';
      actionBtnText = 'Read Folio &rarr;';
    } else if (notif.type === 'colleague_reply') {
      iconClass = 'reply';
      iconChar = '💬';
      actionBtnText = 'View Discussion &rarr;';
    } else if (notif.type === 'colleague_connect') {
      const isConnected = state.colleagues.has(notif.author);
      actionBtnText = isConnected ? '✓ Colleague' : '+ Connect Back';
    }

    return `
      <div class="notification-item ${!notif.read ? 'unread' : ''}" onclick="handleNotificationClick('${escapeHTML(notif.id)}')">
        <div class="notif-type-icon ${iconClass}">
          ${iconChar}
        </div>
        <div class="notif-content-wrap">
          <div class="notif-header-line">
            <span class="notif-title">${escapeHTML(notif.title)}</span>
            <span class="notif-time">${escapeHTML(notif.time)}</span>
          </div>
          <p class="notif-message">${escapeHTML(notif.message)}</p>
          <button class="notif-action-btn" onclick="event.stopPropagation(); handleNotificationAction('${escapeHTML(notif.id)}')">
            ${actionBtnText}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function handleNotificationClick(notifId) {
  const notif = state.notifications.find(n => n.id === notifId);
  if (!notif) return;
  notif.read = true;
  localStorage.setItem('folerio_notifications', JSON.stringify(state.notifications));
  updateNotificationsBadge();
  handleNotificationAction(notifId);
}

function handleNotificationAction(notifId) {
  const notif = state.notifications.find(n => n.id === notifId);
  if (!notif) return;

  notif.read = true;
  localStorage.setItem('folerio_notifications', JSON.stringify(state.notifications));
  updateNotificationsBadge();

  if (notif.actionType === 'view_folio' && notif.targetPostId) {
    closeNotificationsModal();
    switchMainView('feed');

    // Smooth scroll to target post
    setTimeout(() => {
      const targetCard = document.getElementById(`post-${notif.targetPostId}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.classList.remove('folio-highlight-pulse');
        void targetCard.offsetWidth; // trigger reflow
        targetCard.classList.add('folio-highlight-pulse');
      } else {
        showToast('Viewing folio in dispatch feed...');
      }
    }, 150);
  } else if (notif.actionType === 'colleague') {
    if (notif.author) {
      const wasConnected = state.colleagues.has(notif.author);
      if (!wasConnected) {
        state.colleagues.add(notif.author);
        localStorage.setItem('folerio_colleagues', JSON.stringify([...state.colleagues]));
        showToast(`You and ${notif.author} are now connected colleagues! 🤝`);
      } else {
        showToast(`Already connected with ${notif.author}`);
      }
      renderNotifications(state.activeNotifFilter || 'all');
    }
  }
}

function addNotification({ type, title, message, author, actionType, targetPostId, targetField }) {
  const newNotif = {
    id: 'notif-' + Date.now(),
    type: type || 'colleague_connect',
    title: title || 'Colleague Activity',
    message: message || '',
    time: 'Just now',
    read: false,
    author: author || 'Research Colleague',
    actionType: actionType || (targetPostId ? 'view_folio' : 'colleague'),
    targetPostId: targetPostId || null,
    targetField: targetField || null
  };

  if (!state.notifications) state.notifications = [];
  state.notifications.unshift(newNotif);
  if (state.notifications.length > 40) {
    state.notifications = state.notifications.slice(0, 40);
  }
  localStorage.setItem('folerio_notifications', JSON.stringify(state.notifications));
  updateNotificationsBadge();
}

window.openNotificationsModal = openNotificationsModal;
window.closeNotificationsModal = closeNotificationsModal;
window.filterNotifications = filterNotifications;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.handleNotificationClick = handleNotificationClick;
window.handleNotificationAction = handleNotificationAction;
window.addNotification = addNotification;


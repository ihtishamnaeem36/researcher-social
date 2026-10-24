/**
 * card-generator.js
 * Generates minimalist, publication-grade cards & exports high-res PNGs
 */

const CardGenerator = {
  // Theme styling definitions for canvas and CSS
  themes: {
    obsidian: {
      bgStart: '#11151f',
      bgEnd: '#080a0e',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      accent: '#38bdf8',
      border: 'rgba(255, 255, 255, 0.12)'
    },
    editorial: {
      bgStart: '#f8fafc',
      bgEnd: '#f1f5f9',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      accent: '#0284c7',
      border: '#cbd5e1'
    },
    deepblue: {
      bgStart: '#1e1b4b',
      bgEnd: '#030712',
      textPrimary: '#ffffff',
      textSecondary: '#a5b4fc',
      accent: '#818cf8',
      border: 'rgba(129, 140, 248, 0.2)'
    },
    emerald: {
      bgStart: '#064e3b',
      bgEnd: '#021a14',
      textPrimary: '#ffffff',
      textSecondary: '#a7f3d0',
      accent: '#34d399',
      border: 'rgba(52, 211, 153, 0.2)'
    },
    sunset: {
      bgStart: '#78350f',
      bgEnd: '#1c0a00',
      textPrimary: '#ffffff',
      textSecondary: '#fde68a',
      accent: '#fbbf24',
      border: 'rgba(251, 191, 36, 0.2)'
    }
  },

  /**
   * Render HTML for the active live preview card
   */
  renderPreviewHTML(data, slideIndex, themeName) {
    const theme = this.themes[themeName] || this.themes.obsidian;
    const isEditorial = themeName === 'editorial';

    if (slideIndex === 0) {
      // Slide 1: Hero / Breakthrough hook
      return `
        <div class="slide-badge-row">
          <span class="slide-label" style="color: ${theme.accent}">● Breakthrough Brief</span>
          <span class="post-tag" style="background: ${isEditorial ? '#e0f2fe' : 'rgba(56, 189, 248, 0.12)'}; color: ${theme.accent}">${data.field || 'General Science'}</span>
        </div>

        <div class="slide-hero-body">
          <h2 class="paper-hero-title">${data.title || 'Untitled Paper Title'}</h2>
          <div class="breakthrough-hook" style="border-left-color: ${theme.accent}">
            "${data.hook || 'Write a 1-sentence breakthrough claim to see the preview update...'}"
          </div>
        </div>

        <div class="slide-footer-row">
          <span class="paper-authors-tag">${data.authors || 'Authors'}</span>
          <span class="swipe-hint">Swipe for deep dive &rarr;</span>
        </div>
      `;
    } else if (slideIndex === 1) {
      // Slide 2: Methodology
      return `
        <div class="slide-badge-row">
          <span class="dive-section-tag" style="color: ${theme.accent}">[02] Methodology & Setup</span>
          <span class="post-tag">${data.field || 'Science'}</span>
        </div>
        <div class="slide-dive-body">
          <h3 class="dive-heading">How the Study was Conducted</h3>
          <div class="dive-content">
            <p>${data.method || 'Add methodology notes: experimental model, dataset, architecture, controls...'}</p>
          </div>
        </div>
        <div class="slide-footer-row">
          <span>${data.title ? data.title.slice(0, 38) + '...' : ''}</span>
          <span class="swipe-hint">Swipe &rarr;</span>
        </div>
      `;
    } else if (slideIndex === 2) {
      // Slide 3: Results
      return `
        <div class="slide-badge-row">
          <span class="dive-section-tag" style="color: ${theme.accent}">[03] Key Results & Data</span>
          <span class="post-tag">${data.field || 'Science'}</span>
        </div>
        <div class="slide-dive-body">
          <h3 class="dive-heading">Breakthrough Findings</h3>
          <div class="dive-content">
            <p>${data.results || 'Add concrete numbers, metrics, statistically significant outcomes...'}</p>
          </div>
        </div>
        <div class="slide-footer-row">
          <span>Data & Evidence</span>
          <span class="swipe-hint">Swipe &rarr;</span>
        </div>
      `;
    } else {
      // Slide 4: Limitations / Caveats
      return `
        <div class="slide-badge-row">
          <span class="dive-section-tag" style="color: ${theme.accent}">[04] Caveats & Future Work</span>
          <span class="post-tag">${data.field || 'Science'}</span>
        </div>
        <div class="slide-dive-body">
          <h3 class="dive-heading">Critical Evaluation</h3>
          <div class="dive-content">
            <p>${data.critique || 'Add caveats, open questions, failure modes, or future exploration areas...'}</p>
          </div>
        </div>
        <div class="slide-footer-row">
          <span>Source: ${data.doi ? 'Verified DOI / Link' : 'Open Access'}</span>
          <span style="color: ${theme.accent}">End of Carousel</span>
        </div>
      `;
    }
  },

  /**
   * Export the current card to high-res PNG (1080x1350 - standard 4:5 Instagram / Social format)
   */
  exportToCanvas(data, slideIndex, themeName) {
    const canvas = document.getElementById('exportCanvas');
    const ctx = canvas.getContext('2d');
    const theme = this.themes[themeName] || this.themes.obsidian;

    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    // Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, theme.bgStart);
    gradient.addColorStop(1, theme.bgEnd);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle Grid/Pattern
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 300, 0, Math.PI * 2);
    ctx.stroke();

    // Outer border
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Header Label & Tag
    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = theme.accent;
    const headerTag = slideIndex === 0 ? '● BREAKTHROUGH BRIEF' : `[0${slideIndex + 1}] DEEP-DIVE DECK`;
    ctx.fillText(headerTag, 90, 130);

    // Discipline Tag Badge
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = theme.textSecondary;
    ctx.fillText(data.field || 'Research', width - 380, 130);

    // Divider line
    ctx.strokeStyle = theme.border;
    ctx.beginPath();
    ctx.moveTo(90, 160);
    ctx.lineTo(width - 90, 160);
    ctx.stroke();

    if (slideIndex === 0) {
      // Paper Title (Newsreader / Serif font)
      ctx.font = 'bold 54px Georgia, serif';
      ctx.fillStyle = theme.textPrimary;
      this.wrapText(ctx, data.title || 'Paper Title', 90, 260, width - 180, 72);

      // Accent border for hook
      ctx.fillStyle = theme.accent;
      ctx.fillRect(90, 680, 6, 220);

      // Hook content
      ctx.font = 'italic 38px Georgia, serif';
      ctx.fillStyle = theme.textPrimary;
      this.wrapText(ctx, `"${data.hook || 'Key finding...'}"`, 120, 730, width - 230, 56);
    } else {
      // Slide Title
      const titles = ['', 'Methodology & Setup', 'Breakthrough Findings', 'Critical Takeaways & Caveats'];
      const texts = ['', data.method, data.results, data.critique];

      ctx.font = 'bold 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = theme.textPrimary;
      ctx.fillText(titles[slideIndex], 90, 280);

      ctx.font = '36px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = theme.textSecondary;
      this.wrapText(ctx, texts[slideIndex] || '', 90, 380, width - 180, 58);
    }

    // Footer Info
    ctx.strokeStyle = theme.border;
    ctx.beginPath();
    ctx.moveTo(90, height - 170);
    ctx.lineTo(width - 90, height - 170);
    ctx.stroke();

    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = theme.textSecondary;
    ctx.fillText(data.authors || 'Noesis Scholarly Folio', 90, height - 110);

    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = theme.accent;
    ctx.fillText('NOESIS • SWIPE TO READ', width - 420, height - 110);

    // Trigger download
    const link = document.createElement('a');
    link.download = `noesis-folio-slide-${slideIndex + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  },

  /**
   * Helper to wrap text gracefully in Canvas
   */
  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }
};

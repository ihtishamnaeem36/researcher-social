# Synapse — Research Social Media 🔬⚡

> A visual micro-publishing platform designed specifically for researchers, academics, and science enthusiasts. Turn dense, 20-page papers into elegant, bite-sized horizontal carousels with deep-dive technical slides.

---

## ✨ Core Features

1. **Instagram-Style Paper Carousels:**
   - **Slide 1 (The Hook):** Minimalist visual card highlighting the paper title, authors, field tag, and 1-sentence breakthrough claim.
   - **Slide 2 (Methodology):** Dataset sizes, neural architecture, experimental controls.
   - **Slide 3 (Breakthrough Data):** Quantitative improvements, benchmark wins, statistical findings.
   - **Slide 4 (Critical Takeaways):** Unresolved caveats, future directions, direct DOI / arXiv link.

2. **In-Browser Card Generator Studio:**
   - Real-time two-way card preview.
   - 5 curated aesthetic themes (*Obsidian*, *Swiss Editorial*, *Deep Cosmic*, *Sage Lab*, *Warm Ochre*).
   - **One-Click Export to PNG (4:5 Social Ratio):** Exports publication-ready cards directly from your browser canvas to share on Instagram, LinkedIn, or Twitter/X.

3. **Zero-Cost Serverless Architecture:**
   - **Frontend:** Pure HTML5, CSS3, and JavaScript — hostable for free on **GitHub Pages**.
   - **Backend:** **Supabase Free Tier** (PostgreSQL, Auth, and Storage) via simple REST API.
   - **Offline/Demo Fallback:** Automatically runs using browser `localStorage` if no Supabase credentials are provided.

---

## 🚀 Running Locally

No npm or build tools needed! You can start a local development server using Python:

```bash
cd /home/ihtishamnaeem36/.gemini/antigravity-ide/scratch/researcher-social
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

---

## 🌐 Deploying to GitHub Pages for Free

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new) and name it `synapse` (or any name you choose).
   - Leave it public.

2. **Push this code to your GitHub repo:**
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/synapse.git
   git branch -M main
   git push -u origin main
   ```

3. **Activate GitHub Pages:**
   - In your GitHub repository, go to **Settings &rarr; Pages**.
   - Under **Build and deployment &rarr; Source**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://YOUR_GITHUB_USERNAME.github.io/synapse/` in under 60 seconds!

---

## 🗄️ Connecting Free Supabase Backend

1. Create a free account at [supabase.com](https://supabase.com).
2. Create a new project (free tier).
3. Open the **SQL Editor** in Supabase and paste the contents of [`schema.sql`](schema.sql), then click **Run**.
4. In Supabase, go to **Project Settings &rarr; API** and copy:
   - **Project URL**
   - **Project API Keys &rarr; `anon` `public`**
5. On your live Synapse site, click the **"Cloud Sync"** button in the header and paste these values. Your posts and likes will now sync globally!

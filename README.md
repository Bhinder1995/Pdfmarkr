# 📄 PDFMarkr

> **Edit, convert, share. Done.**
> 10+ professional PDF tools that run 100% in your browser. No uploads. No servers. No limits. Completely free.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06b6d4?logo=tailwindcss)](https://tailwindcss.com)

---

## 🌟 Features

| Tool | Description |
|------|-------------|
| 🗂️ **Merge PDF** | Combine multiple PDFs, drag to reorder, insert blank pages between files |
| ✂️ **Split PDF** | Extract all pages, odd/even pages, or a custom range (e.g. `1, 3-5, 8`) |
| 📦 **Compress PDF** | Shrink file size losslessly; Maximum Privacy mode strips all hidden metadata |
| 🔄 **Rotate PDF** | Rotate all, odd, or even pages by 90°, 180°, or 270° |
| 📝 **PDF to Word** | Convert PDF to editable `.docx` with full text extraction |
| 📄 **Word to PDF** | Convert `.doc`/`.docx` to PDF with optional diagonal watermark |
| 🔤 **Extract Text** | Pull all text page-by-page to `.txt`; copy to clipboard in one click |
| 🏷️ **Metadata Editor** | View and edit hidden PDF properties (title, author, keywords, creator) |

**Why PDFMarkr is different:**
- 🔒 **Zero uploads** — files are loaded into browser RAM, never sent to any server
- 🚀 **One-Time Upload** — upload once and use across all tools (Merge → Compress → Watermark without re-uploading)
- ⚡ **Instant** — no server round-trips; WebAssembly-powered engines do the work
- ♾️ **Free forever** — no account, no subscription, no credits, no file size limits
- 🌐 **Cross-platform** — works on any modern browser on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript 5.8 |
| Build tool | Vite 6 |
| Styling | TailwindCSS 4 + Vanilla CSS custom properties |
| Routing | React Router 7 |
| Animations | Motion (Framer Motion v12) |
| PDF manipulation | **pdf-lib** (create/edit/merge/split/rotate/compress) |
| PDF rendering | **PDF.js** (page previews, text extraction) |
| Word → DOCX | **docx** library |
| DOCX → text | **mammoth** |
| SEO | react-helmet-async + JSON-LD structured data |
| Icons | Lucide React |
| AI (optional) | Google Gemini via `@google/genai` |

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org/))
- **npm** v9+ (bundled with Node.js)
- **Git** ([download](https://git-scm.com/))

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/pdfmarkr.git
cd pdfmarkr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables (optional)

The only optional env variable is for the Google Gemini AI integration:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your Gemini API key if you want AI features
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The core PDF tools work without any API key. Gemini is only needed for potential future AI features.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The dev server supports hot module replacement (HMR) — changes reflect instantly.

---

## 📦 Building for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your `pdfmarkr` repository
4. Vercel auto-detects Vite — click **Deploy**
5. Add environment variable `GEMINI_API_KEY` in Vercel project settings if needed

**Important:** Add this `vercel.json` to handle SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add a `_redirects` file in `public/`:
   ```
   /*  /index.html  200
   ```

### Deploy to GitHub Pages

```bash
npm run build
# Then push the dist/ folder to the gh-pages branch
```

---

## 🏗️ Project Architecture

```
pdfmarkr/
├── index.html              # HTML entry point with SEO meta tags & JSON-LD
├── vite.config.ts          # Vite build configuration
├── package.json
├── tsconfig.json
├── .env.example            # Environment variable template
│
├── public/
│   ├── robots.txt          # Search engine crawl rules
│   └── sitemap.xml         # XML sitemap for SEO
│
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Routes, HomePage, Footer, static pages
    ├── index.css           # Global styles & CSS custom properties (design tokens)
    │
    ├── components/
    │   ├── Navbar.tsx          # Top navigation + TOOLS config export
    │   ├── ToolWorkspace.tsx   # Tool page shell (sidebar + main area + SEO)
    │   ├── DropZone.tsx        # Drag-and-drop file input
    │   ├── PdfCanvas.tsx       # PDF page thumbnail renderer
    │   └── FaqAccordion.tsx    # Expandable FAQ section
    │
    ├── tools/                  # ← Individual tool components (one file per tool)
    │   ├── MergeTool.tsx
    │   ├── SplitTool.tsx
    │   ├── CompressTool.tsx
    │   ├── RotateTool.tsx
    │   ├── PdfToWordTool.tsx
    │   ├── WordToPdfTool.tsx
    │   ├── ExtractTextTool.tsx
    │   └── MetadataTool.tsx
    │
    ├── services/
    │   └── pdfEngine.ts        # All PDF operations (pdf-lib + PDF.js)
    │
    ├── content/
    │   └── seo-data.ts         # SEO copy, FAQs, keywords per tool
    │
    └── lib/
        └── utils.ts            # Utility helpers (cn, etc.)
```

### How Tools Work (Client-Side Only)

```
User drops file
      ↓
DropZone.tsx → File object (stays in browser memory)
      ↓
pdfEngine.ts → pdf-lib / PDF.js (WebAssembly in browser)
      ↓
Processed Blob → download() helper → Save to device
```

No network requests are made for file processing. Files are read as `ArrayBuffer`, manipulated in-memory, and returned as a downloadable `Blob`.

---

## ➕ How to Add a New Tool

1. **Add to TOOLS array** in `src/components/Navbar.tsx`:
   ```typescript
   { id: 'my-tool', path: '/my-tool', name: 'My Tool', icon: SomeIcon, cat: 'convert' }
   ```

2. **Create tool component** `src/tools/MyTool.tsx`:
   ```tsx
   import React, { useState } from 'react';
   import { DropZone } from '../components/DropZone';
   import { PDFEngine } from '../services/pdfEngine';

   export const MyTool: React.FC<{ files: File[]; onResult: (b: Blob, name: string) => void }> = ({ files, onResult }) => {
     // ... your tool UI and logic
   };
   ```

3. **Register the route** in `src/components/ToolWorkspace.tsx`:
   ```tsx
   case 'my-tool':
     return <MyTool files={files} onResult={handleResult} />;
   ```

4. **Add engine method** in `src/services/pdfEngine.ts`:
   ```typescript
   async myOperation(file: File): Promise<Uint8Array> {
     const buf = await file.arrayBuffer();
     const doc = await PDFDocument.load(buf);
     // ... do work
     return doc.save();
   }
   ```

5. **Add SEO data** in `src/content/seo-data.ts`:
   ```typescript
   'my-tool': {
     title: 'My Tool | PDFMarkr',
     description: '...',
     keywords: ['...'],
     content: '<h2>...</h2><p>...</p>',
     faqs: [{ question: '...', answer: '...' }],
   }
   ```

6. **Add route** in `src/App.tsx`:
   ```tsx
   <Route path="/my-tool" element={<ToolWorkspace type="my-tool" />} />
   ```

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server at `localhost:3000` with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | TypeScript type-check (no emit) |
| `npm run clean` | Delete `dist/` folder |

---

## 📂 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional | Google Gemini API key for AI features |

Create a `.env` file in the project root (see `.env.example`).

---

## 🔒 Privacy & Security

- **Zero server interaction** for file processing
- Files are loaded into JavaScript `ArrayBuffer` and never leave the browser tab
- No cookies, no tracking, no analytics that share user data
- CDN-served static assets (pdf-lib, PDF.js) are standard open-source libraries
- HTTPS enforced on all deployments

---

## 🗺️ Roadmap

- [ ] PWA support (offline-capable, installable)
- [ ] PDF annotation / highlight tool
- [ ] Image to PDF converter
- [ ] PDF page reorder (drag-and-drop within a single PDF)
- [ ] OCR text extraction (for scanned PDFs)
- [ ] Dark mode toggle (currently auto-detects system preference)
- [ ] Batch processing (multiple files at once)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

```bash
# Fork the repo, then:
git checkout -b feature/my-feature
git commit -m "feat: add my feature"
git push origin feature/my-feature
# Open a Pull Request on GitHub
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- [pdf-lib](https://pdf-lib.js.org/) — PDF creation and modification in JavaScript
- [PDF.js](https://mozilla.github.io/pdf.js/) — Mozilla's PDF rendering engine
- [docx](https://docx.js.org/) — Generate `.docx` files in JavaScript
- [mammoth](https://github.com/mwilliamson/mammoth.js) — Extract text from `.docx`
- [Lucide React](https://lucide.dev/) — Beautiful, consistent icons
- [Motion](https://motion.dev/) — Production-ready animations

---

<p align="center">
  Built with ❤️ — <strong>pdfmarkr.com</strong>
</p>

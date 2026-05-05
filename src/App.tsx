import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Search, ArrowRight, Shield, Zap, Globe, Lock, FileStack, Scissors, Minimize2, FileText, FileOutput, RotateCw, Type, Tally4 } from 'lucide-react';
import { Navbar, TOOLS } from './components/Navbar';
import { Logo } from './components/Logo';
import { ToolWorkspace } from './components/ToolWorkspace';
import { GuideLayout } from './components/GuideLayout';
import { GUIDES } from './content/guides-data';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { GuidesPage } from './pages/GuidesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { cn } from './lib/utils';

/* ── ScrollToTop ─────────────────────────────────────────────── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

/* ── Footer ──────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background: '#0f172a', borderTop: '1px solid #1e293b' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <Logo />
            </div>
            <span className="font-bold text-xl" style={{ color: '#e11d48', letterSpacing: '-0.02em' }}>pdf<span style={{ color: 'white' }}>markr</span></span>
          </Link>
          <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
            Professional-grade, private PDF tools that run entirely in your browser. No uploads, no servers, and 100% free forever. PDFMarkr ensures your sensitive documents never leave your device while providing the speed of local processing.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">Local Engine Active</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
              <Shield size={10} className="text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Zero-Upload Policy</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#475569', letterSpacing: '0.15em' }}>Organize</p>
          <ul className="space-y-2">
            {TOOLS.filter(t => t.cat === 'organize').map(t => (
              <li key={t.id}><Link to={t.path} className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>{t.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#475569', letterSpacing: '0.15em' }}>Convert</p>
          <ul className="space-y-2">
            {TOOLS.filter(t => t.cat === 'convert').map(t => (
              <li key={t.id}><Link to={t.path} className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>{t.name}</Link></li>
            ))}
            {TOOLS.filter(t => t.cat === 'advanced').map(t => (
              <li key={t.id}><Link to={t.path} className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>{t.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#475569', letterSpacing: '0.15em' }}>Resources</p>
          <ul className="space-y-2">
            {GUIDES.map(g => (
              <li key={g.slug}><Link to={`/guides/${g.slug}`} className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>{g.title.split(' ').slice(0, 5).join(' ')}...</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#475569', letterSpacing: '0.15em' }}>Company</p>
          <ul className="space-y-2">
            {[['About','/about'],['Privacy','/privacy'],['Terms','/terms']].map(([l,h]) => (
              <li key={l}><Link to={h} className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>{l}</Link></li>
            ))}
            <li><a href="/sitemap.xml" target="_blank" className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>Sitemap</a></li>
            <li><a href="/llms.txt" target="_blank" className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>LLM Info</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #1e293b' }}>
        <p className="text-xs" style={{ color: '#475569' }}>© {new Date().getFullYear()} PDFMarkr. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {[['🔒','Zero uploads'],['⚡','Browser-powered'],['♾️','Always free']].map(([e,l]) => (
            <span key={l} className="text-xs font-semibold" style={{ color: '#475569' }}>{e} {l}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ── HomePage ─────────────────────────────────────────────────── */
const HomePage = () => {
  const [query, setQuery] = useState('');
  const filtered = query
    ? TOOLS.filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
    : TOOLS;

  const stats = [
    { val: '8', label: 'PDF Tools' },
    { val: '0', label: 'Uploads needed' },
    { val: '100%', label: 'Browser-based' },
    { val: '∞', label: 'Files processed' },
  ];

  const features = [
    { icon: Shield, title: 'Military-Grade Privacy', desc: 'Files never leave your device. All processing happens in browser RAM.' },
    { icon: Zap, title: 'Instant Processing', desc: 'No server round-trips. Results appear in seconds, not minutes.' },
    { icon: Globe, title: 'Works Everywhere', desc: 'Any browser, any device. No installs, no plugins, no accounts.' },
    { icon: Lock, title: 'Free Forever', desc: 'No subscriptions, no credits, no paywalls. Genuinely unlimited.' },
  ];

  return (
    <>
      <Helmet>
        <title>PDFMarkr — Free Online PDF Tools | No Upload, No Sign-Up, Maximum Privacy</title>
        <meta name="description" content="Merge, split, compress, rotate, and convert PDFs entirely in your browser. No account, no server uploads, no waiting. 100% private and free professional PDF tools." />
        <meta name="keywords" content="online PDF tools no upload, browser-based PDF tools, PDF merge split compress, no sign-up PDF tool, free PDF tools any device" />
        <link rel="canonical" href="https://pdfmarkr.com/" />
        <meta property="og:title" content="PDFMarkr — 100% Free Online PDF Tools | Maximum Privacy" />
        <meta property="og:description" content="8 professional PDF utilities running entirely in your browser. Merge, compress, and convert PDFs instantly. Zero uploads." />
        <meta property="og:url" content="https://pdfmarkr.com/" />
        <meta property="og:image" content="https://pdfmarkr.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDFMarkr — 100% Free Online PDF Tools" />
        <meta name="twitter:description" content="Merge, compress, and convert PDFs instantly in your browser. Zero uploads, 100% private." />
        <meta name="twitter:image" content="https://pdfmarkr.com/og-image.png" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden grid-bg" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="mesh-hero absolute inset-0 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: '#1d4ed8', letterSpacing: '0.1em' }}>100% Browser-Based · Zero Uploads</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem,5vw,3.75rem)', color: 'var(--color-text)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Professional PDF Tools,<br />
              <span className="gradient-text">100% Private.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              Professional PDF tools for the privacy era. Merge, split, compress, rotate, and convert files directly in your browser. No accounts. No uploads. Works on any device.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative mb-10">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
              <input
                type="search" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search tools…"
                className="w-full rounded-2xl py-4 pl-12 pr-5 text-base focus-ring"
                style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs" style={{ background: 'var(--color-brand-light)', color: 'var(--color-brand)', fontWeight: 'bold' }}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left flex flex-col items-center sm:items-start">
                <div className="flex gap-1 text-yellow-400 mb-0.5">
                  {[1,2,3,4,5].map(i => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Trusted by professionals worldwide</p>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/merge-pdf" className="btn-primary">
                <FileStack size={18} /> Merge PDF
              </Link>
              <Link to="/compress-pdf" className="btn-ghost">
                <Minimize2 size={16} /> Compress PDF
              </Link>
              <Link to="/pdf-to-word" className="btn-ghost">
                <FileText size={16} /> PDF to Word
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x" style={{ divideColor: 'var(--color-border)' }}>
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center py-2">
              <span className="text-2xl font-bold gradient-text">{s.val}</span>
              <span className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {query && <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>Showing results for "<strong>{query}</strong>"</p>}
        {filtered.length === 0 && (
          <p className="text-center py-16 text-lg" style={{ color: 'var(--color-muted)' }}>No tools match your search.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((tool, i) => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <Link to={tool.path} className="tool-card flex flex-col h-full" style={{ textDecoration: 'none' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-white" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                  <tool.icon size={22} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text)', fontWeight: 700 }}>{tool.name}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-muted)' }}>
                  {tool.id === 'merge' && 'Combine multiple PDFs into one document. Drag, reorder, and merge.'}
                  {tool.id === 'split' && 'Extract specific pages or split every page into its own file.'}
                  {tool.id === 'compress' && 'Reduce PDF size without visible quality loss. Fast and lossless.'}
                  {tool.id === 'rotate' && 'Fix sideways or upside-down PDF pages permanently.'}
                  {tool.id === 'pdf-to-word' && 'Convert PDF to editable Word .docx with full text extraction.'}
                  {tool.id === 'word-to-pdf' && 'Turn .doc or .docx files into professional, shareable PDFs.'}
                  {tool.id === 'extract-text' && 'Pull all text from a PDF into a clean, searchable .txt file.'}
                  {tool.id === 'metadata' && 'View and edit hidden PDF properties: title, author, keywords.'}
                </p>
                <div className="flex items-center gap-1 mt-5 text-xs font-bold" style={{ color: 'var(--color-brand)' }}>
                  Open Tool <ArrowRight size={13} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-3">Enterprise-Grade Security</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Privacy by Design. No Cloud Required.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl" style={{ border: '1.5px solid var(--color-border)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold mb-2 text-base" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Footer / Internal Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>Professional PDF Suite</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              PDFMarkr provides a comprehensive suite of utilities designed for professionals who prioritize data privacy. Our tools use advanced WebAssembly technology to process documents directly in your browser RAM, ensuring your sensitive files never touch our servers.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-brand)' }}>Top Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/merge-pdf" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Merge PDF Files</Link></li>
              <li><Link to="/compress-pdf" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Reduce PDF Size</Link></li>
              <li><Link to="/pdf-to-word" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Convert PDF to Word</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-brand)' }}>Converters</h4>
            <ul className="space-y-2">
              <li><Link to="/word-to-pdf" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>DOCX to PDF</Link></li>
              <li><Link to="/pdf-to-images" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Export PDF to JPG</Link></li>
              <li><Link to="/extract-text" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Extract PDF Text</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-brand)' }}>Advanced</h4>
            <ul className="space-y-2">
              <li><Link to="/metadata-editor" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Edit PDF Metadata</Link></li>
              <li><Link to="/watermark-pdf" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Watermark PDF</Link></li>
              <li><Link to="/rotate-pdf" className="text-sm hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>Rotate PDF Pages</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="rounded-3xl p-10 sm:p-16 grain relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1e40af 0%,#4338ca 100%)' }}>
          <h2 className="text-3xl font-bold text-white mb-4">Start processing PDFs now.</h2>
          <p className="text-lg mb-8" style={{ color: '#bfdbfe' }}>No account needed. No file size limit. Works on any browser.</p>
          <Link to="/merge-pdf" className="inline-flex items-center gap-2 font-bold text-base px-10 py-4 rounded-2xl transition-all hover:scale-105"
            style={{ background: '#fff', color: '#1d4ed8', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <FileStack size={20} /> Start with Merge PDF
          </Link>
        </div>
      </section>
    </>
  );
};



/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-page-bg)' }}>
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:slug" element={<GuideLayout />} />
          <Route path="/merge-pdf"       element={<ToolWorkspace type="merge" />} />
          <Route path="/split-pdf"       element={<ToolWorkspace type="split" />} />
          <Route path="/compress-pdf"    element={<ToolWorkspace type="compress" />} />
          <Route path="/rotate-pdf"      element={<ToolWorkspace type="rotate" />} />
          <Route path="/pdf-to-word"     element={<ToolWorkspace type="pdf-to-word" />} />
          <Route path="/word-to-pdf"     element={<ToolWorkspace type="word-to-pdf" />} />
          <Route path="/extract-text"    element={<ToolWorkspace type="extract-text" />} />
          <Route path="/metadata-editor" element={<ToolWorkspace type="metadata" />} />
          <Route path="/pdf-to-images"   element={<ToolWorkspace type="pdf-to-images" />} />
          <Route path="/watermark-pdf"   element={<ToolWorkspace type="watermark" />} />
          <Route path="*"                element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

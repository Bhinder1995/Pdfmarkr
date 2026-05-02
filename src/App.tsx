import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Search, ArrowRight, Shield, Zap, Globe, Lock, FileStack, Scissors, Minimize2, FileText, FileOutput, RotateCw, Type, Tally4 } from 'lucide-react';
import { Navbar, TOOLS } from './components/Navbar';
import { ToolWorkspace } from './components/ToolWorkspace';
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>P</div>
            <span className="font-bold text-white text-xl" style={{ letterSpacing: '-0.02em' }}>pdf<span style={{ color: '#60a5fa' }}>markr</span></span>
          </Link>
          <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
            Professional PDF tools that run entirely in your browser. No uploads. No servers. Just fast, private, free processing.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400">All systems private</span>
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
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#475569', letterSpacing: '0.15em' }}>Company</p>
          <ul className="space-y-2">
            {[['About','/about'],['Privacy','/privacy'],['Terms','/terms'],['Sitemap','/sitemap.xml']].map(([l,h]) => (
              <li key={l}><Link to={h} className="text-sm transition-colors hover:text-white" style={{ color: '#64748b' }}>{l}</Link></li>
            ))}
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
        <title>PDFMarkr — Free Online PDF Tools | Merge, Split, Compress, Convert</title>
        <meta name="description" content="8 professional PDF tools running 100% in your browser. Merge, split, compress, rotate, convert PDF to Word and more. No uploads, no servers, completely private and free." />
        <link rel="canonical" href="https://pdfmarkr.com/" />
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
              Professional PDF tools<br />
              <span className="gradient-text">for the privacy era.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              Merge, split, compress, rotate, and convert PDF files directly in your browser.
              No accounts. No uploads. No limits. Works on any device.
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
            <p className="mono-label mb-3">Why PDFMarkr</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Built different. Built private.</h2>
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

/* ── Static pages ────────────────────────────────────────────── */
const AboutPage = () => (
  <>
    <Helmet>
      <title>About PDFMarkr — Privacy-First PDF Tools</title>
      <meta name="description" content="PDFMarkr provides free, browser-based PDF tools that process files locally. No uploads, no servers, complete privacy by design." />
    </Helmet>
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>About PDFMarkr</h1>
      <div className="prose-seo">
        <p>PDFMarkr was built on a simple premise: your documents are your business. You shouldn't have to upload sensitive files to a stranger's server just to merge a PDF.</p>
        <h2>How We're Different</h2>
        <p>Every PDF tool on PDFMarkr runs entirely inside your web browser using WebAssembly-powered engines — <strong>pdf-lib</strong> for document manipulation and <strong>PDF.js</strong> for rendering. Your files load into browser RAM, are processed, and are returned to you — without ever touching our infrastructure.</p>
        <h2>Our Commitment</h2>
        <p>We commit to keeping all core tools free, ad-light, and available without registration. Privacy is not a feature here — it's the architecture.</p>
      </div>
    </main>
  </>
);

const PrivacyPage = () => (
  <>
    <Helmet>
      <title>Privacy Policy | PDFMarkr</title>
      <meta name="description" content="PDFMarkr's privacy policy. We collect no file data. All processing is done locally in your browser." />
    </Helmet>
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
      <div className="prose-seo">
        <p><strong>Last updated:</strong> May 2026</p>
        <h2>Files & Data</h2>
        <p>PDFMarkr does <strong>not</strong> collect, store, transmit, or process any files you use with our tools. All PDF operations are performed locally using your device's processing power. No file content ever leaves your browser.</p>
        <h2>Analytics</h2>
        <p>We may use privacy-respecting analytics (without personal data or fingerprinting) to understand which tools are most used. No cookies are used for tracking or advertising.</p>
        <h2>Third Parties</h2>
        <p>We use CDN-hosted open-source libraries (pdf-lib, PDF.js). These are static asset loads; no user data is shared with these providers.</p>
        <h2>Contact</h2>
        <p>Questions about privacy? Email us at <strong>privacy@pdfmarkr.com</strong></p>
      </div>
    </main>
  </>
);

const TermsPage = () => (
  <>
    <Helmet>
      <title>Terms of Service | PDFMarkr</title>
      <meta name="description" content="PDFMarkr terms of service. Free to use for personal and commercial purposes." />
    </Helmet>
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Terms of Service</h1>
      <div className="prose-seo">
        <h2>Usage</h2>
        <p>PDFMarkr's tools are free for personal and commercial use. You may use them without registration or payment.</p>
        <h2>No Warranty</h2>
        <p>Tools are provided "as is". While we strive for accuracy, we make no warranty that processing results are error-free for all documents.</p>
        <h2>Your Responsibility</h2>
        <p>You are responsible for the content of documents you process. Do not use PDFMarkr to infringe copyright or distribute unlawful content.</p>
      </div>
    </main>
  </>
);

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
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

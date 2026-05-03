import React, { useState, Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X, Shield, Loader2, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONTENT } from '../content/seo-data';
import { FaqAccordion } from './FaqAccordion';
import { TOOLS } from './Navbar';
import { Logo } from './Logo';
import { GUIDES } from '../content/guides-data';

// Lazy-load each tool — only the tool the user visits gets downloaded
const MergeTool      = lazy(() => import('../tools/MergeTool').then(m => ({ default: m.MergeTool })));
const SplitTool      = lazy(() => import('../tools/SplitTool').then(m => ({ default: m.SplitTool })));
const CompressTool   = lazy(() => import('../tools/CompressTool').then(m => ({ default: m.CompressTool })));
const RotateTool     = lazy(() => import('../tools/RotateTool').then(m => ({ default: m.RotateTool })));
const PdfToWordTool  = lazy(() => import('../tools/PdfToWordTool').then(m => ({ default: m.PdfToWordTool })));
const WordToPdfTool  = lazy(() => import('../tools/WordToPdfTool').then(m => ({ default: m.WordToPdfTool })));
const ExtractTextTool = lazy(() => import('../tools/ExtractTextTool').then(m => ({ default: m.ExtractTextTool })));
const MetadataTool   = lazy(() => import('../tools/MetadataTool').then(m => ({ default: m.MetadataTool })));
const PdfToImagesTool = lazy(() => import('../tools/PdfToImagesTool').then(m => ({ default: m.PdfToImagesTool })));
const WatermarkTool  = lazy(() => import('../tools/WatermarkTool').then(m => ({ default: m.WatermarkTool })));

const ToolSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-brand)' }} />
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Loading tool…</p>
      </div>
    </div>
  }>{children}</Suspense>
);

type ToolType = 'merge'|'split'|'compress'|'pdf-to-word'|'word-to-pdf'|'rotate'|'extract-text'|'metadata'|'pdf-to-images'|'watermark';

const ToolRenderer: React.FC<{ type: ToolType }> = ({ type }) => {
  switch (type) {
    case 'merge':        return <ToolSuspense><MergeTool /></ToolSuspense>;
    case 'split':        return <ToolSuspense><SplitTool /></ToolSuspense>;
    case 'compress':     return <ToolSuspense><CompressTool /></ToolSuspense>;
    case 'rotate':       return <ToolSuspense><RotateTool /></ToolSuspense>;
    case 'pdf-to-word':  return <ToolSuspense><PdfToWordTool /></ToolSuspense>;
    case 'word-to-pdf':  return <ToolSuspense><WordToPdfTool /></ToolSuspense>;
    case 'extract-text': return <ToolSuspense><ExtractTextTool /></ToolSuspense>;
    case 'metadata':     return <ToolSuspense><MetadataTool /></ToolSuspense>;
    case 'pdf-to-images':return <ToolSuspense><PdfToImagesTool /></ToolSuspense>;
    case 'watermark':    return <ToolSuspense><WatermarkTool /></ToolSuspense>;
    default: return null;
  }
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};


export const ToolWorkspace: React.FC<{ type: ToolType }> = ({ type }) => {
  const [sidebarOpen, setSidebar] = useState(false);
  const navigate = useNavigate();

  const seo  = SEO_CONTENT[type];
  const tool = TOOLS.find(t => t.id === type);
  const related = TOOLS.filter(t => t.id !== type).slice(0, 5);
  const toolGuide = GUIDES.find(g => g.toolId === type);

  if (!tool) return null;

  const faqSchema = seo?.faqs ? {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity": seo.faqs.map(f => ({ "@type":"Question", "name":f.question, "acceptedAnswer":{ "@type":"Answer","text":f.answer } }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pdfmarkr.com/" },
      { "@type": "ListItem", "position": 2, "name": tool?.name, "item": `https://pdfmarkr.com${tool?.path}` }
    ]
  };

  const howToSchema = seo?.howTo ? {
    "@context": "https://schema.org", "@type": "HowTo",
    "name": `How to use ${tool?.name}`,
    "description": seo.description,
    "step": seo.howTo.map((s, i) => ({
      "@type": "HowToStep", "name": s.name, "text": s.text,
      "url": `https://pdfmarkr.com${tool?.path}#step-${i+1}`
    }))
  } : null;


  return (
    <div className="flex min-h-screen" style={{ background:'var(--color-page-bg)' }}>
      <Helmet>
        <title>{seo?.title || `${tool?.name} | PDFMarkr`}</title>
        <meta name="description" content={seo?.description || ''} />
        <meta name="keywords" content={seo?.keywords?.join(',') || ''} />
        <link rel="canonical" href={`https://pdfmarkr.com${tool?.path || ''}`} />
        <meta property="og:title" content={seo?.ogTitle || seo?.title} />
        <meta property="og:description" content={seo?.ogDescription || seo?.description} />
        <meta property="og:url" content={`https://pdfmarkr.com${tool?.path || ''}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://pdfmarkr.com/og/${type}.png`} />
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
        {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"SoftwareApplication","name":tool?.name,"applicationCategory":"UtilitiesApplication","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"operatingSystem":"Web Browser" })}</script>
      </Helmet>

      {/* Sidebar */}
      <>
        <AnimatePresence>
          {sidebarOpen && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebar(false)} />}
        </AnimatePresence>
        <aside
          className={`fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto flex flex-col p-5 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ width:256, background:'var(--color-surface)', borderRight:'1.5px solid var(--color-border)', minHeight:'100vh' }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={() => setSidebar(false)}>
              <div className="w-8 h-8 flex items-center justify-center">
                <Logo />
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: '#e11d48' }}>pdf<span style={{ color: '#0f172a' }}>markr</span></span>
            </Link>
            <button className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100" onClick={() => setSidebar(false)}><X size={16} /></button>
          </div>
          <p className="mono-label mb-3">All Tools</p>
          <nav className="space-y-1">
            {TOOLS.map(t => (
              <Link key={t.id} to={t.path} className={`nav-item ${t.id === type ? 'active' : ''}`} onClick={() => setSidebar(false)}>
                <t.icon size={16} />{t.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-6">
            <div className="p-4 rounded-2xl" style={{ background:'#eff6ff', border:'1.5px solid #bfdbfe' }}>
              <div className="flex items-center gap-2 mb-1"><Shield size={14} color="#3b82f6" /><span className="mono-label">Zero-Upload</span></div>
              <p className="text-xs leading-relaxed" style={{ color:'#1d4ed8' }}>Files are processed entirely in your browser RAM. Nothing is sent to any server.</p>
            </div>
          </div>
        </aside>
      </>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-2.5 glass shadow-sm" style={{ borderBottom:'1px solid var(--color-border)' }}>
          <button onClick={() => setSidebar(true)} className="p-2 -ml-2 rounded-xl active:bg-slate-100 transition-colors" aria-label="Open menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="16" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm tracking-tight" style={{ color:'var(--color-text)' }}>{tool?.name}</span>
            {toolGuide && <Link to={`/guides/${toolGuide.slug}`} className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 opacity-70" style={{ color:'var(--color-brand)' }}><BookOpen size={9} /> Guide</Link>}
          </div>
          <button onClick={() => navigate('/')} className="p-2 -mr-2 rounded-xl active:bg-slate-100 transition-colors" aria-label="Go home"><ArrowLeft size={18} /></button>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="hidden lg:flex items-center gap-2 mb-6 text-xs" style={{ color:'var(--color-muted)' }}>
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color:'var(--color-brand)', fontWeight:600 }}>{tool?.name}</span>
          </nav>

          {/* Tool Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0" style={{ background:'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                  {tool && <tool.icon size={28} />}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color:'var(--color-text)' }}>{tool?.name}</h1>
                  <p className="text-sm line-clamp-1" style={{ color:'var(--color-muted)' }}>{seo?.description?.split('.')[0]}.</p>
                </div>
              </div>
              {toolGuide && (
                <Link to={`/guides/${toolGuide.slug}`} className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-blue-50 border border-slate-200" style={{ color: 'var(--color-brand)' }}>
                  <BookOpen size={16} /> How to Use
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {[{icon:'🔒',label:'100% Private'},{icon:'⚡',label:'Instant'},{icon:'∞',label:'Free Forever'}].map(b => (
                <span key={b.label} className="badge-retro" style={{ color:'var(--color-muted)', borderColor:'var(--color-border)' }}>{b.icon} {b.label}</span>
              ))}
            </div>
          </div>

          {/* Workspace Card */}
          <div className="rounded-3xl p-6 sm:p-10 mb-8" style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)', boxShadow:'0 4px 24px rgba(0,0,0,0.04)' }}>
            <ToolRenderer type={type} />
          </div>

          {/* SEO Content */}
          {seo?.content && (
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="prose-seo" dangerouslySetInnerHTML={{ __html: seo.content }} />
              </div>
              <aside className="space-y-6">
                <div className="p-6 rounded-2xl sticky top-24" style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)' }}>
                  <p className="font-bold mb-4" style={{ color:'var(--color-text)' }}>Why PDFMarkr?</p>
                  {[['🔒','No file uploads','Files stay on your device.'],['⚡','Instant results','Processes in browser RAM.'],['♾️','No limits','No file size or daily caps.'],['🌐','Works everywhere','Any device, any browser.']]
                    .map(([icon, title, desc]) => (
                      <div key={title as string} className="flex gap-3 mb-4">
                        <span className="text-xl">{icon}</span>
                        <div><p className="text-sm font-700" style={{ fontWeight:700, color:'var(--color-text)' }}>{title as string}</p><p className="text-xs" style={{ color:'var(--color-muted)' }}>{desc as string}</p></div>
                      </div>
                    ))}
                </div>
                {/* Related tools */}
                <div className="p-6 rounded-2xl mb-6" style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)' }}>
                  <p className="mono-label mb-4">Related Tools</p>
                  <div className="space-y-2">
                    {related.map(t => (
                      <Link key={t.id} to={t.path} className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-blue-50 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:'var(--color-brand-light)' }}><t.icon size={16} color="var(--color-brand)" /></div>
                        <span className="text-sm font-600 group-hover:text-blue-600" style={{ fontWeight:600, color:'var(--color-text)' }}>{t.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Related Guides */}
                {GUIDES.filter(g => g.toolId === type).length > 0 && (
                  <div className="p-6 rounded-2xl" style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)' }}>
                    <p className="mono-label mb-4">Helpful Guides</p>
                    <div className="space-y-3">
                      {GUIDES.filter(g => g.toolId === type).map(g => (
                        <Link key={g.slug} to={`/guides/${g.slug}`} className="block group">
                          <p className="text-sm font-semibold mb-1 group-hover:text-blue-600 transition-colors" style={{ color: 'var(--color-text)' }}>{g.title}</p>
                          <p className="text-xs line-clamp-2" style={{ color: 'var(--color-muted)' }}>{g.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}

          {/* FAQ */}
          {seo?.faqs && seo.faqs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6" style={{ color:'var(--color-text)' }}>Frequently Asked Questions</h2>
              <FaqAccordion faqs={seo.faqs} />
            </section>
          )}

          {/* Strong Interlinking Section */}
          <section className="pt-12 mb-16" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold" style={{ color:'var(--color-text)' }}>Explore More Professional PDF Tools</h2>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Powerful, private, and 100% free browser-based utilities.</p>
              </div>
              <Link to="/" className="text-sm font-bold flex items-center gap-2 hover:text-blue-600" style={{ color: 'var(--color-brand)' }}>
                View All Tools <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {TOOLS.filter(t => t.id !== type).slice(0, 8).map(t => (
                <Link key={t.id} to={t.path} className="p-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg bg-white border border-slate-200 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:bg-blue-50" style={{ background: 'var(--color-brand-light)' }}>
                    <t.icon size={20} color="var(--color-brand)" />
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                  <p className="text-xs line-clamp-1" style={{ color: 'var(--color-muted)' }}>{t.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

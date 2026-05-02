import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, FileStack, Scissors, Minimize2, FileText, FileOutput, RotateCw, Type, Tally4, Image as ImageIcon, Stamp } from 'lucide-react';
import { Logo } from './Logo';

const TOOLS = [
  { id:'merge',        path:'/merge-pdf',       name:'Merge PDF',       icon:FileStack,  cat:'organize' },
  { id:'split',        path:'/split-pdf',        name:'Split PDF',       icon:Scissors,   cat:'organize' },
  { id:'compress',     path:'/compress-pdf',     name:'Compress PDF',    icon:Minimize2,  cat:'organize' },
  { id:'rotate',       path:'/rotate-pdf',       name:'Rotate PDF',      icon:RotateCw,   cat:'organize' },
  { id:'pdf-to-word',  path:'/pdf-to-word',      name:'PDF to Word',     icon:FileText,   cat:'convert'  },
  { id:'word-to-pdf',  path:'/word-to-pdf',      name:'Word to PDF',     icon:FileOutput, cat:'convert'  },
  { id:'extract-text', path:'/extract-text',     name:'Extract Text',    icon:Type,       cat:'convert'  },
  { id:'pdf-to-images',path:'/pdf-to-images',    name:'PDF to Images',   icon:ImageIcon,  cat:'convert'  },
  { id:'metadata',     path:'/metadata-editor',  name:'Metadata Editor', icon:Tally4,     cat:'advanced' },
  { id:'watermark',    path:'/watermark-pdf',    name:'Watermark PDF',   icon:Stamp,      cat:'advanced' },
];

export { TOOLS };

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const loc = useLocation();

  const organize = TOOLS.filter(t => t.cat === 'organize');
  const convert  = TOOLS.filter(t => t.cat === 'convert');
  const advanced = TOOLS.filter(t => t.cat === 'advanced');

  return (
    <header className="glass sticky top-0 z-50" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 focus-ring rounded-lg group">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Logo />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-bold text-2xl tracking-tight leading-none" style={{ color: '#e11d48' }}>pdf<span style={{ color: '#0f172a' }}>markr</span></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-60" style={{ color: '#0f172a' }}>Edit, convert, share. Done.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-600 focus-ring rounded-lg px-2 py-1.5 transition-colors hover:text-blue-600" style={{ color: 'var(--color-muted)', fontWeight: 600 }}>
              PDF Tools <ChevronDown size={14} style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <AnimatePresence>
              {dropOpen && (
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }} transition={{ duration:0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] rounded-2xl p-5 shadow-2xl"
                  style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)' }}>
                  <div className="grid grid-cols-3 gap-5">
                    {[{ label:'Organize', tools:organize }, { label:'Convert', tools:convert }, { label:'Advanced', tools:advanced }].map(({ label, tools }) => (
                      <div key={label}>
                        <p className="mono-label mb-3">{label}</p>
                        <div className="space-y-1">
                          {tools.map(t => (
                            <Link key={t.id} to={t.path} onClick={() => setDropOpen(false)}
                              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-500 transition-colors hover:bg-blue-50 focus-ring"
                              style={{ color: loc.pathname === t.path ? 'var(--color-brand)' : 'var(--color-text)', fontWeight: 500 }}>
                              <t.icon size={15} /> {t.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/about" className="text-sm font-600 focus-ring rounded px-1 transition-colors hover:text-blue-600" style={{ color:'var(--color-muted)', fontWeight:600 }}>About</Link>
          <Link to="/guides" className="text-sm font-600 focus-ring rounded px-1 transition-colors hover:text-blue-600" style={{ color:'var(--color-muted)', fontWeight:600 }}>Guides</Link>
          <Link to="/privacy" className="text-sm font-600 focus-ring rounded px-1 transition-colors hover:text-blue-600" style={{ color:'var(--color-muted)', fontWeight:600 }}>Privacy</Link>
          <Link to="/merge-pdf" className="btn-primary text-sm" style={{ padding:'9px 20px', fontSize:'0.85rem' }}>Get Started</Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 rounded-xl focus-ring" style={{ color:'var(--color-text)' }} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            className="md:hidden overflow-hidden" style={{ background:'var(--color-surface)', borderTop:'1px solid var(--color-border)' }}>
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-6">
              <div>
                <p className="mono-label mb-3">Organize</p>
                <div className="grid grid-cols-2 gap-2">
                  {organize.map(t => <Link key={t.id} to={t.path} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-600 bg-slate-50 hover:bg-blue-50" style={{ color:'var(--color-text)', fontWeight:600 }}><t.icon size={15} />{t.name}</Link>)}
                </div>
              </div>
              <div>
                <p className="mono-label mb-3">Convert</p>
                <div className="grid grid-cols-2 gap-2">
                  {convert.map(t => <Link key={t.id} to={t.path} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-600 bg-slate-50 hover:bg-blue-50" style={{ color:'var(--color-text)', fontWeight:600 }}><t.icon size={15} />{t.name}</Link>)}
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link to="/guides" onClick={() => setMobileOpen(false)} className="text-sm font-600" style={{ color:'var(--color-muted)' }}>Guides</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="text-sm font-600" style={{ color:'var(--color-muted)' }}>About</Link>
                <Link to="/privacy" onClick={() => setMobileOpen(false)} className="text-sm font-600" style={{ color:'var(--color-muted)' }}>Privacy</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

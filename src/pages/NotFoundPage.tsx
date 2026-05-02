import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileStack, Scissors, Minimize2, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => (
  <>
    <Helmet>
      <title>404: Page Not Found | PDFMarkr</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-32 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-8" style={{ background: '#fef2f2', border: '1.5px solid #fecaca' }}>
        <span className="text-4xl">🕳️</span>
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
        Page Not Found
      </h1>
      
      <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
        We can't seem to find the page you're looking for. It might have been moved or deleted. But don't worry, our tools are right here.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 text-left">
        <Link to="/merge-pdf" className="p-5 rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-lg bg-white border border-slate-200">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FileStack size={20} />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-900">Merge PDF</p>
            <p className="text-xs text-slate-500">Combine multiple files</p>
          </div>
        </Link>
        <Link to="/compress-pdf" className="p-5 rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-lg bg-white border border-slate-200">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Minimize2 size={20} />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-900">Compress</p>
            <p className="text-xs text-slate-500">Reduce file size</p>
          </div>
        </Link>
        <Link to="/split-pdf" className="p-5 rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-lg bg-white border border-slate-200">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Scissors size={20} />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-900">Split PDF</p>
            <p className="text-xs text-slate-500">Extract pages</p>
          </div>
        </Link>
      </div>

      <Link to="/" className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-colors hover:bg-slate-100" style={{ color: 'var(--color-text)' }}>
        <ArrowRight size={18} /> Return to Homepage
      </Link>
    </main>
  </>
);

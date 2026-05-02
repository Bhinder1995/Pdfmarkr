import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { GUIDES } from '../content/guides-data';

export const GuidesPage: React.FC = () => (
  <>
    <Helmet>
      <title>PDF Guides & Tutorials — No Sign-Up | PDFMarkr</title>
      <meta name="description" content="Step-by-step PDF guides for compression, splitting, merging, converting, and more. No account needed. Learn to manage documents like a pro — completely free." />
    </Helmet>
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe' }}>
          <BookOpen size={14} color="#3b82f6" />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1d4ed8' }}>Resources</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold mb-6" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
          PDF Mastery <span className="gradient-text">Guides</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
          Step-by-step tutorials to help you master document management without ever uploading a file. Fast, private, and 100% free.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GUIDES.map(guide => (
          <Link key={guide.slug} to={`/guides/${guide.slug}`} className="group flex flex-col rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-2xl" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-brand-light)' }}>
                <BookOpen size={20} color="var(--color-brand)" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                <Clock size={12} /> 5 min read
              </div>
            </div>
            <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors" style={{ color: 'var(--color-text)' }}>{guide.title}</h2>
            <p className="text-sm line-clamp-3 mb-6" style={{ color: 'var(--color-muted)' }}>{guide.description}</p>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--color-brand)' }}>
              Read Guide <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  </>
);

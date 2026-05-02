import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { GUIDES } from '../content/guides-data';
import { TOOLS } from './Navbar';

export const GuideLayout: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = GUIDES.find(g => g.slug === slug);

  if (!guide) {
    return <Navigate to="/" replace />;
  }

  const relatedTool = TOOLS.find(t => t.id === guide.toolId);

  const howToSchema = guide.howToSteps ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.title,
    "description": guide.description,
    "step": guide.howToSteps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": step
    }))
  } : null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-page-bg)' }}>
      <Helmet>
        <title>{guide.title} | PDFMarkr Guides</title>
        <meta name="description" content={guide.description} />
        <meta name="keywords" content={guide.keywords.join(',')} />
        <link rel="canonical" href={`https://pdfmarkr.com/guides/${guide.slug}`} />
        {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <Link to={relatedTool?.path || "/"} className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:text-blue-600 transition-colors" style={{ color: 'var(--color-muted)' }}>
          <ArrowLeft size={16} /> Back to {relatedTool?.name || "Tools"}
        </Link>

        <article className="rounded-3xl p-6 sm:p-12 mb-8" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={18} color="var(--color-brand)" />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>PDF Guide</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            {guide.title}
          </h1>
          
          <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {guide.description}
          </p>

          <div className="prose-seo max-w-none" dangerouslySetInnerHTML={{ __html: guide.content }} />

          {relatedTool && (
            <div className="mt-12 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe' }}>
              <div>
                <p className="font-bold text-lg mb-2" style={{ color: '#1e3a8a' }}>Ready to try it?</p>
                <p className="text-sm" style={{ color: '#1d4ed8' }}>Use our free, private, and local {relatedTool.name} tool right now.</p>
              </div>
              <Link to={relatedTool.path} className="btn-primary shrink-0">
                Open {relatedTool.name} <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};

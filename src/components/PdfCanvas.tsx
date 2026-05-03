import React, { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Loader2, AlertCircle } from 'lucide-react';

const PDFJS_VERSION = '5.7.284';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

interface Props { file: File; scale?: number; className?: string; }

export const PdfCanvas: React.FC<Props> = ({ file, scale = 1.0, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    let renderTask: any = null;
    setStatus('loading');

    (async () => {
      try {
        if (!file || (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf')) {
          setStatus('error'); return;
        }
        const buf = await file.arrayBuffer();
        if (cancelled) return;

        const loadingTask = pdfjs.getDocument({ 
          data: buf,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/cmaps/`,
          cMapPacked: true,
        });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        // Handle high-DPI screens
        const dpr = window.devicePixelRatio || 1;
        const vp = page.getViewport({ scale: scale * dpr });
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        canvas.width = vp.width;
        canvas.height = vp.height;
        
        // CSS display size should be original scale
        const cssVp = page.getViewport({ scale });
        canvas.style.width = `${cssVp.width}px`;
        canvas.style.height = `${cssVp.height}px`;

        renderTask = page.render({ 
          canvasContext: ctx, 
          viewport: vp,
          intent: 'display'
        } as any);
        
        await renderTask.promise;
        if (!cancelled) setStatus('done');
      } catch (err) {
        console.error('PDF Preview Error:', err);
        if (!cancelled) setStatus('error');
      }
    })();

    return () => { 
      cancelled = true; 
      if (renderTask) renderTask.cancel();
    };
  }, [file, scale]);

  return (
    <div className={`relative bg-white overflow-hidden ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 shimmer">
          <Loader2 size={28} className="animate-spin text-brand mb-2" style={{ color: 'var(--color-brand)' }} />
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-2">
          <AlertCircle size={28} />
          <span className="text-xs font-semibold">Preview unavailable</span>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" style={{ display: status === 'done' ? 'block' : 'none' }} />
    </div>
  );
};

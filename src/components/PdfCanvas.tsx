import React, { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Loader2, AlertCircle } from 'lucide-react';

import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

interface Props { file: File; scale?: number; className?: string; }

export const PdfCanvas: React.FC<Props> = ({ file, scale = 1.0, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    (async () => {
      try {
        if (!file || (!file.name.endsWith('.pdf') && file.type !== 'application/pdf')) {
          setStatus('error'); return;
        }
        const buf = await file.arrayBuffer();
        const task = pdfjs.getDocument({ data: buf });
        const pdf  = await task.promise;
        const page = await pdf.getPage(1);
        const vp   = page.getViewport({ scale });
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width  = vp.width;
        canvas.height = vp.height;
        await page.render({ canvasContext: ctx, viewport: vp } as any).promise;
        if (!cancelled) setStatus('done');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => { cancelled = true; };
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

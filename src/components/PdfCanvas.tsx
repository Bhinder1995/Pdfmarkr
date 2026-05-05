import React, { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Loader2, AlertCircle } from 'lucide-react';

// Use local worker for absolute reliability on mobile devices
// Use a more robust worker loading strategy
const PDFJS_VERSION = '3.11.174';
const DEFAULT_WORKER_URL = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.js`;

interface Props { file: File; scale?: number; className?: string; }

export const PdfCanvas: React.FC<Props> = ({ file, scale = 1.0, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    let renderTask: any = null;
    setStatus('loading');

    // Initialize worker once per component lifecycle
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js' || DEFAULT_WORKER_URL;
    }

    (async () => {
      try {
        if (!file) { setStatus('error'); return; }
        
        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) { setStatus('error'); return; }

        let buf: ArrayBuffer;
        try {
          if (file.arrayBuffer) {
            buf = await file.arrayBuffer();
          } else {
            buf = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as ArrayBuffer);
              reader.onerror = reject;
              reader.readAsArrayBuffer(file);
            });
          }
        } catch (e) {
          console.error("Buffer error:", e);
          if (!cancelled) setStatus('error');
          return;
        }

        if (cancelled) return;

        const loadingTask = pdfjs.getDocument({ 
          data: buf,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/cmaps/`,
          cMapPacked: true,
          disableAutoFetch: true,
          disableStream: true,
        });
        
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        // Optimized scale for mobile to prevent memory crashes
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
        
        // Cap total scale to avoid massive canvas areas (iOS limit is often 4096px or 16M pixels)
        let finalScale = scale * dpr;
        const tempVp = page.getViewport({ scale: finalScale });
        if (tempVp.width * tempVp.height > 8000000) { // Cap at 8M pixels for safety
          finalScale = finalScale * Math.sqrt(8000000 / (tempVp.width * tempVp.height));
        }

        const vp = page.getViewport({ scale: finalScale });
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
        if (!ctx) return;

        canvas.width = vp.width;
        canvas.height = vp.height;
        
        // CSS display size
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
        console.error('PDF Preview System Error:', err);
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

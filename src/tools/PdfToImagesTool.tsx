import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield, Image } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';
import { useFiles } from '../context/FileContext';

const dlBlob = (b: Blob, n: string) => { const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = n; a.click(); URL.revokeObjectURL(u); };

type ImgFormat = 'png' | 'jpeg';
type ImgQuality = 'high' | 'medium' | 'low';

const QUALITY_SCALE: Record<ImgQuality, number> = { high: 2.5, medium: 1.5, low: 1 };
const QUALITY_LABELS: Record<ImgQuality, string> = { high: 'High (2x)', medium: 'Medium (1.5x)', low: 'Screen (1x)' };

export const PdfToImagesTool: React.FC = () => {
  const { files, addFiles, removeFile, clearFiles } = useFiles();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const file = files[activeFileIndex] || null;

  const [format, setFormat] = useState<ImgFormat>('png');
  const [quality, setQuality] = useState<ImgQuality>('high');
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{ blob: Blob; name: string; pageNum: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (incoming: File[]) => { addFiles(incoming); setResults([]); setError(null); setProgress(0); };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setResults([]); setProgress(0);
    try {
      const images = await PDFEngine.pdfToImages(file, format, QUALITY_SCALE[quality], (p) => setProgress(p));
      const renamedImages = images.map(img => ({
        ...img,
        name: `pdfmarkr-image-${file.name.replace(/\.pdf$/i, '')}-page${img.pageNum}.${format}`
      }));
      setResults(renamedImages);
    } catch (e: any) { setError(e?.message || 'Conversion failed. Please try another PDF.'); }
    finally { setProcessing(false); }
  };

  const reset = () => { clearFiles(); setResults([]); setError(null); setProgress(0); };
  const downloadAll = () => results.forEach(r => dlBlob(r.blob, r.name));

  if (results.length > 0) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <div className="flex items-center gap-3">
          <CheckCircle2 color="#10b981" size={24} />
          <div>
            <p className="font-bold text-sm" style={{ color: '#065f46' }}>Conversion Complete!</p>
            <p className="text-xs" style={{ color: '#047857' }}>{results.length} image{results.length > 1 ? 's' : ''} ready · {format.toUpperCase()} · {QUALITY_LABELS[quality]}</p>
          </div>
        </div>
        {results.length > 1 && (
          <button onClick={downloadAll} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            <Download size={14} /> Download All
          </button>
        )}
      </div>

      {/* Image grid preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[480px] overflow-y-auto pr-1">
        {results.map((r) => (
          <motion.div key={r.pageNum} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="group relative flex flex-col">
            <div className="rounded-2xl overflow-hidden border" style={{ aspectRatio: '3/4', borderColor: 'var(--color-border)', background: '#f8fafc' }}>
              <img src={URL.createObjectURL(r.blob)} alt={`Page ${r.pageNum}`} className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-colors" />
            </div>
            <div className="mt-2 flex items-center justify-between px-0.5">
              <span className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>Page {r.pageNum}</span>
              <button onClick={() => dlBlob(r.blob, r.name)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors">
                <Download size={13} color="var(--color-brand)" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button onClick={reset} className="btn-ghost w-full justify-center">Convert Another PDF</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".pdf" label="Drop your PDF here to convert to images" />
      ) : (
        <>
          {/* File info */}
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <div className="rounded-xl overflow-hidden shrink-0" style={{ width: 64, aspectRatio: '3/4', border: '1px solid var(--color-border)' }}>
              <PdfCanvas file={file} scale={0.3} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate" style={{ color: 'var(--color-text)' }}>{file.name}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{(file.size / 1024).toFixed(1)} KB</p>
              {files.length > 1 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {files.map((f, idx) => (
                    <button key={idx} onClick={() => setActiveFileIndex(idx)} 
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${idx === activeFileIndex ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200'}`}>
                      File {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => removeFile(activeFileIndex)} className="p-2 rounded-xl hover:bg-red-50 transition-colors"><X size={16} color="#ef4444" /></button>
          </div>

          {/* Options */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Format */}
            <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Image Format</p>
              <div className="grid grid-cols-2 gap-2">
                {(['png', 'jpeg'] as ImgFormat[]).map(f => (
                  <button key={f} onClick={() => setFormat(f)} className="py-3 rounded-xl font-bold text-sm transition-all"
                    style={{ border: '1.5px solid', borderColor: format === f ? 'var(--color-brand)' : 'var(--color-border)', background: format === f ? 'var(--color-brand-light)' : 'var(--color-surface)', color: format === f ? 'var(--color-brand)' : 'var(--color-muted)' }}>
                    {f.toUpperCase()}
                    <span className="block text-xs font-normal mt-0.5" style={{ opacity: 0.7 }}>
                      {f === 'png' ? 'Lossless' : 'Smaller size'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Image Resolution</p>
              <div className="space-y-2">
                {(Object.entries(QUALITY_LABELS) as [ImgQuality, string][]).map(([q, label]) => (
                  <button key={q} onClick={() => setQuality(q)} className="w-full py-2.5 px-4 rounded-xl text-left text-sm font-semibold transition-all"
                    style={{ border: '1.5px solid', borderColor: quality === q ? 'var(--color-brand)' : 'var(--color-border)', background: quality === q ? 'var(--color-brand-light)' : 'var(--color-surface)', color: quality === q ? 'var(--color-brand)' : 'var(--color-text)' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {processing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-muted)' }}>
                <span>Converting pages…</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: 'var(--color-border)' }}>
                <motion.div className="h-2 rounded-full" style={{ background: 'linear-gradient(90deg,#3b82f6,#6366f1)' }}
                  animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Shield size={15} color="#3b82f6" />
            <span className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>Files processed locally — never uploaded to any server</span>
          </div>

          {error && <div className="p-4 rounded-xl text-sm" style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>{error}</div>}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={reset} className="btn-ghost"><X size={14} /> Clear</button>
            <button onClick={process} disabled={processing} className="btn-primary flex-1 justify-center">
              {processing ? <><Loader2 size={18} className="animate-spin" /> Converting… {progress}%</> : <><Image size={18} /> Convert to Images</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

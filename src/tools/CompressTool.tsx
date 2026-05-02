import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';

const dlBlob = (b: Blob, n: string) => { const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = n; a.click(); URL.revokeObjectURL(u); };

export const CompressTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<'standard' | 'maximum'>('standard');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string; savedKB: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (files: File[]) => { setFile(files[0]); setResult(null); setError(null); };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setResult(null);
    try {
      const { data, savedKB } = await PDFEngine.compress(file, level);
      setResult({ blob: new Blob([data], { type: 'application/pdf' }), name: `pdfmarkr-compressed-${file.name}`, savedKB });
    } catch (e: any) { setError(e?.message || 'Compression failed.'); } finally { setProcessing(false); }
  };

  const reset = () => { setFile(null); setResult(null); setError(null); };

  if (result) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="p-5 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 color="#10b981" size={24} />
          <p className="font-bold" style={{ color: '#065f46' }}>Compression Complete!</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.7)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#047857' }}>Original</p>
            <p className="font-bold text-lg" style={{ color: '#065f46' }}>{(file!.size / 1024).toFixed(0)} KB</p>
          </div>
          <div className="p-3 rounded-xl flex items-center justify-center">
            <span className="text-2xl">→</span>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.7)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#047857' }}>Compressed</p>
            <p className="font-bold text-lg" style={{ color: '#065f46' }}>{(result.blob.size / 1024).toFixed(0)} KB</p>
          </div>
        </div>
        {result.savedKB > 0 && (
          <p className="text-center text-sm font-bold mt-3" style={{ color: '#047857' }}>
            ✅ Saved {result.savedKB} KB ({Math.round(result.savedKB / (file!.size / 1024) * 100)}% reduction)
          </p>
        )}
      </div>
      <div className="p-5 rounded-2xl flex items-center gap-4" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
        <div className="flex-1 min-w-0">
          <p className="font-bold truncate" style={{ color: 'var(--color-text)' }}>{result.name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{(result.blob.size / 1024).toFixed(1)} KB</p>
        </div>
        <button onClick={() => dlBlob(result.blob, result.name)} className="btn-primary" style={{ padding: '10px 20px' }}>
          <Download size={16} /> Download
        </button>
      </div>
      <button onClick={reset} className="btn-ghost w-full justify-center">Compress Another File</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".pdf" label="Drop your PDF here to compress" />
      ) : (
        <>
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <div className="rounded-xl overflow-hidden shrink-0" style={{ width: 64, aspectRatio: '3/4', border: '1px solid var(--color-border)' }}>
              <PdfCanvas file={file} scale={0.3} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate" style={{ color: 'var(--color-text)' }}>{file.name}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={() => setFile(null)} className="p-2 rounded-xl hover:bg-red-50 transition-colors"><X size={16} color="#ef4444" /></button>
          </div>

          <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Compression Profile</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <button onClick={() => setLevel('standard')} className="p-4 rounded-xl text-left transition-all"
                style={{ border: '1.5px solid', borderColor: level === 'standard' ? 'var(--color-brand)' : 'var(--color-border)', background: level === 'standard' ? 'var(--color-brand-light)' : 'var(--color-surface)' }}>
                <p className="font-bold text-sm" style={{ color: level === 'standard' ? 'var(--color-brand)' : 'var(--color-text)' }}>⚡ Standard</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Lossless structure compression. Reduces file size without affecting content.</p>
              </button>
              <button onClick={() => setLevel('maximum')} className="p-4 rounded-xl text-left transition-all"
                style={{ border: '1.5px solid', borderColor: level === 'maximum' ? 'var(--color-brand)' : 'var(--color-border)', background: level === 'maximum' ? 'var(--color-brand-light)' : 'var(--color-surface)' }}>
                <p className="font-bold text-sm flex items-center gap-1.5" style={{ color: level === 'maximum' ? 'var(--color-brand)' : 'var(--color-text)' }}>🔒 Maximum Privacy</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Compresses and strips all hidden metadata (author, creator, keywords).</p>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Shield size={15} color="#3b82f6" />
            <span className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>Files processed locally — never uploaded</span>
          </div>

          {error && <div className="p-4 rounded-xl text-sm" style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>{error}</div>}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={reset} className="btn-ghost"><X size={14} /> Clear</button>
            <button onClick={process} disabled={processing} className="btn-primary flex-1 justify-center">
              {processing ? <><Loader2 size={18} className="animate-spin" /> Compressing…</> : <><Zap size={18} /> Compress PDF</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

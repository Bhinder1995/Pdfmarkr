import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield, FileOutput } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PDFEngine } from '../services/pdfEngine';
import { useFiles } from '../context/FileContext';

type Result = { blob: Blob; name: string };

const dlBlob = (b: Blob, n: string) => {
  const u = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.href = u; a.download = n; a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(u);
  }, 2000);
};

export const WordToPdfTool: React.FC = () => {
  const { files, addFiles, removeFile, clearFiles } = useFiles();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const file = files[activeFileIndex] || null;

  const [watermark, setWatermark] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (incoming: File[]) => { addFiles(incoming); setResult(null); setError(null); };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setResult(null);
    try {
      const data = await PDFEngine.wordToPdf(file, watermark || undefined);
      setResult({ blob: new Blob([data], { type: 'application/pdf' }), name: `pdfmarkr-word-to-pdf-${file.name.replace(/\.(doc|docx)$/i, '')}.pdf` });
    } catch (e: any) { setError(e?.message || 'Conversion failed.'); } finally { setProcessing(false); }
  };

  const reset = () => { clearFiles(); setResult(null); setError(null); setWatermark(''); };

  if (result) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <CheckCircle2 color="#10b981" size={24} />
        <div>
          <p className="font-bold text-sm" style={{ color: '#065f46' }}>Conversion Complete!</p>
          <p className="text-xs" style={{ color: '#047857' }}>Your PDF is ready to download{watermark ? ` (with "${watermark.toUpperCase()}" watermark)` : ''}</p>
        </div>
      </div>
      <div className="p-5 rounded-2xl flex items-center gap-4" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl">📄</div>
        <div className="flex-1 min-w-0">
          <p className="font-bold truncate" style={{ color: 'var(--color-text)' }}>{result.name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>PDF Document · {(result.blob.size / 1024).toFixed(1)} KB</p>
        </div>
        <button onClick={() => dlBlob(result.blob, result.name)} className="btn-primary" style={{ padding: '10px 20px' }}>
          <Download size={16} /> Download
        </button>
      </div>
      <button onClick={reset} className="btn-ghost w-full justify-center">Convert Another File</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".doc,.docx" label="Drop your Word document here (.doc or .docx)" />
      ) : (
        <>
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-600 text-white shrink-0">
              <FileOutput size={24} />
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

          {/* Watermark option */}
          <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Watermark (Optional)</p>
              {watermark && <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: 'var(--color-brand-light)', color: 'var(--color-brand)' }}>Active</span>}
            </div>
            <input className="w-full rounded-xl px-4 py-3 text-sm"
              style={{ border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
              placeholder="e.g. CONFIDENTIAL, DRAFT, DO NOT COPY"
              value={watermark} onChange={e => setWatermark(e.target.value)} />
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              This text will be stamped diagonally in light gray across every page of the PDF.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Shield size={15} color="#3b82f6" />
            <span className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>Files processed locally — never uploaded</span>
          </div>

          {error && <div className="p-4 rounded-xl text-sm" style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>{error}</div>}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={reset} className="btn-ghost"><X size={14} /> Clear</button>
            <button onClick={process} disabled={processing} className="btn-primary flex-1 justify-center">
              {processing ? <><Loader2 size={18} className="animate-spin" /> Converting…</> : <><Zap size={18} /> Convert to PDF</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

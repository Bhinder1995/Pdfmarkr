import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';

const dlBlob = (b: Blob, n: string) => { const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = n; a.click(); URL.revokeObjectURL(u); };

export const PdfToWordTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (files: File[]) => { setFile(files[0]); setResult(null); setError(null); };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setResult(null);
    try {
      const blob = await PDFEngine.pdfToWord(file);
      setResult({ blob, name: `${file.name.replace(/\.pdf$/i, '')}.docx` });
    } catch (e: any) { setError(e?.message || 'Conversion failed.'); } finally { setProcessing(false); }
  };

  const reset = () => { setFile(null); setResult(null); setError(null); };

  if (result) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <CheckCircle2 color="#10b981" size={24} />
        <div>
          <p className="font-bold text-sm" style={{ color: '#065f46' }}>Conversion Complete!</p>
          <p className="text-xs" style={{ color: '#047857' }}>Your Word document is ready to download</p>
        </div>
      </div>
      <div className="p-5 rounded-2xl flex items-center gap-4" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl">📝</div>
        <div className="flex-1 min-w-0">
          <p className="font-bold truncate" style={{ color: 'var(--color-text)' }}>{result.name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>Word Document (.docx) · {(result.blob.size / 1024).toFixed(1)} KB</p>
        </div>
        <button onClick={() => dlBlob(result.blob, result.name)} className="btn-primary" style={{ padding: '10px 20px' }}>
          <Download size={16} /> Download
        </button>
      </div>
      <div className="p-4 rounded-xl text-xs" style={{ background: '#fefce8', border: '1px solid #fde68a', color: '#92400e' }}>
        💡 <strong>Tip:</strong> Text extraction quality depends on whether the PDF contains selectable text. Scanned image-based PDFs may produce limited results.
      </div>
      <button onClick={reset} className="btn-ghost w-full justify-center">Convert Another File</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".pdf" label="Drop your PDF here to convert to Word" />
      ) : (
        <>
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <div className="rounded-xl overflow-hidden shrink-0" style={{ width: 64, aspectRatio: '3/4', border: '1px solid var(--color-border)' }}>
              <PdfCanvas file={file} scale={0.3} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate" style={{ color: 'var(--color-text)' }}>{file.name}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{(file.size / 1024).toFixed(1)} KB · PDF</p>
            </div>
            <button onClick={() => setFile(null)} className="p-2 rounded-xl hover:bg-red-50 transition-colors"><X size={16} color="#ef4444" /></button>
          </div>

          <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>What gets extracted</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: '📄', label: 'Full text content', desc: 'All readable text from every page' },
                { icon: '📑', label: 'Page structure', desc: 'Page breaks preserved as headings' },
                { icon: '🔤', label: 'Formatted .docx', desc: 'Standard Word format, editable' },
                { icon: '⚡', label: 'Instant conversion', desc: 'No server — runs in your browser' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
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
              {processing ? <><Loader2 size={18} className="animate-spin" /> Converting…</> : <><Zap size={18} /> Convert to Word</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

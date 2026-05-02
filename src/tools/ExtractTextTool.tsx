import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield, Copy } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';

const dlBlob = (b: Blob, n: string) => { const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = n; a.click(); URL.revokeObjectURL(u); };

export const ExtractTextTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (files: File[]) => { setFile(files[0]); setText(null); setError(null); };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setText(null);
    try {
      const extracted = await PDFEngine.extractText(file);
      setText(extracted);
    } catch (e: any) { setError(e?.message || 'Text extraction failed.'); } finally { setProcessing(false); }
  };

  const copyText = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!text || !file) return;
    dlBlob(new Blob([text], { type: 'text/plain' }), `${file.name}.txt`);
  };

  const reset = () => { setFile(null); setText(null); setError(null); };

  const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const charCount = text ? text.length : 0;

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".pdf" label="Drop your PDF here to extract text" />
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

          {text ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 color="#10b981" size={20} />
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#065f46' }}>Extraction Complete</p>
                    <p className="text-xs" style={{ color: '#047857' }}>{wordCount.toLocaleString()} words · {charCount.toLocaleString()} characters</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyText} className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                    style={{ background: copied ? '#d1fae5' : '#eff6ff', color: copied ? '#065f46' : '#1d4ed8' }}>
                    <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button onClick={downloadTxt} className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                    style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                    <Download size={13} /> .txt
                  </button>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid var(--color-border)' }}>
                <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                  <span className="text-xs font-bold" style={{ color: 'var(--color-muted)' }}>Extracted Text</span>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{wordCount} words</span>
                </div>
                <textarea readOnly value={text}
                  className="w-full h-72 p-4 text-sm font-mono resize-none"
                  style={{ background: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none' }} />
              </div>

              <button onClick={reset} className="btn-ghost w-full justify-center">Extract From Another File</button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <Shield size={15} color="#3b82f6" />
                <span className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>Files processed locally — never uploaded</span>
              </div>

              {error && <div className="p-4 rounded-xl text-sm" style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>{error}</div>}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button onClick={reset} className="btn-ghost"><X size={14} /> Clear</button>
                <button onClick={process} disabled={processing} className="btn-primary flex-1 justify-center">
                  {processing ? <><Loader2 size={18} className="animate-spin" /> Extracting…</> : <><Zap size={18} /> Extract Text</>}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Plus, X, Shield, ArrowUp, ArrowDown, Loader2, Zap, CheckCircle2, Download } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';
import { useFiles } from '../context/FileContext';

interface Result { blob: Blob; name: string; }

const dlBlob = (b: Blob, name: string) => {
  const u = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.href = u; a.download = name; a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(u);
  }, 2000);
};

export const MergeTool: React.FC = () => {
  const { files, addFiles, removeFile, moveFile, clearFiles } = useFiles();
  const [insertBlank, setInsertBlank] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<File | null>(null);

  const reset = () => { clearFiles(); setResult(null); setError(null); };

  const process = async () => {
    if (files.length < 2) { setError('Please add at least 2 PDF files to merge.'); return; }
    setProcessing(true); setError(null); setResult(null);
    try {
      const data = await PDFEngine.merge(files.map(f => ({ file: f })), insertBlank);
      setResult({ blob: new Blob([data], { type: 'application/pdf' }), name: 'pdfmarkr-merged.pdf' });
    } catch (e: any) {
      setError(e?.message || 'Merge failed. Please check your PDF files.');
    } finally { setProcessing(false); }
  };



  if (result) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <CheckCircle2 color="#10b981" size={24} />
        <div>
          <p className="font-bold text-sm" style={{ color: '#065f46' }}>Merge Complete!</p>
          <p className="text-xs" style={{ color: '#047857' }}>{files.length} PDFs merged into one file ({(result.blob.size / 1024).toFixed(0)} KB)</p>
        </div>
      </div>
      <div className="p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-brand-light)' }}>
          <Download size={22} color="var(--color-brand)" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold" style={{ color: 'var(--color-text)' }}>{result.name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{(result.blob.size / 1024).toFixed(1)} KB</p>
        </div>
        <button onClick={() => dlBlob(result.blob, result.name)} className="btn-primary w-full sm:w-auto justify-center" style={{ padding: '10px 20px' }}>
          <Download size={16} /> Download
        </button>
      </div>
      <button onClick={reset} className="btn-ghost w-full justify-center">Merge More Files</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {files.length === 0 ? (
        <DropZone onFiles={addFiles} multiple accept=".pdf" label="Drop PDF files here to merge" />
      ) : (
        <>
          {/* File grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((f, i) => (
              <motion.div key={`${f.name}-${i}`} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="relative group flex flex-col">
                <div className="rounded-2xl overflow-hidden border cursor-pointer relative"
                  style={{ borderColor: 'var(--color-border)', aspectRatio: '3/4' }}
                  onClick={() => setPreview(f)}>
                  <PdfCanvas file={f} scale={0.5} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 rounded-full px-3 py-1 text-xs font-bold">Preview</span>
                  </div>
                  <span className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-lg flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div className="mt-2 px-0.5">
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-muted)' }}>{f.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>{(f.size / 1024).toFixed(0)} KB</p>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <button onClick={() => moveFile(i, -1)} disabled={i === 0}
                    className="flex-1 h-7 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                    <ArrowUp size={12} />
                  </button>
                  <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1}
                    className="flex-1 h-7 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                    <ArrowDown size={12} />
                  </button>
                  <button onClick={() => removeFile(i)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50">
                    <X size={12} color="#ef4444" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add more button */}
            <label className="flex flex-col items-center justify-center gap-2 rounded-2xl cursor-pointer border-dashed border-2 transition-all hover:border-blue-400 hover:bg-blue-50"
              style={{ aspectRatio: '3/4', borderColor: 'var(--color-border)' }}>
              <Plus size={22} color="var(--color-muted)" />
              <span className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>Add PDF</span>
              <input type="file" accept=".pdf" multiple className="hidden"
                onChange={e => e.target.files && addFiles(Array.from(e.target.files))} />
            </label>
          </div>

          {/* Options */}
          <div className="p-5 rounded-2xl flex items-center gap-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <input type="checkbox" id="blank-pages" checked={insertBlank} onChange={e => setInsertBlank(e.target.checked)}
              className="w-5 h-5 rounded accent-blue-600" />
            <label htmlFor="blank-pages" className="text-sm font-semibold cursor-pointer" style={{ color: 'var(--color-text)' }}>
              Insert blank separator page between each merged file
            </label>
          </div>

          {/* Privacy badge */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Shield size={15} color="#3b82f6" />
            <span className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>Files are processed locally — never uploaded to any server</span>
          </div>

          {error && (
            <div className="p-4 rounded-xl text-sm" style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={reset} className="btn-ghost">
              <X size={14} /> Clear All
            </button>
            <button onClick={process} disabled={processing} className="btn-primary flex-1 justify-center">
              {processing ? <><Loader2 size={18} className="animate-spin" /> Merging…</> : <><Zap size={18} /> Merge {files.length} PDFs</>}
            </button>
          </div>
        </>
      )}

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setPreview(null)}>
          <div className="rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col"
            style={{ background: 'var(--color-surface)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="font-bold truncate" style={{ color: 'var(--color-text)' }}>{preview.name}</span>
              <button onClick={() => setPreview(null)} className="p-2 rounded-xl hover:bg-slate-100"><X size={18} /></button>
            </div>
            <div className="overflow-auto flex-1 p-4 sm:p-6 bg-slate-100 flex items-start justify-center">
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl w-full" style={{ maxWidth: 600 }}>
                <PdfCanvas file={preview} scale={1.5} className="w-full h-auto" />
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end" style={{ borderTop: '1px solid var(--color-border)' }}>
              <button onClick={() => setPreview(null)} className="btn-ghost">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

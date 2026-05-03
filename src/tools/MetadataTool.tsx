import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield, Eye } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';
import { useFiles } from '../context/FileContext';

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

type MetaFields = { title: string; author: string; subject: string; keywords: string; creator: string };

const FIELDS: { key: keyof MetaFields; label: string; placeholder: string }[] = [
  { key: 'title', label: 'Title', placeholder: 'Document title' },
  { key: 'author', label: 'Author', placeholder: 'Author name or organization' },
  { key: 'subject', label: 'Subject', placeholder: 'Document subject or description' },
  { key: 'keywords', label: 'Keywords', placeholder: 'comma, separated, keywords' },
  { key: 'creator', label: 'Creator App', placeholder: 'Application that created this PDF' },
];

export const MetadataTool: React.FC = () => {
  const { files, addFiles, removeFile, clearFiles } = useFiles();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const file = files[activeFileIndex] || null;
  const [meta, setMeta] = useState<MetaFields>({ title: '', author: '', subject: '', keywords: '', creator: '' });
  const [currentMeta, setCurrentMeta] = useState<Partial<MetaFields>>({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = async (incoming: File[]) => {
    addFiles(incoming); setResult(null); setError(null);
    const f = incoming[0];
    try {
      const info = await PDFEngine.getInfo(f);
      const existing: Partial<MetaFields> = {};
      if (info.title) existing.title = info.title;
      if (info.author) existing.author = info.author;
      if (info.subject) existing.subject = info.subject;
      if (info.keywords) existing.keywords = info.keywords;
      if (info.creator) existing.creator = info.creator;
      setCurrentMeta(existing);
      setMeta({ title: info.title || '', author: info.author || '', subject: info.subject || '', keywords: info.keywords || '', creator: info.creator || '' });
    } catch { setCurrentMeta({}); }
  };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setResult(null);
    try {
      const data = await PDFEngine.editMetadata(file, meta);
      setResult({ blob: new Blob([data], { type: 'application/pdf' }), name: `pdfmarkr-metadata-${file.name}` });
    } catch (e: any) { setError(e?.message || 'Metadata update failed.'); } finally { setProcessing(false); }
  };

  const clearAll = () => setMeta({ title: '', author: '', subject: '', keywords: '', creator: '' });

  const reset = () => { clearFiles(); setResult(null); setError(null); setMeta({ title: '', author: '', subject: '', keywords: '', creator: '' }); setCurrentMeta({}); };

  const hasCurrentMeta = Object.values(currentMeta).some(Boolean);

  if (result) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <CheckCircle2 color="#10b981" size={24} />
        <div>
          <p className="font-bold text-sm" style={{ color: '#065f46' }}>Metadata Updated!</p>
          <p className="text-xs" style={{ color: '#047857' }}>Your PDF properties have been saved</p>
        </div>
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
      <button onClick={reset} className="btn-ghost w-full justify-center">Edit Another File</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".pdf" label="Drop your PDF here to view and edit metadata" />
      ) : (
        <>
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
              {hasCurrentMeta && (
                <button onClick={() => setShowCurrent(!showCurrent)} className="flex items-center gap-1 mt-1.5 text-xs font-semibold" style={{ color: 'var(--color-brand)' }}>
                  <Eye size={11} /> {showCurrent ? 'Hide' : 'View'} current metadata
                </button>
              )}
            </div>
            <button onClick={() => removeFile(activeFileIndex)} className="p-2 rounded-xl hover:bg-red-50 transition-colors"><X size={16} color="#ef4444" /></button>
          </div>

          {showCurrent && hasCurrentMeta && (
            <div className="p-4 rounded-2xl space-y-2" style={{ background: '#fefce8', border: '1px solid #fde68a' }}>
              <p className="text-xs font-bold" style={{ color: '#92400e' }}>Current metadata in this file:</p>
              {Object.entries(currentMeta).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex gap-2 text-xs">
                  <span className="font-bold capitalize shrink-0" style={{ color: '#92400e', minWidth: 64 }}>{k}:</span>
                  <span style={{ color: '#78350f' }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          <div className="p-5 rounded-2xl space-y-4" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Edit PDF Properties</p>
              <button onClick={clearAll} className="w-full sm:w-auto text-[10px] sm:text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5" style={{ background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3' }}>
                <Shield size={12} /> Clear All (Anonymize)
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FIELDS.map(f => (
                <div key={f.key} className={f.key === 'subject' || f.key === 'keywords' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>{f.label}</label>
                  <input className="w-full rounded-xl px-4 py-3 text-sm focus-ring"
                    style={{ border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
                    placeholder={f.placeholder} value={meta[f.key]} onChange={e => setMeta(m => ({ ...m, [f.key]: e.target.value }))} />
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
              {processing ? <><Loader2 size={18} className="animate-spin" /> Saving…</> : <><Zap size={18} /> Save Metadata</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

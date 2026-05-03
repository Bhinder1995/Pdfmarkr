import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield, Scissors } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';
import { useFiles } from '../context/FileContext';

import JSZip from 'jszip';

interface Result { blob: Blob; name: string; }
const dlBlob = (b: Blob, n: string) => {
  const u = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.href = u; a.download = n; a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(u); }, 2000);
};

const dlZip = async (results: Result[], baseName: string) => {
  const zip = new JSZip();
  results.forEach(r => zip.file(r.name, r.blob));
  const content = await zip.generateAsync({ type: 'blob' });
  dlBlob(content, `${baseName}-all-pages.zip`);
};
type SplitMode = 'all' | 'odd' | 'even' | 'range';

export const SplitTool: React.FC = () => {
  const { files, addFiles, removeFile, clearFiles } = useFiles();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const file = files[activeFileIndex] || null;
  
  const [mode, setMode] = useState<SplitMode>('all');
  const [range, setRange] = useState('');
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (incoming: File[]) => { addFiles(incoming); setResults([]); setError(null); };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setResults([]);
    try {
      if (mode === 'all') {
        const pages = await PDFEngine.split(file);
        setResults(pages.map(p => ({ blob: new Blob([p.data], { type: 'application/pdf' }), name: `pdfmarkr-split-${p.name}` })));
      } else {
        const rangeStr = mode === 'range' ? range : mode;
        const data = await PDFEngine.extractRange(file, rangeStr);
        setResults([{ blob: new Blob([data], { type: 'application/pdf' }), name: `pdfmarkr-split-${mode}-pages-${file.name}` }]);
      }
    } catch (e: any) { setError(e?.message || 'Split failed.'); } finally { setProcessing(false); }
  };

  const reset = () => { clearFiles(); setResults([]); setError(null); setRange(''); setMode('all'); };

  if (results.length > 0) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center justify-between gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <div className="flex items-center gap-3">
          <CheckCircle2 color="#10b981" size={24} />
          <div>
            <p className="font-bold text-sm" style={{ color: '#065f46' }}>Split Complete!</p>
            <p className="text-xs" style={{ color: '#047857' }}>{results.length} file{results.length > 1 ? 's' : ''} ready</p>
          </div>
        </div>
        {results.length > 1 && (
          <button onClick={() => dlZip(results, file?.name.replace(/\.pdf$/i, '') || 'split')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            <Download size={14} /> Download ZIP
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
        {results.map((r, i) => (
          <div key={i} className="p-4 rounded-2xl flex items-center gap-3" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-brand-light)' }}>
              <Scissors size={16} color="var(--color-brand)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: 'var(--color-text)' }}>{r.name}</p>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{(r.blob.size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={() => dlBlob(r.blob, r.name)} className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors">
              <Download size={15} color="var(--color-brand)" />
            </button>
          </div>
        ))}
      </div>
      <button onClick={reset} className="btn-ghost w-full justify-center">Split Another File</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".pdf" label="Drop your PDF here to split" />
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
            </div>
            <button onClick={() => removeFile(activeFileIndex)} className="p-2 rounded-xl hover:bg-red-50 transition-colors"><X size={16} color="#ef4444" /></button>
          </div>

          <div className="p-5 rounded-2xl space-y-4" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Split Mode</p>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2">
              {([
                { value: 'all' as SplitMode, label: 'All Pages', desc: 'One file per page' },
                { value: 'odd' as SplitMode, label: 'Odd Pages', desc: 'Pages 1, 3, 5…' },
                { value: 'even' as SplitMode, label: 'Even Pages', desc: 'Pages 2, 4, 6…' },
                { value: 'range' as SplitMode, label: 'Custom Range', desc: 'e.g. 1, 3-5, 8' },
              ]).map(opt => (
                <button key={opt.value} onClick={() => setMode(opt.value)} className="p-3 rounded-xl text-left transition-all"
                  style={{ border: '1.5px solid', borderColor: mode === opt.value ? 'var(--color-brand)' : 'var(--color-border)', background: mode === opt.value ? 'var(--color-brand-light)' : 'var(--color-surface)' }}>
                  <p className="font-bold text-xs" style={{ color: mode === opt.value ? 'var(--color-brand)' : 'var(--color-text)' }}>{opt.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{opt.desc}</p>
                </button>
              ))}
            </div>
            {mode === 'range' && (
              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>Page Range</label>
                <input className="w-full rounded-xl px-4 py-3 text-sm"
                  style={{ border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
                  placeholder="e.g. 1, 3-5, 8, 10-12" value={range} onChange={e => setRange(e.target.value)} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Shield size={15} color="#3b82f6" />
            <span className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>Files processed locally — never uploaded</span>
          </div>

          {error && <div className="p-4 rounded-xl text-sm" style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>{error}</div>}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={reset} className="btn-ghost"><X size={14} /> Clear</button>
            <button onClick={process} disabled={processing || (mode === 'range' && !range.trim())} className="btn-primary flex-1 justify-center">
              {processing ? <><Loader2 size={18} className="animate-spin" /> Splitting…</> : <><Zap size={18} /> Split PDF</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

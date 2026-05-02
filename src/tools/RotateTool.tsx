import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { PdfCanvas } from '../components/PdfCanvas';
import { PDFEngine } from '../services/pdfEngine';
import { useFiles } from '../context/FileContext';

const dlBlob = (b: Blob, n: string) => { const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = n; a.click(); URL.revokeObjectURL(u); };

export const RotateTool: React.FC = () => {
  const { files, addFiles, removeFile, clearFiles } = useFiles();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const file = files[activeFileIndex] || null;

  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [target, setTarget] = useState<'all' | 'odd' | 'even'>('all');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (incoming: File[]) => { addFiles(incoming); setResult(null); setError(null); };

  const process = async () => {
    if (!file) return;
    setProcessing(true); setError(null); setResult(null);
    try {
      const data = await PDFEngine.rotate(file, angle, target);
      setResult({ blob: new Blob([data], { type: 'application/pdf' }), name: `pdfmarkr-rotated-${file.name}` });
    } catch (e: any) { setError(e?.message || 'Rotation failed.'); } finally { setProcessing(false); }
  };

  const reset = () => { clearFiles(); setResult(null); setError(null); };

  const previewRotation = target !== 'even' ? angle : 0;

  if (result) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <CheckCircle2 color="#10b981" size={24} />
        <div>
          <p className="font-bold text-sm" style={{ color: '#065f46' }}>Rotation Complete!</p>
          <p className="text-xs" style={{ color: '#047857' }}>Rotated {target} pages by {angle}°</p>
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
      <button onClick={reset} className="btn-ghost w-full justify-center">Rotate Another File</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={true} accept=".pdf" label="Drop your PDF here to rotate" />
      ) : (
        <>
          {/* Preview with live rotation */}
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <div className="rounded-xl overflow-hidden shrink-0" style={{ width: 64, aspectRatio: '3/4', border: '1px solid var(--color-border)', transform: `rotate(${previewRotation}deg)`, transition: 'transform 0.3s ease' }}>
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

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Target pages */}
            <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Target Pages</p>
              {(['all', 'odd', 'even'] as const).map(t => (
                <button key={t} onClick={() => setTarget(t)} className="w-full py-2.5 px-4 rounded-xl text-left text-sm font-semibold transition-all"
                  style={{ border: '1.5px solid', borderColor: target === t ? 'var(--color-brand)' : 'var(--color-border)', background: target === t ? 'var(--color-brand-light)' : 'var(--color-surface)', color: target === t ? 'var(--color-brand)' : 'var(--color-text)' }}>
                  {t === 'all' ? 'All Pages' : t === 'odd' ? 'Odd Pages (1, 3, 5…)' : 'Even Pages (2, 4, 6…)'}
                </button>
              ))}
            </div>

            {/* Rotation angle */}
            <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Rotation Angle</p>
              <div className="grid grid-cols-3 gap-2">
                {([90, 180, 270] as const).map(a => (
                  <button key={a} onClick={() => setAngle(a)} className="py-3 rounded-xl font-bold text-sm transition-all"
                    style={{ border: '1.5px solid', borderColor: angle === a ? 'var(--color-brand)' : 'var(--color-border)', background: angle === a ? 'var(--color-brand-light)' : 'var(--color-surface)', color: angle === a ? 'var(--color-brand)' : 'var(--color-muted)' }}>
                    {a}° {a === 90 ? '↻' : a === 180 ? '↕' : '↺'}
                  </button>
                ))}
              </div>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                The thumbnail above updates to show a live preview of the rotation.
              </p>
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
              {processing ? <><Loader2 size={18} className="animate-spin" /> Rotating…</> : <><Zap size={18} /> Rotate PDF</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

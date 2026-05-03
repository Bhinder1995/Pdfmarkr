import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, Zap, CheckCircle2, Download, Shield, Stamp } from 'lucide-react';
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

type WatermarkPos = 'diagonal' | 'center' | 'bottom';
type WatermarkOpacity = 'light' | 'medium' | 'dark';

const OPACITY_MAP: Record<WatermarkOpacity, number> = { light: 0.08, medium: 0.18, dark: 0.35 };

export const WatermarkTool: React.FC = () => {
  const { files, addFiles, removeFile, clearFiles } = useFiles();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const file = files[activeFileIndex] || null;

  const [text, setText] = useState('CONFIDENTIAL');
  const [position, setPosition] = useState<WatermarkPos>('diagonal');
  const [opacity, setOpacity] = useState<WatermarkOpacity>('medium');
  const [color, setColor] = useState('#1e293b');
  const [fontSize, setFontSize] = useState(64);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (incoming: File[]) => { addFiles(incoming); setResult(null); setError(null); };

  const process = async () => {
    if (!file || !text.trim()) return;
    setProcessing(true); setError(null); setResult(null);
    try {
      const data = await PDFEngine.watermarkPdf(file, {
        text: text.trim(),
        position,
        opacity: OPACITY_MAP[opacity],
        fontSize,
        color,
      });
      setResult({ blob: new Blob([data], { type: 'application/pdf' }), name: `pdfmarkr-watermarked-${file.name}` });
    } catch (e: any) { setError(e?.message || 'Watermarking failed. Please try another PDF.'); }
    finally { setProcessing(false); }
  };

  const reset = () => { clearFiles(); setResult(null); setError(null); };

  const PRESETS = ['CONFIDENTIAL', 'DRAFT', 'DO NOT COPY', 'SAMPLE', 'INTERNAL USE'];

  if (result) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}>
        <CheckCircle2 color="#10b981" size={24} />
        <div>
          <p className="font-bold text-sm" style={{ color: '#065f46' }}>Watermark Applied!</p>
          <p className="text-xs" style={{ color: '#047857' }}>"{text}" stamped on all pages · {position} position</p>
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
      <button onClick={reset} className="btn-ghost w-full justify-center">Watermark Another PDF</button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!file ? (
        <DropZone onFiles={onFiles} multiple={false} accept=".pdf" label="Drop your PDF here to add a watermark" />
      ) : (
        <>
          {/* File preview */}
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

          {/* Watermark text */}
          <div className="p-5 rounded-2xl space-y-4" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Watermark Text</p>
            <input
              className="w-full rounded-xl px-4 py-3 text-sm font-bold"
              style={{ border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: '1rem' }}
              placeholder="e.g. CONFIDENTIAL"
              value={text}
              onChange={e => setText(e.target.value.toUpperCase())}
            />
            {/* Quick presets */}
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(p => (
                <button key={p} onClick={() => setText(p)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                  style={{ border: '1.5px solid', borderColor: text === p ? 'var(--color-brand)' : 'var(--color-border)', background: text === p ? 'var(--color-brand-light)' : 'var(--color-surface)', color: text === p ? 'var(--color-brand)' : 'var(--color-muted)' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced options */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Position */}
            <div className="p-4 rounded-2xl space-y-2" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Position</p>
              {(['diagonal', 'center', 'bottom'] as WatermarkPos[]).map(p => (
                <button key={p} onClick={() => setPosition(p)} className="w-full py-2 px-3 rounded-lg text-left text-xs font-semibold transition-all capitalize"
                  style={{ border: '1px solid', borderColor: position === p ? 'var(--color-brand)' : 'var(--color-border)', background: position === p ? 'var(--color-brand-light)' : 'var(--color-surface)', color: position === p ? 'var(--color-brand)' : 'var(--color-text)' }}>
                  {p === 'diagonal' ? '↗ Diagonal' : p === 'center' ? '⊙ Center' : '↓ Bottom'}
                </button>
              ))}
            </div>

            {/* Opacity */}
            <div className="p-4 rounded-2xl space-y-2" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Opacity</p>
              {(['light', 'medium', 'dark'] as WatermarkOpacity[]).map(o => (
                <button key={o} onClick={() => setOpacity(o)} className="w-full py-2 px-3 rounded-lg text-left text-xs font-semibold transition-all capitalize"
                  style={{ border: '1px solid', borderColor: opacity === o ? 'var(--color-brand)' : 'var(--color-border)', background: opacity === o ? 'var(--color-brand-light)' : 'var(--color-surface)', color: opacity === o ? 'var(--color-brand)' : 'var(--color-text)' }}>
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </button>
              ))}
            </div>

            {/* Size & Color */}
            <div className="p-4 rounded-2xl space-y-3" style={{ background: 'var(--color-surface-2)', border: '1.5px solid var(--color-border)' }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>Font Size</p>
                <div className="flex items-center gap-2">
                  <input type="range" min="20" max="120" value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                    className="flex-1 accent-blue-600" />
                  <span className="text-xs font-bold w-8 text-right" style={{ color: 'var(--color-text)' }}>{fontSize}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>Color</p>
                <div className="flex items-center gap-2">
                  <input type="color" value={color} onChange={e => setColor(e.target.value)}
                    className="w-10 h-9 rounded-lg cursor-pointer border-0" style={{ border: '1.5px solid var(--color-border)' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>{color}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live preview badge */}
          <div className="p-4 rounded-2xl flex items-center justify-center" style={{ background: 'var(--color-surface-2)', border: '1.5px dashed var(--color-border)', minHeight: 80 }}>
            <p className="font-black select-none"
              style={{ color: color + Math.round(OPACITY_MAP[opacity] * 255).toString(16).padStart(2, '0'), fontSize: Math.min(fontSize * 0.5, 40), transform: position === 'diagonal' ? 'rotate(-20deg)' : 'none', letterSpacing: '0.08em' }}>
              {text || 'WATERMARK'}
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <Shield size={15} color="#3b82f6" />
            <span className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>Files processed locally — never uploaded to any server</span>
          </div>

          {error && <div className="p-4 rounded-xl text-sm" style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239' }}>{error}</div>}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={reset} className="btn-ghost"><X size={14} /> Clear</button>
            <button onClick={process} disabled={processing || !text.trim()} className="btn-primary flex-1 justify-center">
              {processing ? <><Loader2 size={18} className="animate-spin" /> Applying…</> : <><Stamp size={18} /> Apply Watermark</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

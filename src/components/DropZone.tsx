import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface Props {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
}

export const DropZone: React.FC<Props> = ({
  onFiles,
  accept = '.pdf',
  multiple = false,
  label = 'Drop your PDF here',
  sublabel = 'or click to browse files',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const filterFiles = (fileList: File[]) => {
    return fileList.filter((f: File) => {
      if (accept === '.pdf') return f.type === 'application/pdf' || f.name.endsWith('.pdf');
      return f.name.endsWith('.doc') || f.name.endsWith('.docx');
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = filterFiles(Array.from(e.dataTransfer.files));
    if (dropped.length) onFiles(dropped);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) onFiles(filterFiles(Array.from(e.target.files)));
    e.target.value = '';
  };

  return (
    <div
      className={`drop-zone${dragging ? ' drag-over' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
    >
      <div className="flex flex-col items-center gap-4 pointer-events-none">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white animate-float"
          style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}
        >
          <UploadCloud size={32} />
        </div>
        <div>
          <p className="text-lg md:text-xl" style={{ color: 'var(--color-text)', fontWeight: 700 }}>{label}</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>{sublabel}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <span className="badge-retro" style={{ color: '#10b981', borderColor: '#10b981' }}>✓ 100% Private</span>
          <span className="badge-retro" style={{ color: '#3b82f6', borderColor: '#3b82f6' }}>✓ No Uploads</span>
          <span className="badge-retro" style={{ color: '#6366f1', borderColor: '#6366f1' }}>✓ Free Forever</span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

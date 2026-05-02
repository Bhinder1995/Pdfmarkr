import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ { question: string; answer: string; }

export const FaqAccordion: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border rounded-2xl overflow-hidden" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left focus-ring"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-700 text-sm pr-4" style={{ fontWeight: 700, color: 'var(--color-text)' }}>{faq.question}</span>
            <ChevronDown size={18} style={{ color: 'var(--color-muted)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', flexShrink: 0 }} />
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

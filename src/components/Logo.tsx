import React from 'react';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', width = '100%', height = '100%' }) => {
  return (
    <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PDFMarkr Logo">
      {/* Document Outline */}
      <path d="M 30 15 H 60 L 75 30 V 75 Q 75 85 65 85 H 30 Q 20 85 20 75 V 25 Q 20 15 30 15 Z" stroke="#E11D48" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="white" />
      {/* Folded corner */}
      <path d="M 60 15 V 30 H 75" fill="#E11D48" />
      
      {/* PDF Text */}
      <text x="32" y="45" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#E11D48">PDF</text>
      
      {/* Lines below PDF */}
      <path d="M 32 60 H 55" stroke="#FCA5A5" strokeWidth="4" strokeLinecap="round" />
      <path d="M 32 72 H 48" stroke="#FCA5A5" strokeWidth="4" strokeLinecap="round" />
      
      {/* Checkmark Badge */}
      <circle cx="70" cy="70" r="18" fill="#E11D48" />
      <path d="M 62 70 L 68 76 L 78 63" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

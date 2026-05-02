import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import * as pdfjs from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import mammoth from 'mammoth';

import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export interface PageInfo {
  pageNumber: number;
  width: number;
  height: number;
}

export interface PDFInfo {
  pageCount: number;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  pages: PageInfo[];
  fileSizeKB: number;
}

export const PDFEngine = {

  /** Read metadata and page info from a PDF */
  async getInfo(file: File): Promise<PDFInfo> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pdfJsDoc = await pdfjs.getDocument({ data: arrayBuffer.slice(0) }).promise;

    const pages: PageInfo[] = [];
    for (let i = 0; i < pdf.getPageCount(); i++) {
      const page = pdf.getPages()[i];
      const { width, height } = page.getSize();
      pages.push({ pageNumber: i + 1, width: Math.round(width), height: Math.round(height) });
    }

    return {
      pageCount: pdf.getPageCount(),
      title:    pdf.getTitle()    || '',
      author:   pdf.getAuthor()   || '',
      subject:  pdf.getSubject()  || '',
      keywords: pdf.getKeywords() || '',
      creator:  pdf.getCreator()  || '',
      producer: pdf.getProducer() || '',
      pages,
      fileSizeKB: Math.round(file.size / 1024),
    };
  },

  /** Merge multiple PDFs — supports reordering and inserting blank pages */
  async merge(items: { file: File; pages?: number[] }[], insertBlankPages?: boolean): Promise<Uint8Array> {
    const merged = await PDFDocument.create();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const buf = await item.file.arrayBuffer();
      const src = await PDFDocument.load(buf);
      const indices = item.pages ?? src.getPageIndices();
      const copied = await merged.copyPages(src, indices);
      copied.forEach(p => merged.addPage(p));
      
      // Insert a blank page if requested and not the last file
      if (insertBlankPages && i < items.length - 1) {
        const { width, height } = copied[0].getSize();
        merged.addPage([width, height]);
      }
    }
    return merged.save();
  },

  /** Split PDF — all pages into individual files */
  async split(file: File): Promise<{ data: Uint8Array; name: string }[]> {
    const buf = await file.arrayBuffer();
    const src = await PDFDocument.load(buf);
    const results: { data: Uint8Array; name: string }[] = [];
    const base = file.name.replace(/\.pdf$/i, '');
    for (let i = 0; i < src.getPageCount(); i++) {
      const doc = await PDFDocument.create();
      const [page] = await doc.copyPages(src, [i]);
      doc.addPage(page);
      results.push({ data: await doc.save(), name: `${base}-page-${i + 1}.pdf` });
    }
    return results;
  },

  /** Extract a custom range like "1, 3-5, 8" or "odd" / "even" */
  async extractRange(file: File, range: string): Promise<Uint8Array> {
    const buf = await file.arrayBuffer();
    const src = await PDFDocument.load(buf);
    const total = src.getPageCount();

    const indices: number[] = [];
    const lowerRange = range.toLowerCase().trim();
    
    if (lowerRange === 'odd') {
      for (let i = 1; i <= total; i += 2) indices.push(i - 1);
    } else if (lowerRange === 'even') {
      for (let i = 2; i <= total; i += 2) indices.push(i - 1);
    } else {
      for (const part of range.split(',').map(s => s.trim())) {
        if (part.includes('-')) {
          const [a, b] = part.split('-').map(Number);
          for (let i = a; i <= b; i++) {
            if (i >= 1 && i <= total) indices.push(i - 1);
          }
        } else {
          const n = Number(part);
          if (n >= 1 && n <= total) indices.push(n - 1);
        }
      }
    }

    const doc = await PDFDocument.create();
    const pages = await doc.copyPages(src, indices.length > 0 ? indices : [0]);
    pages.forEach(p => doc.addPage(p));
    return doc.save();
  },

  /** Rotate pages — optionally target 'all', 'odd', or 'even' */
  async rotate(file: File, angle: 90 | 180 | 270, targetPages: 'all'|'odd'|'even' = 'all'): Promise<Uint8Array> {
    const buf = await file.arrayBuffer();
    const doc = await PDFDocument.load(buf);
    doc.getPages().forEach((page, i) => {
      const pageNum = i + 1;
      const shouldRotate = targetPages === 'all' || 
                           (targetPages === 'odd' && pageNum % 2 !== 0) || 
                           (targetPages === 'even' && pageNum % 2 === 0);
      if (shouldRotate) {
        page.setRotation(degrees((page.getRotation().angle + angle) % 360));
      }
    });
    return doc.save();
  },

  /** Compress — re-save with object streams, and optionally max privacy */
  async compress(file: File, level: 'standard'|'maximum' = 'standard'): Promise<{ data: Uint8Array; savedKB: number }> {
    const buf = await file.arrayBuffer();
    const doc = await PDFDocument.load(buf);
    
    if (level === 'maximum') {
      // Strip metadata for max compression & privacy
      doc.setTitle('');
      doc.setAuthor('');
      doc.setSubject('');
      doc.setKeywords([]);
      doc.setCreator('');
      doc.setProducer('');
    }

    const compressed = await doc.save({ useObjectStreams: true, addDefaultPage: false });
    const savedKB = Math.round((file.size - compressed.byteLength) / 1024);
    return { data: compressed, savedKB: Math.max(0, savedKB) };
  },

  /** Extract all text, page-by-page */
  async extractText(file: File): Promise<string> {
    const buf = await file.arrayBuffer();
    const pdfDoc = await pdfjs.getDocument({ data: buf }).promise;
    const parts: string[] = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((it: any) => it.str).join(' ');
      parts.push(`--- Page ${i} ---\n${text}`);
    }
    return parts.join('\n\n');
  },

  /** Edit / write PDF metadata */
  async editMetadata(
    file: File,
    meta: { title?: string; author?: string; subject?: string; keywords?: string; creator?: string }
  ): Promise<Uint8Array> {
    const buf = await file.arrayBuffer();
    const doc = await PDFDocument.load(buf);
    if (meta.title)    doc.setTitle(meta.title);
    if (meta.author)   doc.setAuthor(meta.author);
    if (meta.subject)  doc.setSubject(meta.subject);
    if (meta.keywords) doc.setKeywords(meta.keywords.split(',').map(s => s.trim()));
    if (meta.creator)  doc.setCreator(meta.creator);
    doc.setModificationDate(new Date());
    return doc.save();
  },

  /** PDF → Word (.docx) using text extraction + docx */
  async pdfToWord(file: File): Promise<Blob> {
    const text = await this.extractText(file);
    const lines = text.split('\n');
    const children = lines.map(line =>
      line.startsWith('--- Page ')
        ? new Paragraph({ text: line, heading: HeadingLevel.HEADING_2 })
        : new Paragraph({ children: [new TextRun({ text: line, size: 22 })] })
    );
    const doc = new Document({ sections: [{ properties: {}, children }] });
    const buf = await Packer.toBuffer(doc);
    return new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  },

  /** Word (.docx) → PDF using mammoth text extraction + pdf-lib layout */
  async wordToPdf(file: File, watermarkText?: string): Promise<Uint8Array> {
    const buf = await file.arrayBuffer();
    const { value: rawText } = await mammoth.extractRawText({ arrayBuffer: buf });

    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const fontSize = 11;
    const lineHeight = fontSize * 1.45;
    const margin = 56;

    const allLines: string[] = [];
    for (const para of rawText.split('\n')) {
      const words = para.split(' ');
      let line = '';
      for (const word of words) {
        if ((line + word).length > 90) {
          allLines.push(line.trimEnd());
          line = word + ' ';
        } else {
          line += word + ' ';
        }
      }
      allLines.push(line.trimEnd());
      allLines.push('');
    }

    const pageHeight = 792;
    const pageWidth = 612;
    const usableHeight = pageHeight - margin * 2;
    const linesPerPage = Math.floor(usableHeight / lineHeight);

    for (let start = 0; start < allLines.length; start += linesPerPage) {
      const page = doc.addPage([pageWidth, pageHeight]);
      const chunk = allLines.slice(start, start + linesPerPage);
      
      // Draw watermark if provided
      if (watermarkText) {
        const watermarkFont = await doc.embedFont(StandardFonts.HelveticaBold);
        page.drawText(watermarkText.toUpperCase(), {
          x: pageWidth / 2 - (watermarkText.length * 15),
          y: pageHeight / 2 - 50,
          size: 60,
          font: watermarkFont,
          color: rgb(0.92, 0.92, 0.92),
          rotate: degrees(45),
          opacity: 0.5,
        });
      }

      chunk.forEach((line, i) => {
        if (line) {
          page.drawText(line, {
            x: margin,
            y: pageHeight - margin - i * lineHeight,
            size: fontSize,
            font,
            color: rgb(0.1, 0.1, 0.1),
          });
        }
      });
    }

    return doc.save();
  },

  /** Convert each PDF page to an image (PNG or JPEG) */
  async pdfToImages(
    file: File,
    format: 'png' | 'jpeg',
    scale: number,
    onProgress?: (progress: number) => void
  ): Promise<{ blob: Blob; name: string; pageNum: number }[]> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const results: { blob: Blob; name: string; pageNum: number }[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, mimeType, 0.9));
      
      if (blob) {
        results.push({
          blob,
          name: `${file.name.replace(/\.pdf$/i, '')}-page-${i}.${format}`,
          pageNum: i
        });
      }

      if (onProgress) {
        onProgress(Math.round((i / numPages) * 100));
      }
    }

    return results;
  },

  /** Stamp custom watermark text on all pages */
  async watermarkPdf(
    file: File,
    options: { text: string; position: 'diagonal' | 'center' | 'bottom'; opacity: number; fontSize: number; color: string }
  ): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(arrayBuffer);
    const font = await doc.embedFont(StandardFonts.HelveticaBold);
    
    // Parse hex color (e.g. "#1e293b" -> r, g, b)
    const hex = options.color.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16) / 255 || 0;
    const g = parseInt(hex.substring(2, 4), 16) / 255 || 0;
    const b = parseInt(hex.substring(4, 6), 16) / 255 || 0;
    const colorObj = rgb(r, g, b);

    const pages = doc.getPages();
    
    for (const page of pages) {
      const { width, height } = page.getSize();
      const textWidth = font.widthOfTextAtSize(options.text, options.fontSize);
      const textHeight = font.heightAtSize(options.fontSize);
      
      let x = (width - textWidth) / 2;
      let y = (height - textHeight) / 2;
      let rotate = degrees(0);

      if (options.position === 'diagonal') {
        rotate = degrees(45);
        // Recalculate center for rotated text (rough approximation)
        x = width / 2 - (textWidth * Math.cos(Math.PI / 4)) / 2;
        y = height / 2 - (textWidth * Math.sin(Math.PI / 4)) / 2;
      } else if (options.position === 'bottom') {
        y = 50;
      }

      page.drawText(options.text, {
        x,
        y,
        size: options.fontSize,
        font,
        color: colorObj,
        opacity: options.opacity,
        rotate,
      });
    }

    return doc.save();
  },
};

export interface FAQ { question: string; answer: string; }
export interface HowToStep { name: string; text: string; }

export interface ToolSEO {
  id: string; title: string; description: string; keywords: string[];
  content: string; faqs: FAQ[];
  howTo?: HowToStep[];
  ogTitle?: string; ogDescription?: string;
}

export const SEO_CONTENT: Record<string, ToolSEO> = {
  merge: {
    id:'merge', title:'Merge PDF Files Online — No Upload Required | PDFMarkr',
    description:'Combine multiple PDFs into one document instantly. Drag to reorder, unlimited files, 100% browser-based. No server uploads, no account. Works on any device.',
    keywords:['merge PDF no upload', 'combine PDF files online', 'join multiple PDFs', 'PDF combiner browser', 'merge PDF unlimited files'],
    ogTitle:'Merge PDF Files Online for Free', ogDescription:'Combine unlimited PDFs into one file. Runs in your browser — no uploads, no waiting, completely private.',
    content:`<h2>The Fastest Way to Combine PDF Files Online</h2>
<p>Merging PDFs is one of the most frequent document tasks professionals face every day. Whether you are compiling a report from multiple sources, bundling invoices for accounting, or assembling a portfolio, our <strong>Merge PDF tool</strong> handles it all — instantly and privately.</p>
<h3>How It Works</h3>
<p>Unlike cloud-based tools that upload your files to a remote server, PDFMarkr uses a browser-based processing engine powered by <strong>pdf-lib</strong> and WebAssembly. Your documents are loaded directly into your device's RAM, processed, and returned as a single downloadable file — never transmitted over the internet.</p>
<h3>Step-by-Step Guide</h3>
<ul>
<li><strong>Step 1:</strong> Click "Select Files" or drag and drop your PDFs into the upload area.</li>
<li><strong>Step 2:</strong> Reorder files by dragging them if needed.</li>
<li><strong>Step 3:</strong> Click "Merge PDF" and download your combined document.</li>
</ul>
<h3>Who Uses This Tool?</h3>
<p>Students merging thesis chapters, lawyers combining contracts, accountants bundling financial statements, and HR professionals compiling employee records — all use PDF merging as a core part of their workflow. If the resulting file is too large, you can easily use our <a href="/compress-pdf" style="color: var(--color-brand); text-decoration: underline;">Compress PDF tool</a> to shrink it down for email attachments. PDFMarkr makes this process fast, private, and accessible from any device without installing software.</p>
<h3>Why Choose PDFMarkr?</h3>
<p>Most free online PDF tools have hidden catches — file size limits, daily quotas, or mandatory account registration. PDFMarkr has none of these. We process everything locally, meaning we have no infrastructure costs for file processing, and we pass those savings directly to you as unlimited, free access.</p>`,
    faqs:[
      {question:'Is there a file limit?', answer:'No hard limit. You can merge as many files as your device RAM supports — typically dozens of PDFs with hundreds of pages.'},
      {question:'Are my files safe?', answer:'Completely. Nothing is uploaded to any server. Processing happens inside your browser only.'},
      {question:'Can I reorder pages before merging?', answer:'Yes. You can reorder the files in the upload list before processing.'},
      {question:'Does it work on mobile?', answer:'Yes, PDFMarkr is fully responsive and works on iOS Safari, Android Chrome, and all modern mobile browsers.'},
    ],
    howTo: [
      { name: "Upload your PDFs", text: "Click 'Select Files' or drag and drop multiple PDF files into the dropzone." },
      { name: "Reorder Files", text: "Drag and drop the files in the list to arrange them in the correct order." },
      { name: "Merge and Download", text: "Click the 'Merge PDF' button. Your combined file will be processed locally and downloaded instantly." }
    ]
  },
  split: {
    id:'split', title:'Split PDF Online — No Sign-Up, Instant Results | PDFMarkr',
    description:'Split a PDF into individual pages or extract a custom page range in seconds. Private browser-based processing — no account, no uploads, completely instant.',
    keywords:['split PDF no sign-up', 'extract PDF pages online', 'remove pages from PDF', 'PDF page splitter', 'split PDF by range free'],
    content:`<h2>Extract and Split PDF Pages with Precision</h2>
<p>When you need specific pages from a large document, splitting a PDF is far more professional than forwarding the entire file. Our <strong>Split PDF tool</strong> lets you extract individual pages or define custom ranges like "1, 3-5, 8" with a single click.</p>
<h3>Custom Range Splitting</h3>
<p>Our pro-level range selector lets you type in any combination of pages. For example, entering <code>1, 3-7, 12</code> will extract pages 1, 3 through 7, and 12 as a single output PDF. Leave the range empty to split every page into its own file — ideal for bulk page extraction.</p>
<h3>Common Use Cases</h3>
<ul>
<li>Extracting a signed signature page from a contract</li>
<li>Sharing a specific chapter from an ebook or report</li>
<li>Separating scanned receipts stored in one multi-page PDF</li>
<li>Creating individual handout sheets from a presentation PDF</li>
</ul>
<p>If you extract pages from different documents and want to put them together, simply hop over to our <a href="/merge-pdf" style="color: var(--color-brand); text-decoration: underline;">Merge PDF tool</a> to combine them into a single file.</p>
<h3>Local Processing Advantage</h3>
<p>Because the split happens entirely in your browser, there are no upload delays even for 100-page documents. The engine reads only the pages you request, making it highly efficient even on slower connections or older hardware.</p>`,
    faqs:[
      {question:'Can I split into individual pages?', answer:'Yes. Leave the range field empty and every page will become its own PDF file.'},
      {question:'What range format do you support?', answer:'Enter page numbers separated by commas. Use a hyphen for ranges. Example: 1, 3-5, 8'},
      {question:'Does quality change after splitting?', answer:'No. Pages are extracted from the original PDF without any re-encoding, preserving full quality.'},
      {question:'Can I split a password-protected PDF?', answer:'You need to unlock the PDF first. Once unlocked, our tool can split it normally.'},
    ],
    howTo: [
      { name: "Upload your PDF", text: "Drag and drop a multi-page PDF into the tool." },
      { name: "Select Page Range", text: "Enter specific pages to extract (e.g., '1, 3-5, 8') or leave blank to burst the PDF into individual pages." },
      { name: "Extract Pages", text: "Click 'Extract Pages' to instantly create a new PDF containing only your selected pages." }
    ]
  },
  compress: {
    id:'compress', title:'Compress PDF Online — Instant, No Upload | PDFMarkr',
    description:'Reduce PDF file size without losing quality — instantly, in your browser. No waiting, no uploads, no account. Perfect for email attachments and fast sharing.',
    keywords:['compress PDF instantly', 'reduce PDF size no upload', 'shrink PDF for email', 'PDF compressor instant', 'PDF file size reducer'],
    content:`<h2>Optimize Your PDF File Size Instantly</h2>
<p>Large PDFs create problems: email clients reject them, upload forms refuse them, and sharing becomes slow. Our <strong>Compress PDF</strong> tool resolves this by intelligently restructuring the internal data of your PDF to eliminate waste without visually degrading the content.</p>
<h3>How Compression Works</h3>
<p>PDF files accumulate redundant objects over time — deleted content, unused fonts, duplicate image streams. Our engine uses <strong>object stream compression</strong> via pdf-lib to strip these inefficiencies and re-pack the document structure, often reducing file size by 20–60% depending on the source document.</p>
<h3>Best Results With</h3>
<ul>
<li>PDFs generated by Microsoft Word or Google Docs (often over-optimised)</li>
<li>Documents that have been edited multiple times</li>
<li>Files containing embedded thumbnails or preview caches</li>
</ul>
<h3>Privacy-First Compression</h3>
<p>Many compression services process your files on their servers, creating a privacy risk for sensitive business or legal documents. PDFMarkr compresses entirely inside your browser — your file never travels anywhere.</p>`,
    faqs:[
      {question:'How much will my file shrink?', answer:'It varies by document. Text-heavy PDFs may see 10-30% reduction. Poorly optimised generated PDFs can shrink by 50-70%.'},
      {question:'Will images become blurry?', answer:'No. Our compression targets structural redundancy, not image pixel data.'},
      {question:'Is there a file size limit?', answer:'No. We process files of any size locally.'},
      {question:'Can I compress multiple PDFs at once?', answer:'Currently one file at a time for compression. Use Merge first if you want to compress a combined document.'},
    ]
  },
  'pdf-to-word': {
    id:'pdf-to-word', title:'PDF to Word Converter — No Upload, Stays Private | PDFMarkr',
    description:'Convert PDF to editable Word (.docx) files directly in your browser. Your document never touches a server. High accuracy, full privacy, no account needed.',
    keywords:['PDF to Word no upload', 'convert PDF to DOCX private', 'PDF to Word browser', 'offline PDF Word converter', 'PDF to editable Word'],
    content:`<h2>Convert PDF to Editable Word Documents</h2>
<p>PDFs are great for sharing but frustrating to edit. Our <strong>PDF to Word converter</strong> extracts the full text content of your PDF and reconstructs it as a properly formatted <code>.docx</code> file you can edit in Microsoft Word, Google Docs, or LibreOffice.</p>
<h3>Accurate Text Reconstruction</h3>
<p>The converter reads the internal text streams of your PDF page by page, preserving paragraph structure and heading levels. Each page is clearly labelled in the output document, making navigation easy.</p>
<h3>Ideal For</h3>
<ul>
<li>Editing scanned or typed legal documents</li>
<li>Updating old PDF reports where the source file is lost</li>
<li>Repurposing published articles or whitepapers</li>
<li>Making accessibility improvements to formal documents</li>
</ul>
<h3>Important Note on Scanned PDFs</h3>
<p>This tool works with text-layer PDFs. Scanned PDFs (image-only) do not have embedded text and require OCR processing. For best results, use PDFs created digitally from Word, Google Docs, or similar applications.</p>`,
    faqs:[
      {question:'Is the output fully editable?', answer:'Yes, the .docx file opens in any Word-compatible editor and all text is fully editable.'},
      {question:'Are tables and images preserved?', answer:'Text structure is preserved. Complex tables and embedded images may need manual reformatting.'},
      {question:'Does it work on scanned PDFs?', answer:'Scanned PDFs require OCR. This tool extracts embedded text only.'},
      {question:'Is there a page limit?', answer:'No page limit. Large documents are processed entirely in your browser.'},
    ]
  },
  'word-to-pdf': {
    id:'word-to-pdf', title:'Word to PDF — 100% Local Processing | PDFMarkr',
    description:'Convert Word documents to professional PDFs with zero server contact. Processing happens entirely on your device — fast, private, and no sign-up required.',
    keywords:['Word to PDF local', 'DOCX to PDF no upload', 'convert Word to PDF private', 'Word PDF converter no account', 'offline Word to PDF'],
    content:`<h2>Create Professional PDFs from Word Documents</h2>
<p>PDF is the universal standard for sharing documents. Our <strong>Word to PDF tool</strong> converts your <code>.docx</code> or <code>.doc</code> files into properly formatted PDFs that look the same on every device — no Microsoft Word installation needed.</p>
<h3>Why Convert to PDF?</h3>
<p>PDFs lock your formatting in place. Fonts, margins, and layouts remain consistent regardless of the operating system, application, or screen resolution of the recipient. It is the professional standard for contracts, resumes, reports, and official correspondence.</p>
<h3>Multi-Page Layout Engine</h3>
<p>Our converter intelligently flows your document text across multiple A4 pages with proper margins, ensuring the output looks clean and professionally typeset — not just a raw text dump.</p>
<h3>Privacy and Security</h3>
<p>Your Word documents often contain tracked changes, comments, and author metadata. Converting locally ensures none of this sensitive revision history is exposed to a third-party server during the conversion process.</p>`,
    faqs:[
      {question:'Does it support .doc (older format)?', answer:'Yes, both .doc and .docx formats are fully supported.'},
      {question:'Will my formatting be preserved?', answer:'Text, paragraphs, and headings are preserved. Complex formatting like columns may be simplified.'},
      {question:'Is it free for commercial use?', answer:'Yes, completely free with no usage restrictions.'},
      {question:'How many pages can I convert?', answer:'There is no page limit. The converter handles large documents by flowing content across multiple PDF pages.'},
    ]
  },
  rotate: {
    id:'rotate', title:'Rotate PDF Pages Online — Instant Fix | PDFMarkr',
    description:'Correct PDF page orientation permanently in seconds. Rotate one page or all — 90° or 180°. Instant browser-based fix, no software, no uploads, no sign-up.',
    keywords:['rotate PDF pages instantly', 'fix PDF orientation online', 'rotate PDF 90 degrees', 'flip PDF pages no upload', 'PDF rotation tool instant'],
    content:`<h2>Fix PDF Page Orientation Permanently</h2>
<p>Scanned documents often come out sideways or upside down. Our <strong>Rotate PDF tool</strong> lets you fix the orientation of individual pages or the entire document in seconds — and the change is permanent, not just a display preference.</p>
<h3>Flexible Rotation Options</h3>
<p>Choose between 90° clockwise, 90° counter-clockwise, or 180° rotation. Apply the rotation to every page at once, or target specific pages using the advanced page selector. This is ideal for multi-page documents where only certain pages were scanned incorrectly.</p>
<h3>Common Scenarios</h3>
<ul>
<li>Fixing landscape pages mixed into a portrait document</li>
<li>Correcting upside-down scan batches</li>
<li>Standardising page orientation before merging files</li>
<li>Preparing documents for professional printing</li>
</ul>
<h3>Instant and Lossless</h3>
<p>Rotation is a metadata operation — it changes the viewing angle stored in the PDF header, not the actual pixel data. This means the process is instantaneous and completely lossless, regardless of the number of pages or the complexity of the content.</p>`,
    faqs:[
      {question:'Is the rotation permanent?', answer:'Yes. The orientation is saved into the PDF file itself, not just the viewer.'},
      {question:'Can I rotate one page at a time?', answer:'Yes. Use the page range selector to target specific pages.'},
      {question:'Does rotation affect quality?', answer:'No. Rotation modifies only orientation metadata — image and text quality is unchanged.'},
      {question:'Can I rotate multiple angles?', answer:'Currently you set one angle per operation. Run the tool again to apply additional rotations.'},
    ]
  },
  'extract-text': {
    id:'extract-text', title:'Extract Text from PDF — No Sign-Up | PDFMarkr',
    description:'Pull all text from any PDF instantly. Copy to clipboard or download as .txt. Runs locally in your browser — no account, no uploads, nothing stored.',
    keywords:['extract text from PDF no sign-up', 'PDF text extractor', 'copy text from PDF online', 'PDF to TXT no account', 'pull text from PDF browser'],
    content:`<h2>Extract Clean, Searchable Text from PDF Files</h2>
<p>Copying text from a PDF manually is error-prone and breaks paragraph structure. Our <strong>Extract Text tool</strong> reads the internal text layer of your PDF and outputs a clean, well-structured <code>.txt</code> file — page by page, ready for analysis, editing, or import into other systems.</p>
<h3>Structured Output</h3>
<p>Each page is clearly delimited with a page header in the output file, making it easy to navigate large documents. Whitespace and line breaks are preserved as faithfully as the PDF format allows.</p>
<h3>Use Cases</h3>
<ul>
<li>Feeding PDF content into AI language models or analysis tools</li>
<li>Extracting financial data from annual reports</li>
<li>Scraping research paper content for literature reviews</li>
<li>Indexing legal documents for keyword searching</li>
</ul>
<h3>Limitations to Know</h3>
<p>This tool extracts the embedded text layer. PDFs that are pure scans (photos of pages) do not have a text layer and cannot be extracted this way — they require OCR technology. Text-based PDFs generated from Word, InDesign, or similar tools work perfectly.</p>`,
    faqs:[
      {question:'What format is the output?', answer:'A plain .txt file with page separators, openable in any text editor.'},
      {question:'Does it work on scanned PDFs?', answer:'Only if the scan was processed with OCR and has an embedded text layer.'},
      {question:'Are all pages extracted?', answer:'Yes, every page in the document is processed and included in the output.'},
      {question:'Can I extract from password-protected PDFs?', answer:'You need to unlock the PDF first. Once the password is removed, extraction works normally.'},
    ]
  },
  metadata: {
    id:'metadata', title:'Edit PDF Metadata — Private, 100% Local | PDFMarkr',
    description:'Update PDF title, author, subject, and keywords privately in your browser. Nothing is sent to any server. Clean up document properties in seconds, no sign-up.',
    keywords:['edit PDF metadata private', 'change PDF properties local', 'PDF title author editor', 'PDF metadata cleaner no upload', 'document properties editor'],
    content:`<h2>Full Control Over Your PDF Metadata</h2>
<p>Every PDF file carries hidden information called <strong>metadata</strong> — including the document's title, author name, subject, keywords, and the application that created it. This information is invisible in most viewers but is read by search engines, file explorers, and document management systems.</p>
<h3>Why Metadata Matters</h3>
<p>Before sharing a document externally, it is important to review its metadata. A PDF exported from a corporate template might carry internal author names, confidential project titles, or software version identifiers that you would not want a client or the public to see. Our Metadata Editor lets you clean or update all of these fields before distribution.</p>
<h3>Pre-Populated Fields</h3>
<p>When you load a PDF, our tool automatically reads the existing metadata and pre-fills the form fields. You can then selectively update only the fields that need changing — no need to re-enter everything from scratch.</p>
<h3>SEO for PDFs</h3>
<p>Google and Bing index PDF files and use their metadata to understand and rank the content. Setting a clear Title and relevant Keywords in your PDF metadata can improve its visibility in search results — a technique widely used for published reports, whitepapers, and research papers.</p>`,
    faqs:[
      {question:'What fields can I edit?', answer:'Title, Author, Subject, Keywords, and Creator. Modification date is automatically updated.'},
      {question:'Can I clear all metadata?', answer:'Yes, leave all fields empty and save to produce a metadata-free PDF.'},
      {question:'Is the original file modified?', answer:'No. A new file with updated metadata is generated for download. Your original remains unchanged.'},
      {question:'Does Google read PDF metadata?', answer:'Yes. Google indexes PDF files and uses the Title field prominently in search results.'},
    ]
  },
  'pdf-to-images': {
    id:'pdf-to-images', title:'PDF to JPG / PNG — No Upload, High Quality | PDFMarkr',
    description:'Export PDF pages as high-quality JPG or PNG images — no server uploads, no account. Fast local conversion with full control over output format and quality.',
    keywords:['PDF to JPG no upload', 'PDF to PNG browser', 'convert PDF to image local', 'PDF page to image no sign-up', 'export PDF as image free'],
    content:`<h2>Convert PDF Pages into High-Quality Images</h2>
<p>Sometimes you need to share a PDF in an environment that only accepts images — like a social media post, a presentation slide deck, or an email body. Our <strong>PDF to Images converter</strong> renders every page of your PDF into crisp, high-resolution PNG or JPEG files.</p>
<h3>Lossless PNG or Compressed JPEG</h3>
<p>Choose the format that fits your needs. PNG provides lossless, crystal-clear text rendering that is ideal for documents and charts. JPEG offers significant file size reduction for multi-page documents containing heavy photography.</p>
<h3>Adjustable Resolution</h3>
<p>Unlike basic converters that force a single output size, PDFMarkr lets you choose the rendering scale. Select "High (2x)" for print-quality output or "Screen (1x)" for fast, web-friendly sharing.</p>
<h3>Local Canvas Rendering</h3>
<p>We use Mozilla's PDF.js to render your documents directly onto a hidden HTML5 canvas inside your browser. Your file is never uploaded, ensuring complete privacy for sensitive materials.</p>`,
    faqs:[
      {question:'Which format should I choose?', answer:'PNG is best for documents with sharp text and graphs. JPEG is better for scanned pages or photography to keep file size small.'},
      {question:'Can I download all images at once?', answer:'Yes. A "Download All" button appears after conversion to easily save every page.'},
      {question:'Is there a page limit?', answer:'No hard limit, but converting a 500-page PDF at High resolution will require significant browser memory.'},
      {question:'Does this extract embedded images?', answer:'No, this tool renders the entire page as an image. It does not extract individual photos embedded inside the PDF.'},
    ]
  },
  watermark: {
    id:'watermark', title:'Watermark PDF Online — No Sign-Up | PDFMarkr',
    description:'Add custom text watermarks to any PDF — adjust opacity, angle, and position. No account, no uploads. Stamp Confidential, Draft, or any text privately in seconds.',
    keywords:['watermark PDF no sign-up', 'add text watermark PDF online', 'stamp confidential on PDF', 'PDF watermark no account', 'custom watermark PDF browser'],
    content:`<h2>Secure Your Documents with Custom Watermarks</h2>
<p>Whether you are distributing a confidential draft, stamping invoices as PAID, or protecting your intellectual property, our <strong>Watermark PDF tool</strong> makes it simple to apply professional text overlays across all pages of your document.</p>
<h3>Full Customisation</h3>
<p>Take complete control over your watermark appearance. Type any custom text or use one of our quick presets. Adjust the font size, select a specific hex colour, and tune the opacity to ensure the watermark is visible without obscuring the underlying document.</p>
<h3>Positioning Options</h3>
<p>Place your watermark exactly where you need it:</p>
<ul>
<li><strong>Diagonal:</strong> The standard corporate style, stretching across the center of the page.</li>
<li><strong>Center:</strong> A straightforward horizontal stamp in the middle.</li>
<li><strong>Bottom:</strong> A subtle footer mark ideal for copyright notices.</li>
</ul>
<h3>Client-Side Processing</h3>
<p>Adding a watermark is often the last step before sharing a highly sensitive document. Because PDFMarkr runs entirely in your browser, your un-watermarked original file is never exposed to external servers.</p>`,
    faqs:[
      {question:'Can I use an image as a watermark?', answer:'Currently, this tool supports text watermarks only.'},
      {question:'Is the watermark permanent?', answer:'Yes. The watermark is drawn directly into the PDF content stream, making it a permanent part of the document.'},
      {question:'Can I watermark specific pages?', answer:'Currently, the watermark is applied universally across all pages in the document.'},
      {question:'Does this prevent copying text?', answer:'No, a watermark is a visual overlay. It deters unauthorised sharing but does not lock the document from text extraction.'},
    ]
  },
};


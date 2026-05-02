export interface Guide {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  toolId: string;
  content: string;
  howToSteps?: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'how-to-reduce-pdf-file-size-for-email',
    title: 'How to Reduce PDF Size for Email Attachments | PDFMarkr',
    description: 'Compress large PDFs to meet email attachment limits — no software, no sign-up. Step-by-step guide to shrinking PDF files without losing quality, right in your browser.',
    keywords: ['reduce PDF size for email', 'compress PDF email limit', 'shrink PDF no software', 'PDF too large for email fix', 'how to make PDF smaller'],
    toolId: 'compress',
    content: `
      <h2>The Problem: "Attachment Too Large"</h2>
      <p>Almost everyone has encountered the frustrating "file too large" error when trying to email a PDF. Most email clients (like Gmail or Outlook) enforce a strict 20MB or 25MB attachment limit. If your document is heavy on images, charts, or scanned pages, it will easily exceed this limit.</p>
      
      <h2>The Solution: Structural Compression</h2>
      <p>Instead of manually splitting the PDF or uploading it to a cloud drive and sending a link, you can use our <strong>Compress PDF tool</strong> to dramatically reduce the file size. Our tool works by stripping out redundant data, unused fonts, and optimizing the internal structure of the PDF without degrading visual quality.</p>
      
      <h3>Step-by-Step Guide</h3>
      <ol>
        <li><strong>Open the Tool:</strong> Navigate to the <a href="/compress-pdf" style="color: var(--color-brand); font-weight: bold;">Compress PDF</a> tool on PDFMarkr.</li>
        <li><strong>Select Your File:</strong> Drag and drop your oversized PDF into the designated area. Because PDFMarkr runs locally, there's no waiting for the massive file to upload.</li>
        <li><strong>Process:</strong> Click the compress button. The WebAssembly engine will analyze the document structure and eliminate inefficiencies.</li>
        <li><strong>Download:</strong> Instantly download the shrunken version. You'll typically see a 40-70% reduction in size, making it perfectly small enough to email.</li>
      </ol>

      <p>When compressing confidential legal or financial documents, you should never upload them to third-party servers. PDFMarkr's local processing ensures your sensitive data never leaves your device.</p>
    `,
    howToSteps: [
      "Open the Compress PDF tool on PDFMarkr.",
      "Drag and drop your PDF into the processing area.",
      "Click the compress button to optimize the file structure.",
      "Download your optimized, smaller PDF instantly."
    ]
  },
  {
    slug: 'how-to-extract-pages-from-pdf-on-mac',
    title: 'How to Extract Pages from a PDF — Mac & Windows | PDFMarkr',
    description: 'Extract single pages or custom ranges from any PDF on Mac, Windows, or mobile. No uploads, no installs. Follow this simple browser-based guide in under a minute.',
    keywords: ['extract pages from PDF Mac Windows', 'split PDF pages guide', 'how to remove PDF pages', 'PDF page extraction no upload', 'export specific PDF pages'],
    toolId: 'split',
    content: `
      <h2>Why Extract Pages?</h2>
      <p>Sending a 50-page contract when only the signature page is relevant is unprofessional and confusing. Extracting the exact pages you need is the cleanest way to share specific information from a larger document.</p>
      
      <h2>Using PDFMarkr's Split Tool</h2>
      <p>While Mac users have Preview and Windows users have Edge, these native tools can be clunky when dealing with complex page ranges. PDFMarkr offers a precise syntax for extracting exactly what you need.</p>
      
      <h3>How to do it:</h3>
      <ol>
        <li>Go to the <a href="/split-pdf" style="color: var(--color-brand); font-weight: bold;">Split PDF</a> tool.</li>
        <li>Upload your target document.</li>
        <li><strong>Define your range:</strong> In the range input box, you can type specific pages separated by commas, or use hyphens for continuous ranges. For example, typing <code>1, 4-6, 10</code> will extract page 1, pages 4 through 6, and page 10, combining them into a single new document.</li>
        <li><strong>Burst Mode:</strong> If you want every single page turned into its own file, simply leave the range box empty.</li>
      </ol>
      
      <h2>Zero Quality Loss</h2>
      <p>Unlike taking screenshots or printing to PDF, our tool extracts the original page streams verbatim. This means all text remains searchable, all links remain clickable, and there is zero degradation in visual quality.</p>
    `,
    howToSteps: [
      "Navigate to the Split PDF tool.",
      "Select the PDF you want to extract pages from.",
      "Enter your desired page numbers or ranges (e.g., 1, 3-5).",
      "Click the split button and download your extracted pages."
    ]
  },
  {
    slug: 'how-to-add-confidential-watermark-to-pdf',
    title: 'How to Add a Confidential Watermark to PDF — Instant | PDFMarkr',
    description: 'Stamp a diagonal Confidential or Draft watermark on any PDF in seconds. Step-by-step guide using PDFMarkr\'s browser tool — no software installs or uploads needed.',
    keywords: ['add confidential watermark PDF', 'stamp draft on PDF guide', 'PDF watermark how-to', 'protect PDF watermark instant', 'confidential PDF stamp free'],
    toolId: 'watermark',
    content: `
      <h2>Protecting Sensitive Information</h2>
      <p>Whether you're sharing a draft, a confidential contract, or an internal report, adding a watermark is a critical security step. Our tool lets you stamp text across every page without ever uploading the file to a server.</p>
      <h3>Choosing the Right Text</h3>
      <p>Common watermarks include "CONFIDENTIAL", "DRAFT", "INTERNAL USE", or even your company's name. You can customize the transparency so the watermark is visible but doesn't obscure the content.</p>
      <h3>How to Apply Your Watermark</h3>
      <ol>
        <li>Select your PDF file.</li>
        <li>Type your desired watermark text (e.g., "CONFIDENTIAL").</li>
        <li>Adjust the opacity and rotation for better visibility.</li>
        <li>Download your secured PDF instantly.</li>
      </ol>
    `,
    howToSteps: [
      "Open the Watermark PDF tool.",
      "Upload the document you wish to secure.",
      "Type your watermark text and adjust rotation and opacity.",
      "Process and download your watermarked document."
    ]
  },
  {
    slug: 'how-to-combine-multiple-pdfs-into-one-document',
    title: 'How to Combine Multiple PDFs into One Document | PDFMarkr',
    description: 'Merge multiple PDF files into one document instantly. Drag to reorder, unlimited files, 100% browser-based. No server uploads, no account. Works on any device.',
    keywords: ['merge PDF no upload', 'combine PDF files online', 'join multiple PDFs', 'PDF combiner browser', 'merge PDF unlimited files'],
    toolId: 'merge',
    content: `
      <h2>Assembling Your Documents</h2>
      <p>Merging PDFs is the most effective way to keep related documents together. Whether it's a collection of receipts, different chapters of a report, or multiple certificates, a single PDF is much easier to manage and share.</p>
      <h3>Reordering Made Simple</h3>
      <p>Before you merge, you can drag and drop your files in the list to ensure the final document follows the exact order you need. Our tool handles unlimited files, as long as your device has enough memory.</p>
      <h3>Privacy First</h3>
      <p>Because the merging happens in your browser's RAM, your sensitive documents never leave your computer. This makes it safe for bank statements, contracts, and personal records.</p>
    `,
    howToSteps: [
      "Go to the Merge PDF tool.",
      "Select two or more PDF files from your device.",
      "Drag and drop the files to set the correct sequence.",
      "Merge the files and download the combined document."
    ]
  },
  {
    slug: 'how-to-fix-sideways-pdf-scans-permanently',
    title: 'How to Fix Sideways PDF Scans Permanently | PDFMarkr',
    description: 'Correct PDF page orientation permanently in seconds. Rotate one page or all — 90° or 180°. Instant browser-based fix, no software, no uploads, no sign-up.',
    keywords: ['rotate PDF pages instantly', 'fix PDF orientation online', 'rotate PDF 90 degrees', 'flip PDF pages no upload', 'PDF rotation tool instant'],
    toolId: 'rotate',
    content: `
      <h2>Say Goodbye to Sideways Pages</h2>
      <p>We've all been there: you scan a stack of documents only to find that half of them are in landscape mode or upside down. Rotating them manually every time you view the file is a hassle. Our tool makes the rotation permanent.</p>
      <h3>Individual or Batch Rotation</h3>
      <p>You can choose to rotate just the pages that need fixing or apply a 90° rotation to every page in the document. It's fast, free, and happens instantly in your browser.</p>
      <h3>Works on Mobile</h3>
      <p>If you're on the go, you can use our responsive mobile interface to fix your PDFs right from your phone or tablet before sending them off.</p>
    `,
    howToSteps: [
      "Open the Rotate PDF tool.",
      "Upload the PDF with orientation issues.",
      "Select individual pages or rotate the entire document.",
      "Apply the rotation and download your corrected file."
    ]
  },
  {
    slug: 'how-to-convert-pdf-to-editable-word-documents',
    title: 'How to Convert PDF to Editable Word Documents | PDFMarkr',
    description: 'Convert PDF to editable Word (.docx) files directly in your browser. Your document never touches a server. High accuracy, full privacy, no account needed.',
    keywords: ['PDF to Word no upload', 'convert PDF to DOCX private', 'PDF to Word browser', 'offline PDF Word converter', 'PDF to editable Word'],
    toolId: 'pdf-to-word',
    content: `
      <h2>Turning Fixed Files into Editable Docs</h2>
      <p>PDFs are great for viewing but notoriously difficult to edit. By converting your PDF to a Word (.docx) file, you can easily change text, update tables, and adjust formatting using your favorite word processor.</p>
      <h3>Preserving Your Layout</h3>
      <p>Our conversion engine works hard to maintain your document's original structure, including images and paragraphs. While complex layouts might need a little touch-up, the bulk of your content will be perfectly editable.</p>
      <h3>Total Data Privacy</h3>
      <p>Unlike other converters that require an email or an account, PDFMarkr processes your conversion locally. Your confidential documents stay on your machine throughout the entire process.</p>
    `,
    howToSteps: [
      "Select the PDF to Word converter.",
      "Upload your PDF document.",
      "The tool will automatically extract and convert the content.",
      "Download your editable .docx file."
    ]
  },
  {
    slug: 'how-to-save-a-word-doc-as-pdf-without-microsoft-word',
    title: 'How to Save a Word Doc as PDF Without Microsoft Word | PDFMarkr',
    description: 'Convert Word documents to professional PDFs with zero server contact. Processing happens entirely on your device — fast, private, and no sign-up required.',
    keywords: ['Word to PDF local', 'DOCX to PDF no upload', 'convert Word to PDF private', 'Word PDF converter no account', 'offline Word to PDF'],
    toolId: 'word-to-pdf',
    content: `
      <h2>Universal Document Sharing</h2>
      <p>Microsoft Word documents can look different depending on the version of Word or the operating system used. Converting to PDF ensures that your fonts, margins, and formatting look identical for everyone who opens the file.</p>
      <h3>No Software Needed</h3>
      <p>You don't need to have Microsoft Office installed on your computer. Just drop your .docx file into our browser tool and get a professional PDF back in seconds.</p>
      <h3>Perfect for Job Applications</h3>
      <p>Always send your resume and cover letter as a PDF. It ensures your formatting stays intact and prevents recruiters from seeing tracked changes or comments by accident.</p>
    `,
    howToSteps: [
      "Open the Word to PDF tool.",
      "Select your .docx or .doc file.",
      "The browser-based engine will convert the file instantly.",
      "Download your professional PDF document."
    ]
  },
  {
    slug: 'how-to-copy-text-from-a-protected-pdf-document',
    title: 'How to Copy Text from a Protected PDF Document | PDFMarkr',
    description: 'Pull all text from any PDF instantly. Copy to clipboard or download as .txt. Runs locally in your browser — no account, no uploads, nothing stored.',
    keywords: ['extract text from PDF no sign-up', 'PDF text extractor', 'copy text from PDF online', 'PDF to TXT no account', 'pull text from PDF browser'],
    toolId: 'extract-text',
    content: `
      <h2>Accessing the Content You Need</h2>
      <p>Sometimes you just need a few paragraphs from a large PDF, or you're dealing with a document where copying is restricted. Our Extract Text tool bypasses common hurdles to give you the raw text you need.</p>
      <h3>Clean Text Output</h3>
      <p>Instead of copying page by page and dealing with broken line breaks, our tool extracts the entire text layer into a clean, searchable format. You can copy it directly to your clipboard or download it as a .txt file.</p>
      <h3>Ideal for Researchers</h3>
      <p>Gathering data from academic papers or long reports becomes much faster when you can extract all the text at once for analysis or summary generation.</p>
    `,
    howToSteps: [
      "Go to the Extract Text tool.",
      "Upload the PDF you want to scrape text from.",
      "View the extracted text in the preview area.",
      "Copy the text or download it as a clean .txt file."
    ]
  },
  {
    slug: 'how-to-change-the-author-and-title-of-a-pdf',
    title: 'How to Change the Author and Title of a PDF | PDFMarkr',
    description: 'Update PDF title, author, subject, and keywords privately in your browser. Nothing is sent to any server. Clean up document properties in seconds, no sign-up.',
    keywords: ['edit PDF metadata private', 'change PDF properties local', 'PDF title author editor', 'PDF metadata cleaner no upload', 'document properties editor'],
    toolId: 'metadata',
    content: `
      <h2>Cleaning Up Your Document Info</h2>
      <p>PDF files often contain hidden metadata that identifies the original author, the creation date, or the software used. Before sharing a professional document, it's good practice to ensure this information is correct and professional.</p>
      <h3>Customizing Document Properties</h3>
      <p>Our Metadata Editor lets you change the Title, Author, Subject, and Keywords. This not only looks more professional but also helps search engines and file managers index your document correctly.</p>
      <h3>Privacy Protection</h3>
      <p>Remove internal author names or department info from your PDFs before sending them to clients or publishing them online. With PDFMarkr, this cleanup happens entirely on your own device.</p>
    `,
    howToSteps: [
      "Select the Metadata Editor tool.",
      "Upload your PDF to view current properties.",
      "Modify the Title, Author, and Keywords fields.",
      "Save the changes and download the updated PDF."
    ]
  },
  {
    slug: 'how-to-export-pdf-pages-as-high-quality-images',
    title: 'How to Export PDF Pages as High-Quality Images | PDFMarkr',
    description: 'Export PDF pages as high-quality JPG or PNG images — no server uploads, no account. Fast local conversion with full control over output format and quality.',
    keywords: ['PDF to JPG no upload', 'PDF to PNG browser', 'convert PDF to image local', 'PDF page to image no sign-up', 'export PDF as image free'],
    toolId: 'pdf-to-images',
    content: `
      <h2>Visualizing Your Documents</h2>
      <p>Sometimes a PDF isn't the right format. If you want to include a page in a social media post, a presentation, or a web gallery, converting it to a high-quality image (JPG or PNG) is the best solution.</p>
      <h3>Full Control Over Quality</h3>
      <p>Choose between PNG for lossless quality or JPG for smaller file sizes. Our tool renders every page accurately, preserving colors and sharp text.</p>
      <h3>Batch Export</h3>
      <p>Instead of taking screenshots page by page, you can export the entire document as a collection of image files in one go. It's fast, free, and runs entirely in your browser.</p>
    `,
    howToSteps: [
      "Open the PDF to Images converter.",
      "Select your PDF and choose JPG or PNG format.",
      "Set your desired image quality.",
      "Download a zip archive of your PDF pages as images."
    ]
  }
];

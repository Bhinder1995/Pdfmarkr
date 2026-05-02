import React from 'react';
import { Helmet } from 'react-helmet-async';

export const AboutPage: React.FC = () => (
  <>
    <Helmet>
      <title>About PDFMarkr — 100% Local, Privacy-First PDF Tools</title>
      <meta name="description" content="PDFMarkr is built on one principle: your files never leave your device. Browser-based, zero server uploads, no accounts. Fast, private PDF tools for everyone." />
    </Helmet>
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>About PDFMarkr</h1>
      <div className="prose-seo max-w-none text-lg leading-relaxed space-y-6" style={{ color: 'var(--color-muted)' }}>
        <p className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Welcome to PDFMarkr, the definitive platform for managing, editing, and converting Portable Document Format (PDF) files with an uncompromising focus on user privacy, speed, and accessibility.</p>
        
        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>Our Mission</h2>
        <p>In a world where data is increasingly commoditized, we noticed a disturbing trend in the utility software space: simple tasks like merging two PDF documents or compressing a file size required users to upload their sensitive, proprietary, or personal data to remote servers. This process is not only inherently insecure but also incredibly inefficient, especially for large files or users with slow internet connections.</p>
        <p>Our mission at PDFMarkr is to decentralize document processing. We believe that your device—whether it's a smartphone, a tablet, or a desktop computer—already possesses the computational power needed to process complex documents. By leveraging cutting-edge web technologies like WebAssembly (Wasm) and the modern File System Access API, we have engineered a suite of tools that run <strong>entirely within your browser's local memory</strong>.</p>
        <p>This means zero uploads, zero server processing, and zero risk of data interception. When you use PDFMarkr, your files never leave your device.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>Why We Built PDFMarkr</h2>
        <p>The genesis of PDFMarkr was rooted in frustration. As professionals working across legal, academic, and software engineering domains, we frequently found ourselves needing to quickly manipulate PDF files—extracting a single page from a massive contract, applying a watermark to a draft proposal, or converting a financial report into a Word document.</p>
        <p>The existing market solutions presented us with unacceptable compromises:</p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
          <li><strong>Privacy Risks:</strong> Cloud-based processors forced us to upload confidential documents to anonymous servers, often with opaque data retention policies.</li>
          <li><strong>Paywalls and Quotas:</strong> "Free" tools were invariably crippled by artificial limits. After processing two files, we would be hit with aggressive pop-ups demanding a monthly subscription or a 24-hour waiting period.</li>
          <li><strong>Bloated Desktop Software:</strong> The alternative to cloud processors was downloading gigabytes of proprietary desktop software, which was expensive, slow to launch, and tied to specific operating systems.</li>
        </ul>
        <p>We built PDFMarkr to eliminate all three of these compromises. By moving the processing logic directly into the client-side browser environment, we eliminated server costs. Because we don't have to pay expensive cloud computing bills to process your files, we can offer our platform completely free of charge, with no artificial file size limits or daily quotas.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>The Technology Behind the Platform</h2>
        <p>PDFMarkr is not a traditional web application; it is a progressive web app (PWA) powered by state-of-the-art libraries that compile complex C++ and Rust codebases into WebAssembly, allowing them to run at near-native speeds directly in your browser tab.</p>
        <p>We utilize the robust capabilities of <code>pdf-lib</code> for structural manipulations—such as merging, splitting, and metadata editing—ensuring that the underlying syntax of the PDF is preserved without degradation. For complex rendering tasks, such as converting a PDF to high-resolution image formats, we harness the power of Mozilla's <code>PDF.js</code>, the same battle-tested engine that powers native PDF viewing in Firefox.</p>
        <p>This architecture provides several distinct advantages:</p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
          <li><strong>Instant Execution:</strong> There is no waiting for a 100MB file to upload. Processing begins the millisecond you drop the file into the application.</li>
          <li><strong>Offline Capability:</strong> Once the web page has loaded, the core logic is cached in your browser. You can disconnect from the internet and continue to process documents safely.</li>
          <li><strong>Cross-Platform Compatibility:</strong> Whether you are running macOS, Windows, Linux, iOS, or Android, PDFMarkr works flawlessly as long as you have a modern web browser.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>Our Commitment to You</h2>
        <p>Trust is difficult to build and easy to lose. Our commitment to our users is codified in our architectural design. We don't ask you to trust our privacy policy; we ask you to trust the mathematics of our client-side architecture. Because we do not have a backend server processing your files, we literally do not possess the technical capability to view, store, or sell your documents.</p>
        <p>Furthermore, we commit to keeping the core suite of PDFMarkr tools completely free forever. We will never introduce artificial delays, we will never watermark your documents (unless you specifically use the Watermark tool!), and we will never force you to create an account to download your processed files.</p>
        <p>We believe that managing your digital documents should be as seamless, private, and free as managing physical paper on your own desk. PDFMarkr is our contribution to a more open, secure, and user-respecting internet.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>Get in Touch</h2>
        <p>We are constantly iterating and improving the platform based on user feedback. If you have encountered a bug, have a suggestion for a new tool, or simply want to share how PDFMarkr has improved your workflow, we would love to hear from you.</p>
        <p>You can reach our development team directly at <strong>hello@pdfmarkr.com</strong>.</p>
      </div>
    </main>
  </>
);

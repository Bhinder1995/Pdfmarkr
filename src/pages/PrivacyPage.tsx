import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PrivacyPage: React.FC = () => (
  <>
    <Helmet>
      <title>Privacy Policy — Files Never Leave Your Device | PDFMarkr</title>
      <meta name="description" content="PDFMarkr processes everything locally in your browser. No file uploads, no data collection, no third-party sharing. Read our zero-retention privacy policy." />
    </Helmet>
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
      <p className="text-lg mb-8 font-semibold" style={{ color: 'var(--color-brand)' }}>Effective Date: May 1, 2026</p>
      
      <div className="prose-seo max-w-none text-lg leading-relaxed space-y-6" style={{ color: 'var(--color-muted)' }}>
        <p className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>At PDFMarkr, privacy is not a feature; it is the fundamental architectural principle upon which our entire platform is built. This Privacy Policy outlines how we handle your data, or more accurately, how we intentionally design our systems to avoid handling your data.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>1. File Processing & Document Privacy</h2>
        <p>The most important aspect of our service is how we handle the documents you process using our tools. <strong>PDFMarkr operates exclusively as a client-side application.</strong></p>
        <p>When you use tools such as Merge PDF, Split PDF, Compress PDF, PDF to Word, or any other utility on our platform, the processing logic is executed entirely within the confines of your web browser (e.g., Chrome, Safari, Firefox, Edge). We utilize WebAssembly (Wasm) and JavaScript libraries to manipulate the data directly in your device's Random Access Memory (RAM).</p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
          <li><strong>No Uploads:</strong> Your files are never uploaded to our servers, cloud infrastructure, or any third-party processing centers.</li>
          <li><strong>No Storage:</strong> Because files are never transmitted to us, we do not store, host, backup, or cache any portion of your documents.</li>
          <li><strong>Absolute Confidentiality:</strong> We cannot view, analyze, or access the contents of your files. They remain strictly under your control on your local hardware at all times.</li>
        </ul>
        <p>Once you close the browser tab or refresh the page, the file data is immediately wiped from your browser's memory by the browser's native garbage collection protocols.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>2. Information We Collect</h2>
        <p>While we do not collect your files, we do collect minimal, non-personally identifiable information (Non-PII) necessary to maintain, secure, and improve the basic functionality of the website.</p>
        
        <h3 className="text-2xl font-bold mt-6 mb-4" style={{ color: 'var(--color-text)' }}>A. Standard Server Logs</h3>
        <p>Like almost all websites on the internet, our hosting infrastructure automatically records basic routing information when you visit PDFMarkr.com. This includes:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Your IP address (used for routing traffic and preventing DDoS attacks).</li>
          <li>Browser type and version (e.g., Chrome 124 on Windows 11).</li>
          <li>The date and time of your visit.</li>
          <li>Referring URLs (the page that linked you to our site).</li>
        </ul>
        <p>This data is retained temporarily for security auditing and operational diagnostics before being automatically purged.</p>

        <h3 className="text-2xl font-bold mt-6 mb-4" style={{ color: 'var(--color-text)' }}>B. Privacy-Respecting Analytics</h3>
        <p>To understand which tools are providing the most value to our users, we use a privacy-first, cookieless analytics solution. We track aggregated page views (e.g., "The Merge tool was viewed 10,000 times today") and completely anonymous interactions (e.g., "A user clicked the download button").</p>
        <p>We explicitly <strong>do not</strong> use Google Analytics or Facebook Pixels. We do not engage in cross-site tracking, device fingerprinting, or behavior profiling. Our analytics cannot identify you as an individual.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>3. Use of Cookies and Local Storage</h2>
        <p>PDFMarkr aims to operate with a zero-cookie footprint for tracking purposes. We do not set any tracking cookies, advertising cookies, or third-party marketing cookies on your device.</p>
        <p>We may use your browser's native <code>localStorage</code> purely for functional, non-identifying purposes. For example, if we introduce a "Dark Mode" toggle in the future, your preference would be saved in <code>localStorage</code> so the site loads correctly on your next visit. This data never leaves your browser and is not transmitted to us.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>4. Third-Party Integrations</h2>
        <p>To deliver a fast, reliable experience globally, PDFMarkr relies on specific third-party infrastructure providers:</p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
          <li><strong>Hosting and Content Delivery Networks (CDN):</strong> Our static website files (HTML, CSS, JavaScript) are served via globally distributed CDNs (such as Vercel or Cloudflare) to ensure fast loading times. These networks act as a conduit for the application files and temporarily log IP addresses for DDoS mitigation.</li>
          <li><strong>Open Source Libraries:</strong> The core functionality of PDFMarkr is built upon robust open-source libraries like <code>pdf-lib</code> and <code>PDF.js</code>. These libraries are bundled directly into our application code and execute locally. They do not phone home or transmit data to their respective creators.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>5. Security Measures</h2>
        <p>We employ enterprise-grade security protocols to protect the integrity of the PDFMarkr application delivery:</p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
          <li><strong>HTTPS Encryption:</strong> All connections to PDFMarkr.com are secured using Transport Layer Security (TLS/SSL). This ensures that the application code you receive has not been tampered with by an ISP or a man-in-the-middle attack.</li>
          <li><strong>Content Security Policy (CSP):</strong> We enforce strict HTTP headers that prevent unauthorized scripts from loading or executing on our platform, neutralizing the risk of Cross-Site Scripting (XSS) attacks.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>6. Children's Privacy</h2>
        <p>PDFMarkr is a general audience utility platform and does not knowingly collect any personal information from children under the age of 13. Because we do not require account registration or collect personal data, the platform is safe for educational use by students of all ages under the supervision of their respective educational institutions.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>7. Changes to This Privacy Policy</h2>
        <p>As the web evolves and we add new features to PDFMarkr, we may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Effective Date" at the top.</p>
        <p>However, our core commitment will never change: <strong>we will never transition to a model that requires uploading your private documents to our servers without your explicit, opt-in consent for a specific cloud-based feature.</strong></p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>8. Contact Information</h2>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer at:</p>
        <p><strong>Email:</strong> privacy@pdfmarkr.com</p>
      </div>
    </main>
  </>
);

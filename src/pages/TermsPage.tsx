import React from 'react';
import { Helmet } from 'react-helmet-async';

export const TermsPage: React.FC = () => (
  <>
    <Helmet>
      <title>Terms of Service — No Account Required | PDFMarkr</title>
      <meta name="description" content="Review the terms and acceptable use policy for PDFMarkr. Simple, transparent terms for a tool that requires no account, no uploads, and no hidden conditions." />
    </Helmet>
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Terms of Service</h1>
      <p className="text-lg mb-8 font-semibold" style={{ color: 'var(--color-brand)' }}>Effective Date: May 1, 2026</p>
      
      <div className="prose-seo max-w-none text-lg leading-relaxed space-y-6" style={{ color: 'var(--color-muted)' }}>
        <p className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Welcome to PDFMarkr. By accessing or using our website and the suite of browser-based PDF utilities provided therein, you agree to be bound by these Terms of Service. Please read them carefully.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>1. Acceptance of Terms</h2>
        <p>By accessing the website at PDFMarkr.com, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>2. Description of Service</h2>
        <p>PDFMarkr provides a suite of client-side web applications designed to manipulate Portable Document Format (PDF) files. The services include, but are not limited to, merging, splitting, compressing, rotating, watermarking, and converting PDFs. All processing occurs entirely within your local web browser environment.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>3. Use License and Acceptable Use</h2>
        <p>PDFMarkr grants you a personal, non-exclusive, non-transferable, revocable license to access and use the platform strictly in accordance with these Terms.</p>
        <p>As a condition of your use of the site, you warrant to PDFMarkr that you will not use the platform for any purpose that is unlawful or prohibited by these Terms. Specifically, you agree not to:</p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
          <li><strong>Violate Copyrights:</strong> Use PDFMarkr to strip watermarks, remove passwords, or unlawfully distribute copyrighted material that you do not have the right to modify.</li>
          <li><strong>Reverse Engineer:</strong> Attempt to decompile or reverse engineer any software contained on the PDFMarkr website.</li>
          <li><strong>Automated Abuse:</strong> Use automated scripts, bots, or scrapers to interact with the service in a manner that degrades performance for human users.</li>
          <li><strong>Malicious Documents:</strong> Intentionally process PDF files containing malware, viruses, or exploits designed to harm browser environments or other users.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>4. Disclaimer of Warranties</h2>
        <p>The materials and tools on PDFMarkr's website are provided on an 'as is' and 'as available' basis. PDFMarkr makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <p>Furthermore, while our tools are designed to preserve the integrity of your documents, PDFMarkr does not warrant or make any representations concerning the absolute accuracy, likely results, or reliability of the use of the materials on its website. We strongly recommend maintaining backups of your original, unprocessed PDF files before using our tools.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>5. Limitation of Liability</h2>
        <p>In no event shall PDFMarkr, its developers, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PDFMarkr's website, even if PDFMarkr or a PDFMarkr authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        <p>Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>6. Accuracy of Materials</h2>
        <p>The materials appearing on PDFMarkr's website could include technical, typographical, or photographic errors. PDFMarkr does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice, but we do not make any commitment to update the materials.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>7. Links to External Sites</h2>
        <p>PDFMarkr has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PDFMarkr of the site. Use of any such linked website is at the user's own risk.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>8. Modifications to Terms of Service</h2>
        <p>PDFMarkr may revise these Terms of Service for its website at any time without notice. By using this website you are agreeing to be bound by the then-current version of these Terms of Service. We encourage users to frequently check this page for any changes to stay informed about how we are protecting the personal information we collect.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>9. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with standard international law, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>

        <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--color-text)' }}>10. Contact Us</h2>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p><strong>Email:</strong> legal@pdfmarkr.com</p>
      </div>
    </main>
  </>
);

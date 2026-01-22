import React from 'react';

const PDFStyles = () => {
  return (
    <style jsx global>{`
      /* PDF-specific styles when generating */
      .pdf-generating {
        background: white !important;
        color: black !important;
      }
      
      .pdf-generating * {
        animation: none !important;
        transition: none !important;
        transform: none !important;
      }
      
      .pdf-generating .dark\\:bg-dark-900,
      .pdf-generating .dark\\:bg-dark-800,
      .pdf-generating .dark\\:bg-dark-700 {
        background: white !important;
      }
      
      .pdf-generating .dark\\:text-white,
      .pdf-generating .dark\\:text-gray-300,
      .pdf-generating .dark\\:text-gray-400 {
        color: #374151 !important;
      }
      
      .pdf-generating .dark\\:border-dark-700,
      .pdf-generating .dark\\:border-dark-800 {
        border-color: #e5e7eb !important;
      }
      
      /* Hide problematic elements during PDF generation */
      .pdf-generating .animate-ping,
      .pdf-generating .animate-pulse,
      .pdf-generating .animate-bounce,
      .pdf-generating button,
      .pdf-generating nav {
        display: none !important;
      }
      
      /* Fix gradient backgrounds for PDF */
      .pdf-generating .bg-gradient-to-r,
      .pdf-generating .bg-gradient-to-br,
      .pdf-generating .bg-gradient-to-l {
        background: #f8fafc !important;
        border: 1px solid #e2e8f0 !important;
      }
      
      /* Ensure proper text colors */
      .pdf-generating h1,
      .pdf-generating h2,
      .pdf-generating h3,
      .pdf-generating h4,
      .pdf-generating h5,
      .pdf-generating h6 {
        color: #1f2937 !important;
      }
      
      .pdf-generating p,
      .pdf-generating span,
      .pdf-generating div {
        color: #374151 !important;
      }
      
      /* Fix primary colors */
      .pdf-generating .text-primary-600,
      .pdf-generating .text-primary-500,
      .pdf-generating .text-primary-400 {
        color: #2563eb !important;
      }
      
      .pdf-generating .bg-primary-100,
      .pdf-generating .bg-primary-50 {
        background: #dbeafe !important;
      }
      
      /* Card backgrounds */
      .pdf-generating .bg-white {
        background: white !important;
        border: 1px solid #e5e7eb !important;
      }
      
      /* Remove shadows and transforms */
      .pdf-generating .shadow-xl,
      .pdf-generating .shadow-lg,
      .pdf-generating .shadow-2xl {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
      }
      
      /* Timeline fixes */
      .pdf-generating .timeline-indicator {
        background: #2563eb !important;
        width: 12px !important;
        height: 12px !important;
      }
      
      /* Ensure sections have proper spacing */
      .pdf-generating section {
        margin-bottom: 2rem !important;
        page-break-inside: avoid;
      }
      
      /* Fix any zero-width/height elements */
      .pdf-generating *[style*="width: 0"],
      .pdf-generating *[style*="height: 0"] {
        display: none !important;
      }
      
      /* Ensure minimum dimensions for canvas elements */
      .pdf-generating canvas {
        min-width: 1px !important;
        min-height: 1px !important;
      }
      
      /* Fix background images that might cause canvas issues */
      .pdf-generating *::before,
      .pdf-generating *::after {
        background-image: none !important;
        content: none !important;
      }
      
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body {
          background: white !important;
          color: black !important;
        }
        
        /* Hide elements that shouldn't appear in PDF */
        nav,
        .scroll-to-top,
        .floating-download,
        button,
        .animate-pulse,
        .animate-ping,
        .animate-bounce {
          display: none !important;
        }
        
        /* Ensure proper spacing for PDF */
        section {
          page-break-inside: avoid;
          margin-bottom: 2rem;
        }
        
        /* Ensure proper page breaks */
        #hero {
          page-break-after: always;
        }
        
        #skills,
        #experience,
        #projects,
        #education {
          page-break-before: auto;
          page-break-after: auto;
        }
        
        #contact {
          page-break-before: auto;
        }
      }
    `}</style>
  );
};

export default PDFStyles;
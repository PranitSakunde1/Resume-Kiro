import React from 'react';

const PDFStyles = () => {
  return (
    <style jsx global>{`
      /* Basic print styles for fallback */
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
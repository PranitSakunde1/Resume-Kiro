import React from 'react';

const PDFStyles = () => {
  return (
    <style jsx global>{`
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
        
        .dark {
          background: white !important;
          color: black !important;
        }
        
        .dark * {
          background: white !important;
          color: black !important;
        }
        
        /* Hide elements that shouldn't appear in PDF */
        nav,
        .scroll-to-top,
        .floating-download,
        button,
        .hover\\:scale-105,
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
        
        /* Fix text colors for PDF */
        h1, h2, h3, h4, h5, h6 {
          color: #1f2937 !important;
        }
        
        p, span, div {
          color: #374151 !important;
        }
        
        /* Ensure backgrounds are visible */
        .bg-gradient-to-r,
        .bg-gradient-to-br,
        .bg-gradient-to-l {
          background: #f3f4f6 !important;
        }
        
        /* Fix card backgrounds */
        .bg-white {
          background: white !important;
          border: 1px solid #e5e7eb !important;
        }
        
        /* Fix primary colors */
        .text-primary-600,
        .text-primary-500,
        .text-primary-400 {
          color: #2563eb !important;
        }
        
        .bg-primary-100,
        .bg-primary-50 {
          background: #dbeafe !important;
        }
        
        /* Timeline adjustments */
        .timeline-indicator {
          background: #2563eb !important;
        }
        
        /* Skill cards */
        .skill-card {
          border: 1px solid #e5e7eb !important;
          background: white !important;
        }
        
        /* Experience cards */
        .experience-card {
          border: 1px solid #e5e7eb !important;
          background: white !important;
          margin-bottom: 1rem !important;
        }
        
        /* Project cards */
        .project-card {
          border: 1px solid #e5e7eb !important;
          background: white !important;
          margin-bottom: 1rem !important;
        }
        
        /* Contact section */
        .contact-card {
          border: 1px solid #e5e7eb !important;
          background: white !important;
        }
        
        /* Remove shadows and transforms */
        .shadow-xl,
        .shadow-lg,
        .shadow-2xl {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }
        
        .transform,
        .hover\\:transform {
          transform: none !important;
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
      
      /* PDF-specific styles when generating */
      .pdf-generating {
        background: white !important;
        color: black !important;
      }
      
      .pdf-generating * {
        animation: none !important;
        transition: none !important;
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
    `}</style>
  );
};

export default PDFStyles;
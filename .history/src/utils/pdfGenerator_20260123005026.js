import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async () => {
  try {
    // Show loading state
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; color: white; font-family: Inter, sans-serif;">
        <div style="text-align: center;">
          <div style="width: 40px; height: 40px; border: 4px solid #0ea5e9; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
          <div style="font-size: 18px; font-weight: 600;">Generating PDF...</div>
          <div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">This may take a few moments</div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
    `;
    document.body.appendChild(loadingElement);

    // Get all sections to capture
    const sections = [
      'hero',
      'skills', 
      'experience',
      'projects',
      'education',
      'contact'
    ];

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - (margin * 2);
    
    let currentY = margin;
    let isFirstPage = true;

    // Temporarily modify styles for better PDF rendering
    const originalStyles = {};
    const body = document.body;
    originalStyles.backgroundColor = body.style.backgroundColor;
    originalStyles.color = body.style.color;
    
    // Set light theme for PDF
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    document.documentElement.classList.remove('dark');

    for (let i = 0; i < sections.length; i++) {
      const sectionId = sections[i];
      const element = document.getElementById(sectionId);
      
      if (!element) continue;

      // Scroll to element to ensure it's in view
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
      
      // Wait for any animations or lazy loading
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture the section
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        windowHeight: 800
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Check if we need a new page
      if (!isFirstPage && (currentY + imgHeight > pageHeight - margin)) {
        pdf.addPage();
        currentY = margin;
      }

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
      currentY += imgHeight + 5;

      // Add page break after each major section except the last one
      if (i < sections.length - 1 && sectionId !== 'hero') {
        pdf.addPage();
        currentY = margin;
      }

      isFirstPage = false;
    }

    // Restore original styles
    body.style.backgroundColor = originalStyles.backgroundColor;
    body.style.color = originalStyles.color;
    document.documentElement.classList.add('dark');

    // Remove loading element
    document.body.removeChild(loadingElement);

    // Download the PDF
    const fileName = `Pranit_Sakunde_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    // Show success message
    showNotification('PDF generated successfully!', 'success');

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Remove loading element if it exists
    const loadingElement = document.querySelector('[style*="position: fixed"]');
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
    
    showNotification('Error generating PDF. Please try again.', 'error');
  }
};

// Utility function to show notifications
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0ea5e9';
  
  notification.innerHTML = `
    <div style="
      position: fixed; 
      top: 20px; 
      right: 20px; 
      background: ${bgColor}; 
      color: white; 
      padding: 16px 24px; 
      border-radius: 8px; 
      font-family: Inter, sans-serif; 
      font-weight: 500; 
      box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    ">
      ${message}
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
};
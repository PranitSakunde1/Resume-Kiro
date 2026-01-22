import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async () => {
  let loadingElement = null;
  
  try {
    // Show loading state
    loadingElement = document.createElement('div');
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

    // Store original styles
    const originalStyles = {
      backgroundColor: document.body.style.backgroundColor,
      color: document.body.style.color,
      classList: document.documentElement.classList.contains('dark')
    };
    
    // Set light theme for PDF
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    document.documentElement.classList.remove('dark');
    document.body.classList.add('pdf-generating');

    // Wait for theme change to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    for (let i = 0; i < sections.length; i++) {
      const sectionId = sections[i];
      const element = document.getElementById(sectionId);
      
      if (!element) {
        console.warn(`Section ${sectionId} not found, skipping...`);
        continue;
      }

      // Scroll to element to ensure it's in view
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
      
      // Wait for any animations or lazy loading
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if element has valid dimensions
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        console.warn(`Section ${sectionId} has zero dimensions, skipping...`);
        continue;
      }

      try {
        // Capture the section with improved options
        const canvas = await html2canvas(element, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: Math.max(element.scrollWidth, rect.width),
          height: Math.max(element.scrollHeight, rect.height),
          scrollX: 0,
          scrollY: 0,
          windowWidth: 1200,
          windowHeight: 800,
          ignoreElements: (element) => {
            // Skip elements that might cause issues
            return element.tagName === 'BUTTON' || 
                   element.classList.contains('animate-ping') ||
                   element.classList.contains('animate-pulse') ||
                   element.classList.contains('animate-bounce') ||
                   element.style.display === 'none';
          }
        });

        // Verify canvas is valid
        if (canvas.width === 0 || canvas.height === 0) {
          console.warn(`Canvas for section ${sectionId} has zero dimensions, skipping...`);
          continue;
        }

        const imgData = canvas.toDataURL('image/png', 0.95);
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

      } catch (sectionError) {
        console.warn(`Error capturing section ${sectionId}:`, sectionError);
        // Continue with next section instead of failing completely
        continue;
      }
    }

    // Restore original styles
    document.body.style.backgroundColor = originalStyles.backgroundColor;
    document.body.style.color = originalStyles.color;
    document.body.classList.remove('pdf-generating');
    
    if (originalStyles.classList) {
      document.documentElement.classList.add('dark');
    }

    // Remove loading element safely
    if (loadingElement && document.body.contains(loadingElement)) {
      document.body.removeChild(loadingElement);
      loadingElement = null;
    }

    // Download the PDF
    const fileName = `Pranit_Sakunde_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    // Show success message
    showNotification('PDF generated successfully!', 'success');

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Restore original styles in case of error
    try {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.classList.remove('pdf-generating');
      document.documentElement.classList.add('dark');
    } catch (restoreError) {
      console.warn('Error restoring styles:', restoreError);
    }
    
    // Remove loading element safely
    if (loadingElement && document.body.contains(loadingElement)) {
      try {
        document.body.removeChild(loadingElement);
      } catch (removeError) {
        console.warn('Error removing loading element:', removeError);
      }
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
      try {
        document.body.removeChild(notification);
      } catch (error) {
        console.warn('Error removing notification:', error);
      }
    }
  }, 3000);
};
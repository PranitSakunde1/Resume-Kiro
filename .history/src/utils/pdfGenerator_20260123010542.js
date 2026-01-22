import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';

export const generatePDF = async () => {
  let loadingElement = null;
  
  try {
    // Show loading state
    loadingElement = document.createElement('div');
    loadingElement.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; color: white; font-family: Inter, sans-serif;">
        <div style="text-align: center;">
          <div style="width: 40px; height: 40px; border: 4px solid #0ea5e9; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
          <div style="font-size: 18px; font-weight: 600;">Generating Professional PDF...</div>
          <div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">Creating clean, readable format</div>
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

    // Create PDF with professional formatting
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    let currentY = margin;
    const lineHeight = 6;
    const sectionSpacing = 12;
    const primaryColor = [37, 99, 235]; // Blue color
    const textColor = [31, 41, 55]; // Dark gray
    const lightGray = [156, 163, 175]; // Light gray

    // Helper functions
    const addText = (text, x, y, options = {}) => {
      const {
        fontSize = 10,
        fontStyle = 'normal',
        color = textColor,
        align = 'left',
        maxWidth = contentWidth
      } = options;
      
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      pdf.setTextColor(color[0], color[1], color[2]);
      
      if (align === 'center') {
        pdf.text(text, pageWidth / 2, y, { align: 'center' });
      } else if (align === 'right') {
        pdf.text(text, pageWidth - margin, y, { align: 'right' });
      } else {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return lines.length * lineHeight;
      }
      return lineHeight;
    };

    const addLine = (y, color = lightGray) => {
      pdf.setDrawColor(color[0], color[1], color[2]);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
    };

    const checkPageBreak = (requiredSpace) => {
      if (currentY + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
        return true;
      }
      return false;
    };

    // Header Section
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    // Name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(resumeData.personal.name, margin, 20);
    
    // Role
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(resumeData.personal.role, margin, 30);
    
    currentY = 50;

    // Contact Information
    const contactInfo = [
      `📧 ${resumeData.personal.email}`,
      `📱 ${resumeData.personal.phone}`,
      `📍 ${resumeData.personal.location}`,
      `💼 LinkedIn: ${resumeData.contact.linkedin.replace('https://www.', '')}`,
      `🔗 GitHub: ${resumeData.contact.github.replace('https://github.com/', '')}`
    ];

    pdf.setFontSize(9);
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    contactInfo.forEach((info, index) => {
      const x = margin + (index % 2) * (contentWidth / 2);
      const y = currentY + Math.floor(index / 2) * lineHeight;
      pdf.text(info, x, y);
    });
    
    currentY += Math.ceil(contactInfo.length / 2) * lineHeight + sectionSpacing;

    // Professional Summary
    checkPageBreak(30);
    addText('PROFESSIONAL SUMMARY', margin, currentY, { 
      fontSize: 14, 
      fontStyle: 'bold', 
      color: primaryColor 
    });
    currentY += lineHeight + 2;
    addLine(currentY);
    currentY += 6;
    
    const summaryHeight = addText(resumeData.personal.summary, margin, currentY, {
      fontSize: 10,
      maxWidth: contentWidth
    });
    currentY += summaryHeight + sectionSpacing;

    // Technical Skills
    checkPageBreak(50);
    addText('TECHNICAL SKILLS', margin, currentY, { 
      fontSize: 14, 
      fontStyle: 'bold', 
      color: primaryColor 
    });
    currentY += lineHeight + 2;
    addLine(currentY);
    currentY += 8;

    Object.entries(resumeData.skills).forEach(([category, skills]) => {
      checkPageBreak(15);
      
      // Category name
      addText(category, margin, currentY, { 
        fontSize: 11, 
        fontStyle: 'bold',
        color: textColor
      });
      currentY += lineHeight + 2;
      
      // Skills
      const skillsText = skills.join(' • ');
      const skillsHeight = addText(skillsText, margin + 5, currentY, {
        fontSize: 9,
        maxWidth: contentWidth - 5
      });
      currentY += skillsHeight + 6;
    });

    currentY += sectionSpacing - 6;

    // Professional Experience
    checkPageBreak(50);
    addText('PROFESSIONAL EXPERIENCE', margin, currentY, { 
      fontSize: 14, 
      fontStyle: 'bold', 
      color: primaryColor 
    });
    currentY += lineHeight + 2;
    addLine(currentY);
    currentY += 8;

    resumeData.experience.forEach((job, index) => {
      checkPageBreak(40);
      
      // Job title and company
      addText(job.position, margin, currentY, { 
        fontSize: 12, 
        fontStyle: 'bold',
        color: textColor
      });
      
      addText(job.duration, pageWidth - margin, currentY, { 
        fontSize: 10, 
        align: 'right',
        color: lightGray
      });
      currentY += lineHeight + 2;
      
      // Company and client info
      let companyText = job.company;
      if (job.client) {
        companyText += ` (Client: ${job.client})`;
      }
      addText(companyText, margin, currentY, { 
        fontSize: 10, 
        fontStyle: 'italic',
        color: primaryColor
      });
      currentY += lineHeight + 4;
      
      // Project and team info
      if (job.project || job.teamSize) {
        let projectInfo = '';
        if (job.project) projectInfo += `Project: ${job.project}`;
        if (job.teamSize) {
          if (projectInfo) projectInfo += ' | ';
          projectInfo += `Team Size: ${job.teamSize}`;
        }
        addText(projectInfo, margin, currentY, { 
          fontSize: 9, 
          color: lightGray
        });
        currentY += lineHeight + 2;
      }
      
      // Description
      const descHeight = addText(job.description, margin, currentY, {
        fontSize: 10,
        maxWidth: contentWidth
      });
      currentY += descHeight + 4;
      
      // Achievements
      if (job.achievements && job.achievements.length > 0) {
        addText('Key Achievements:', margin, currentY, { 
          fontSize: 10, 
          fontStyle: 'bold'
        });
        currentY += lineHeight + 2;
        
        job.achievements.forEach(achievement => {
          checkPageBreak(10);
          const achHeight = addText(`• ${achievement}`, margin + 5, currentY, {
            fontSize: 9,
            maxWidth: contentWidth - 5
          });
          currentY += achHeight + 2;
        });
      }
      
      currentY += sectionSpacing;
    });

    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      checkPageBreak(50);
      addText('KEY PROJECTS', margin, currentY, { 
        fontSize: 14, 
        fontStyle: 'bold', 
        color: primaryColor 
      });
      currentY += lineHeight + 2;
      addLine(currentY);
      currentY += 8;

      resumeData.projects.forEach(project => {
        checkPageBreak(30);
        
        // Project name
        addText(project.name, margin, currentY, { 
          fontSize: 11, 
          fontStyle: 'bold',
          color: textColor
        });
        currentY += lineHeight + 2;
        
        // Category and client
        let projectInfo = project.category;
        if (project.client) {
          projectInfo += ` | Client: ${project.client}`;
        }
        if (project.teamSize) {
          projectInfo += ` | Team: ${project.teamSize}`;
        }
        
        addText(projectInfo, margin, currentY, { 
          fontSize: 9, 
          color: primaryColor
        });
        currentY += lineHeight + 2;
        
        // Description
        const descHeight = addText(project.description, margin, currentY, {
          fontSize: 9,
          maxWidth: contentWidth
        });
        currentY += descHeight + 2;
        
        // Technologies
        const techText = `Technologies: ${project.technologies.join(', ')}`;
        const techHeight = addText(techText, margin, currentY, {
          fontSize: 8,
          color: lightGray,
          maxWidth: contentWidth
        });
        currentY += techHeight + 8;
      });
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      checkPageBreak(30);
      addText('EDUCATION', margin, currentY, { 
        fontSize: 14, 
        fontStyle: 'bold', 
        color: primaryColor 
      });
      currentY += lineHeight + 2;
      addLine(currentY);
      currentY += 8;

      resumeData.education.forEach(edu => {
        checkPageBreak(20);
        
        addText(edu.degree, margin, currentY, { 
          fontSize: 11, 
          fontStyle: 'bold'
        });
        
        addText(edu.year, pageWidth - margin, currentY, { 
          fontSize: 10, 
          align: 'right',
          color: lightGray
        });
        currentY += lineHeight + 2;
        
        addText(edu.institution, margin, currentY, { 
          fontSize: 10, 
          color: primaryColor
        });
        currentY += lineHeight;
        
        if (edu.location) {
          addText(edu.location, margin, currentY, { 
            fontSize: 9, 
            color: lightGray
          });
          currentY += lineHeight;
        }
        
        currentY += 6;
      });
    }

    // Footer
    const footerY = pageHeight - 15;
    addLine(footerY - 5);
    addText(`Generated on ${new Date().toLocaleDateString()}`, margin, footerY, {
      fontSize: 8,
      color: lightGray
    });
    
    addText('Pranit Sakunde - Technical Lead', pageWidth - margin, footerY, {
      fontSize: 8,
      color: lightGray,
      align: 'right'
    });

    // Remove loading element
    if (loadingElement && document.body.contains(loadingElement)) {
      document.body.removeChild(loadingElement);
      loadingElement = null;
    }

    // Download the PDF
    const fileName = `Pranit_Sakunde_Professional_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    // Show success message
    showNotification('Professional PDF generated successfully!', 'success');

  } catch (error) {
    console.error('Error generating PDF:', error);
    
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
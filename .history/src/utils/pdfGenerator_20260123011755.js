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
          <div style="font-size: 18px; font-weight: 600;">Generating Professional Resume...</div>
          <div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">Creating clean, ATS-friendly format</div>
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

    // Create PDF with exact formatting from sample
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    let currentY = 0;
    
    // Colors matching the sample
    const headerBlue = [66, 133, 244]; // Professional blue
    const sectionBlue = [66, 133, 244]; // Same blue for section headers
    const textDark = [51, 51, 51]; // Dark text
    const textMedium = [102, 102, 102]; // Medium gray
    const sectionBg = [240, 248, 255]; // Light blue background

    // Helper functions
    const addText = (text, x, y, options = {}) => {
      const {
        fontSize = 10,
        fontStyle = 'normal',
        color = textDark,
        align = 'left',
        maxWidth = contentWidth,
        lineSpacing = 4
      } = options;
      
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      pdf.setTextColor(color[0], color[1], color[2]);
      
      if (align === 'center') {
        pdf.text(text, pageWidth / 2, y, { align: 'center' });
        return lineSpacing;
      } else if (align === 'right') {
        pdf.text(text, pageWidth - margin, y, { align: 'right' });
        return lineSpacing;
      } else {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return lines.length * lineSpacing;
      }
    };

    const addSectionHeader = (title, y) => {
      // Light blue background rectangle
      pdf.setFillColor(sectionBg[0], sectionBg[1], sectionBg[2]);
      pdf.rect(margin, y - 3, contentWidth, 8, 'F');
      
      // Section title in blue
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(sectionBlue[0], sectionBlue[1], sectionBlue[2]);
      pdf.text(title, margin + 2, y + 1);
      
      return y + 12;
    };

    const checkPageBreak = (requiredSpace) => {
      if (currentY + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
        return true;
      }
      return false;
    };

    // HEADER SECTION - Blue background with white text
    pdf.setFillColor(headerBlue[0], headerBlue[1], headerBlue[2]);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    // Name - Large white text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text(resumeData.personal.name, margin, 20);
    
    // Role - Smaller white text
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text(resumeData.personal.role, margin, 32);
    
    currentY = 50;

    // CONTACT INFORMATION - Two columns with proper formatting
    pdf.setFontSize(10);
    pdf.setTextColor(textDark[0], textDark[1], textDark[2]);
    
    // Left column
    pdf.text(`Email: ${resumeData.personal.email}`, margin, currentY);
    pdf.text(`Location: ${resumeData.personal.location}`, margin, currentY + 5);
    
    // Right column  
    pdf.text(`Phone: ${resumeData.personal.phone}`, margin + 100, currentY);
    pdf.text(`LinkedIn: ${resumeData.contact.linkedin.replace('https://www.', '')}`, margin + 100, currentY + 5);
    
    currentY += 20;

    // PROFESSIONAL SUMMARY
    currentY = addSectionHeader('PROFESSIONAL SUMMARY', currentY);
    
    const summaryHeight = addText(resumeData.personal.summary, margin + 2, currentY, {
      fontSize: 10,
      maxWidth: contentWidth - 4,
      lineSpacing: 4.5,
      color: textDark
    });
    currentY += summaryHeight + 15;

    // TECHNICAL SKILLS
    currentY = addSectionHeader('TECHNICAL SKILLS', currentY);
    
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
      checkPageBreak(20);
      
      // Category name - Bold dark text
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(textDark[0], textDark[1], textDark[2]);
      pdf.text(category, margin + 2, currentY);
      currentY += 7;
      
      // Skills - Indented with bullet points
      const skillsText = skills.join(' • ');
      const skillsHeight = addText(skillsText, margin + 8, currentY, {
        fontSize: 10,
        maxWidth: contentWidth - 12,
        color: textMedium,
        lineSpacing: 4.5
      });
      currentY += skillsHeight + 8;
    });

    currentY += 10;

    // PROFESSIONAL EXPERIENCE
    currentY = addSectionHeader('PROFESSIONAL EXPERIENCE', currentY);

    resumeData.experience.forEach((job, index) => {
      checkPageBreak(60);
      
      // Job title - Bold
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(textDark[0], textDark[1], textDark[2]);
      pdf.text(job.position, margin + 2, currentY);
      
      // Duration - Right aligned
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(textMedium[0], textMedium[1], textMedium[2]);
      pdf.text(job.duration, pageWidth - margin, currentY, { align: 'right' });
      currentY += 7;
      
      // Company and client
      let companyText = job.company;
      if (job.client) {
        companyText += ` | Client: ${job.client}`;
      }
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(sectionBlue[0], sectionBlue[1], sectionBlue[2]);
      pdf.text(companyText, margin + 2, currentY);
      currentY += 7;
      
      // Project and team info
      if (job.project || job.teamSize) {
        let projectInfo = '';
        if (job.project) projectInfo += `Project: ${job.project}`;
        if (job.teamSize) {
          if (projectInfo) projectInfo += ' | ';
          projectInfo += `Team Size: ${job.teamSize}`;
        }
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(textMedium[0], textMedium[1], textMedium[2]);
        pdf.text(projectInfo, margin + 2, currentY);
        currentY += 6;
      }
      
      // Description
      const descHeight = addText(job.description, margin + 2, currentY, {
        fontSize: 10,
        maxWidth: contentWidth - 4,
        color: textDark,
        lineSpacing: 4.5
      });
      currentY += descHeight + 5;
      
      // Achievements with proper bullet points
      if (job.achievements && job.achievements.length > 0) {
        job.achievements.forEach(achievement => {
          checkPageBreak(10);
          
          // Bullet point
          pdf.setFontSize(10);
          pdf.setTextColor(sectionBlue[0], sectionBlue[1], sectionBlue[2]);
          pdf.text('•', margin + 4, currentY);
          
          // Achievement text
          const achHeight = addText(achievement, margin + 8, currentY, {
            fontSize: 10,
            maxWidth: contentWidth - 12,
            color: textDark,
            lineSpacing: 4.5
          });
          currentY += achHeight + 2;
        });
      }
      
      currentY += 12;
    });

    // KEY PROJECTS
    if (resumeData.projects && resumeData.projects.length > 0) {
      checkPageBreak(40);
      currentY = addSectionHeader('KEY PROJECTS', currentY);

      resumeData.projects.forEach(project => {
        checkPageBreak(35);
        
        // Project name - Bold
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(textDark[0], textDark[1], textDark[2]);
        pdf.text(project.name, margin + 2, currentY);
        currentY += 7;
        
        // Category and client info
        let projectInfo = project.category;
        if (project.client) {
          projectInfo += ` | Client: ${project.client}`;
        }
        if (project.teamSize) {
          projectInfo += ` | Team: ${project.teamSize}`;
        }
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(sectionBlue[0], sectionBlue[1], sectionBlue[2]);
        pdf.text(projectInfo, margin + 2, currentY);
        currentY += 6;
        
        // Description
        const descHeight = addText(project.description, margin + 2, currentY, {
          fontSize: 10,
          maxWidth: contentWidth - 4,
          color: textDark,
          lineSpacing: 4.5
        });
        currentY += descHeight + 4;
        
        // Technologies
        const techText = `Technologies: ${project.technologies.join(', ')}`;
        const techHeight = addText(techText, margin + 2, currentY, {
          fontSize: 9,
          color: textMedium,
          maxWidth: contentWidth - 4,
          lineSpacing: 4
        });
        currentY += techHeight + 10;
      });
    }

    // EDUCATION
    if (resumeData.education && resumeData.education.length > 0) {
      checkPageBreak(30);
      currentY = addSectionHeader('EDUCATION', currentY);

      resumeData.education.forEach(edu => {
        checkPageBreak(20);
        
        // Degree - Bold
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(textDark[0], textDark[1], textDark[2]);
        pdf.text(edu.degree, margin + 2, currentY);
        
        // Year - Right aligned
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(textMedium[0], textMedium[1], textMedium[2]);
        pdf.text(edu.year, pageWidth - margin, currentY, { align: 'right' });
        currentY += 7;
        
        // Institution
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(sectionBlue[0], sectionBlue[1], sectionBlue[2]);
        pdf.text(edu.institution, margin + 2, currentY);
        currentY += 6;
        
        // Location
        if (edu.location) {
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(textMedium[0], textMedium[1], textMedium[2]);
          pdf.text(edu.location, margin + 2, currentY);
          currentY += 5;
        }
        
        currentY += 8;
      });
    }

    // FOOTER
    const footerY = pageHeight - 8;
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(margin, footerY - 3, pageWidth - margin, footerY - 3);
    
    pdf.setFontSize(8);
    pdf.setTextColor(textMedium[0], textMedium[1], textMedium[2]);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, footerY);
    pdf.text(`${resumeData.personal.name} - ${resumeData.personal.role}`, pageWidth - margin, footerY, { align: 'right' });

    // Remove loading element
    if (loadingElement && document.body.contains(loadingElement)) {
      document.body.removeChild(loadingElement);
      loadingElement = null;
    }

    // Download the PDF
    const fileName = `${resumeData.personal.name.replace(' ', '_')}_Professional_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    // Show success message
    showNotification('Professional resume PDF generated successfully!', 'success');

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
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
          <div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">Creating ATS-friendly format</div>
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
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    let currentY = 0;
    const lineHeight = 5;
    const sectionSpacing = 8;
    const primaryBlue = [37, 99, 235];
    const darkGray = [51, 51, 51];
    const mediumGray = [102, 102, 102];
    const lightGray = [153, 153, 153];
    const sectionHeaderBg = [240, 248, 255];

    // Helper functions
    const addText = (text, x, y, options = {}) => {
      const {
        fontSize = 10,
        fontStyle = 'normal',
        color = darkGray,
        align = 'left',
        maxWidth = contentWidth,
        lineSpacing = lineHeight
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
      // Background rectangle for section header
      pdf.setFillColor(sectionHeaderBg[0], sectionHeaderBg[1], sectionHeaderBg[2]);
      pdf.rect(margin, y - 4, contentWidth, 8, 'F');
      
      // Section title
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.text(title, margin + 2, y + 1);
      
      return y + 10;
    };

    const addHorizontalLine = (y, color = lightGray, width = contentWidth) => {
      pdf.setDrawColor(color[0], color[1], color[2]);
      pdf.setLineWidth(0.3);
      pdf.line(margin, y, margin + width, y);
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
    pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.rect(0, 0, pageWidth, 35, 'F');
    
    // Name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text(resumeData.personal.name, margin, 18);
    
    // Role
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(resumeData.personal.role, margin, 28);
    
    currentY = 45;

    // CONTACT INFORMATION - Two columns
    const contactLeft = [
      `✉ ${resumeData.personal.email}`,
      `📍 ${resumeData.personal.location}`
    ];
    
    const contactRight = [
      `📱 ${resumeData.personal.phone}`,
      `💼 ${resumeData.contact.linkedin.replace('https://www.', '')}`
    ];

    pdf.setFontSize(9);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    contactLeft.forEach((info, index) => {
      pdf.text(info, margin, currentY + (index * 5));
    });
    
    contactRight.forEach((info, index) => {
      pdf.text(info, margin + (contentWidth / 2), currentY + (index * 5));
    });
    
    currentY += 18;

    // PROFESSIONAL SUMMARY
    currentY = addSectionHeader('PROFESSIONAL SUMMARY', currentY);
    
    const summaryHeight = addText(resumeData.personal.summary, margin + 2, currentY, {
      fontSize: 10,
      maxWidth: contentWidth - 4,
      lineSpacing: 4.5
    });
    currentY += summaryHeight + sectionSpacing;

    // TECHNICAL SKILLS
    currentY = addSectionHeader('TECHNICAL SKILLS', currentY);
    
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
      checkPageBreak(15);
      
      // Category name
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text(category, margin + 2, currentY);
      currentY += 6;
      
      // Skills with bullet points
      const skillsText = skills.join(' • ');
      const skillsHeight = addText(skillsText, margin + 8, currentY, {
        fontSize: 9,
        maxWidth: contentWidth - 10,
        color: mediumGray,
        lineSpacing: 4
      });
      currentY += skillsHeight + 4;
    });

    currentY += sectionSpacing;

    // PROFESSIONAL EXPERIENCE
    currentY = addSectionHeader('PROFESSIONAL EXPERIENCE', currentY);

    resumeData.experience.forEach((job, index) => {
      checkPageBreak(50);
      
      // Job title - bold
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text(job.position, margin + 2, currentY);
      
      // Duration - right aligned
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
      pdf.text(job.duration, pageWidth - margin, currentY, { align: 'right' });
      currentY += 6;
      
      // Company and client
      let companyText = job.company;
      if (job.client) {
        companyText += ` | Client: ${job.client}`;
      }
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.text(companyText, margin + 2, currentY);
      currentY += 6;
      
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
        pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
        pdf.text(projectInfo, margin + 2, currentY);
        currentY += 5;
      }
      
      // Description
      const descHeight = addText(job.description, margin + 2, currentY, {
        fontSize: 9,
        maxWidth: contentWidth - 4,
        color: darkGray,
        lineSpacing: 4
      });
      currentY += descHeight + 3;
      
      // Achievements with bullet points
      if (job.achievements && job.achievements.length > 0) {
        job.achievements.forEach(achievement => {
          checkPageBreak(8);
          
          // Bullet point
          pdf.setFontSize(8);
          pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
          pdf.text('•', margin + 4, currentY);
          
          // Achievement text
          const achHeight = addText(achievement, margin + 8, currentY, {
            fontSize: 9,
            maxWidth: contentWidth - 12,
            color: darkGray,
            lineSpacing: 4
          });
          currentY += achHeight + 1;
        });
      }
      
      currentY += sectionSpacing;
    });

    // KEY PROJECTS
    if (resumeData.projects && resumeData.projects.length > 0) {
      checkPageBreak(30);
      currentY = addSectionHeader('KEY PROJECTS', currentY);

      resumeData.projects.forEach(project => {
        checkPageBreak(25);
        
        // Project name
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        pdf.text(project.name, margin + 2, currentY);
        currentY += 5;
        
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
        pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
        pdf.text(projectInfo, margin + 2, currentY);
        currentY += 5;
        
        // Description
        const descHeight = addText(project.description, margin + 2, currentY, {
          fontSize: 9,
          maxWidth: contentWidth - 4,
          color: darkGray,
          lineSpacing: 4
        });
        currentY += descHeight + 2;
        
        // Technologies
        const techText = `Technologies: ${project.technologies.join(', ')}`;
        const techHeight = addText(techText, margin + 2, currentY, {
          fontSize: 8,
          color: mediumGray,
          maxWidth: contentWidth - 4,
          lineSpacing: 4
        });
        currentY += techHeight + 6;
      });
    }

    // EDUCATION
    if (resumeData.education && resumeData.education.length > 0) {
      checkPageBreak(25);
      currentY = addSectionHeader('EDUCATION', currentY);

      resumeData.education.forEach(edu => {
        checkPageBreak(15);
        
        // Degree
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        pdf.text(edu.degree, margin + 2, currentY);
        
        // Year
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
        pdf.text(edu.year, pageWidth - margin, currentY, { align: 'right' });
        currentY += 5;
        
        // Institution
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
        pdf.text(edu.institution, margin + 2, currentY);
        currentY += 4;
        
        // Location
        if (edu.location) {
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
          pdf.text(edu.location, margin + 2, currentY);
          currentY += 4;
        }
        
        currentY += 4;
      });
    }

    // FOOTER
    const footerY = pageHeight - 10;
    addHorizontalLine(footerY - 3, lightGray);
    
    pdf.setFontSize(7);
    pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, footerY);
    pdf.text(`${resumeData.personal.name} - ${resumeData.personal.role}`, pageWidth - margin, footerY, { align: 'right' });

    // Remove loading element
    if (loadingElement && document.body.contains(loadingElement)) {
      document.body.removeChild(loadingElement);
      loadingElement = null;
    }

    // Download the PDF
    const fileName = `${resumeData.personal.name.replace(' ', '_')}_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
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
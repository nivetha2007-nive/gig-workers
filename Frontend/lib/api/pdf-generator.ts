import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFReportData {
  score: number;
  creditGrade: string;
  userName: string;
  evaluationDate: string;
  pillars: Array<{
    title: string;
    score: number;
    maxScore: number;
    icon: string;
  }>;
  recommendedLoanAmount: number;
  interestRate: number;
  recommendedLoanTerm: number;
}

/**
 * Generate PDF report from HTML content
 */
export const generatePDFFromHTML = async (
  elementId: string,
  fileName: string
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    // Create canvas from HTML
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let yPosition = 0;
    let remainingHeight = imgHeight;

    // Add image to PDF, split across multiple pages if needed
    const imgData = canvas.toDataURL('image/png');

    while (remainingHeight > 0) {
      const pageHeightAvailable = pageHeight - 10; // 10mm margin
      const heightOnThisPage = Math.min(remainingHeight, pageHeightAvailable);

      pdf.addImage(imgData, 'PNG', 5, yPosition === 0 ? 5 : 0, imgWidth - 10, heightOnThisPage);

      remainingHeight -= heightOnThisPage;
      yPosition = heightOnThisPage;

      if (remainingHeight > 0) {
        pdf.addPage();
      }
    }

    // Download PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Generate comprehensive PDF report with structured data
 */
export const generateStructuredPDF = (data: PDFReportData): void => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;

  // Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('GigCredit Score Report', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;

  // User Info
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`User: ${data.userName}`, margin, yPosition);
  yPosition += 7;
  pdf.text(`Date: ${data.evaluationDate}`, margin, yPosition);
  yPosition += 12;

  // Score Summary Box
  pdf.setDrawColor(59, 130, 246);
  pdf.setFillColor(219, 234, 254);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 30, 'FD');

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(59, 130, 246);
  pdf.text(`Score: ${data.score}`, pageWidth / 2, yPosition + 10, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setTextColor(31, 41, 55);
  pdf.text(`Grade: ${data.creditGrade}`, pageWidth / 2, yPosition + 20, { align: 'center' });

  yPosition += 35;

  // Pillars Section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Credit Pillars', margin, yPosition);
  yPosition += 8;

  data.pillars.forEach((pillar) => {
    if (yPosition > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${pillar.icon} ${pillar.title}`, margin, yPosition);
    yPosition += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Score: ${pillar.score}/${pillar.maxScore}`,
      margin + 5,
      yPosition
    );
    yPosition += 7;

    // Progress bar
    const barWidth = pageWidth - 2 * margin - 10;
    const percentage = (pillar.score / pillar.maxScore) * 100;
    pdf.setDrawColor(229, 231, 235);
    pdf.rect(margin + 5, yPosition, barWidth, 2, 'FD');

    pdf.setDrawColor(59, 130, 246);
    pdf.rect(margin + 5, yPosition, (barWidth * percentage) / 100, 2, 'FD');

    yPosition += 8;
  });

  yPosition += 5;

  // Loan Recommendations
  if (yPosition > pageHeight - 40) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Loan Recommendations', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const recommendations = [
    ['Recommended Amount', `₹${data.recommendedLoanAmount.toLocaleString('en-IN')}`],
    ['Interest Rate', `${data.interestRate}% p.a.`],
    ['Recommended Term', `${data.recommendedLoanTerm} months`],
  ];

  recommendations.forEach(([label, value]) => {
    pdf.text(`${label}:`, margin, yPosition);
    pdf.setFont('helvetica', 'bold');
    pdf.text(value, pageWidth - margin - 40, yPosition);
    pdf.setFont('helvetica', 'normal');
    yPosition += 7;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    'This report is confidential and for evaluation purposes only.',
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  // Save
  pdf.save(`GigCredit_Report_${data.evaluationDate}.pdf`);
};

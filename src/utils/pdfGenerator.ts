
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Portfolio, SectionType } from '@/types';

export const generatePDF = async (portfolio: Portfolio) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const contentDiv = document.getElementById('portfolio-content');
  
  if (!contentDiv) return;
  
  const canvas = await html2canvas(contentDiv);
  const imgData = canvas.toDataURL('image/png');
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio);
  pdf.save(`${portfolio.slug}-portfolio.pdf`);
};

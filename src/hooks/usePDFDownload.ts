import { useCallback, useState } from 'react';

export interface UsePDFDownloadReturn {
  downloadPDF: () => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

export const usePDFDownload = (): UsePDFDownloadReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPDF = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Lazy load the PDF libraries
      const [jsPDFModule, html2canvas] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      const jsPDF = jsPDFModule.default;

      // Get the resume content element
      const resumeElement = document.querySelector('[data-resume-content]');
      if (!resumeElement) {
        throw new Error('Resume content not found');
      }

      // Configure html2canvas for better quality
      const canvas = await html2canvas.default(resumeElement as HTMLElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#1f2937', // Dark theme background
        width: resumeElement.scrollWidth,
        height: resumeElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - 2 * margin;
      const contentHeight = pageHeight - 2 * margin;

      // Calculate image dimensions to fit page
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const yPosition = margin;
      const imgData = canvas.toDataURL('image/png');

      // If content is taller than one page, split across multiple pages
      if (imgHeight > contentHeight) {
        const totalPages = Math.ceil(imgHeight / contentHeight);

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) {
            pdf.addPage();
          }

          const sourceY = i * contentHeight * (canvas.height / imgHeight);
          const sourceHeight = Math.min(
            contentHeight * (canvas.height / imgHeight),
            canvas.height - sourceY
          );

          // Create a new canvas for this page section
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');

          if (pageCtx) {
            pageCanvas.width = canvas.width;
            pageCanvas.height = sourceHeight;

            pageCtx.drawImage(
              canvas,
              0,
              sourceY,
              canvas.width,
              sourceHeight,
              0,
              0,
              canvas.width,
              sourceHeight
            );

            const pageImgData = pageCanvas.toDataURL('image/png');
            const pageImgHeight = (sourceHeight * imgWidth) / canvas.width;

            pdf.addImage(
              pageImgData,
              'PNG',
              margin,
              margin,
              imgWidth,
              pageImgHeight
            );
          }
        }
      } else {
        // Single page
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
      }

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `resume-${currentDate}.pdf`;

      // Download the PDF
      pdf.save(filename);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    downloadPDF,
    isGenerating,
    error,
  };
};

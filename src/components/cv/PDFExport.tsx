import { Button } from "@nextui-org/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PDFExportProps {
  previewRef: React.RefObject<HTMLDivElement>;
}

// A4 dimensions in points (pt)
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export function PDFExport({ previewRef }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      // Clone the preview element to modify it for PDF export
      const element = previewRef.current.cloneNode(true) as HTMLElement;
      
      // Create a temporary container with A4 dimensions
      const container = document.createElement('div');
      container.appendChild(element);
      container.style.width = `${A4_WIDTH_PX}px`;
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      // Apply A4 specific styles to the cloned element
      element.style.width = `${A4_WIDTH_PX}px`;
      element.style.height = 'auto';
      element.style.backgroundColor = 'white';
      element.style.padding = '40px';
      element.style.color = '#000000';

      // Force dark text for PDF export
      const textElements = element.querySelectorAll('*');
      textElements.forEach((el) => {
        (el as HTMLElement).style.color = '#000000';
      });

      // Create canvas with higher scale for better quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: A4_WIDTH_PX,
        height: element.offsetHeight,
        backgroundColor: '#ffffff',
      });

      // Remove the temporary container
      document.body.removeChild(container);

      // Calculate dimensions to fit A4
      const imgWidth = A4_WIDTH_PT;
      const imgHeight = (canvas.height * A4_WIDTH_PT) / canvas.width;

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      // Add the image to the PDF
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      // If content exceeds one page, add additional pages
      if (imgHeight > A4_HEIGHT_PT) {
        let remainingHeight = imgHeight;
        let currentPosition = -A4_HEIGHT_PT;

        while (remainingHeight > A4_HEIGHT_PT) {
          pdf.addPage();
          pdf.addImage(
            canvas.toDataURL('image/jpeg', 1.0),
            'JPEG',
            0,
            currentPosition,
            imgWidth,
            imgHeight,
            undefined,
            'FAST'
          );

          remainingHeight -= A4_HEIGHT_PT;
          currentPosition -= A4_HEIGHT_PT;
        }
      }

      // Save the PDF
      pdf.save('cv.pdf');
      toast.success("CV exported successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export CV");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      color="primary"
      variant="shadow"
      onClick={exportToPDF}
      isLoading={isExporting}
      startContent={<Download size={16} />}
    >
      Export PDF
    </Button>
  );
}
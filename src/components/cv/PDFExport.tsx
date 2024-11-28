import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { useState } from "react";

interface PDFExportProps {
  previewRef: React.RefObject<HTMLDivElement>;
}

export function PDFExport({ previewRef }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save("cv.pdf");
      
      toast.success("CV exported successfully!");
    } catch (error) {
      toast.error("Failed to export CV");
      console.error("PDF export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportToPDF} 
      disabled={isExporting}
      className="button-hover"
    >
      <Download className="mr-2 h-4 w-4" />
      {isExporting ? "Exporting..." : "Export PDF"}
    </Button>
  );
}
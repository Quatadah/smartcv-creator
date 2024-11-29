import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Wand2, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Confetti } from "@/components/cv/Confetti";
import { PDFExport } from "@/components/cv/PDFExport";
import { sampleCVData } from "@/utils/sampleCVData";
import { TemplateSelector } from "@/components/cv/TemplateSelector";
import { CVData } from "@/types/cv";

interface EditorHeaderProps {
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  setCvData: (data: CVData) => void;
  previewRef: React.RefObject<HTMLDivElement>;
  template: string;
  setTemplate: (template: string) => void;
}

export function EditorHeader({
  showConfetti,
  setShowConfetti,
  setCvData,
  previewRef,
  template,
  setTemplate,
}: EditorHeaderProps) {
  const handleAutoFill = () => {
    setCvData(sampleCVData);
    toast.success("CV fields have been filled with sample data");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleSave = () => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    toast.success("CV data saved successfully!");
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" className="hover-scale">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </Link>
              <TemplateSelector currentTemplate={template} onTemplateChange={setTemplate} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAutoFill} variant="outline" className="hover-scale">
                <Wand2 className="mr-2 h-4 w-4" /> Auto Fill
              </Button>
              <Button onClick={handleSave} variant="outline" className="hover-scale">
                <Save className="mr-2 h-4 w-4" /> Save Progress
              </Button>
              <PDFExport previewRef={previewRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
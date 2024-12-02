import { Button } from "@nextui-org/react";
import { ArrowLeft, Download, Wand2, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Confetti } from "@/components/cv/Confetti";
import { PDFExport } from "@/components/cv/PDFExport";
import { sampleCVData } from "@/utils/sampleCVData";
import { TemplateSelector } from "@/components/cv/TemplateSelector";
import { CVData } from "@/types/cv";
import { Progress } from "@nextui-org/react";

interface EditorHeaderProps {
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  setCvData: (data: CVData) => void;
  cvData: CVData;
  previewRef: React.RefObject<HTMLDivElement>;
  template: string;
  setTemplate: (template: string) => void;
}

export function EditorHeader({
  showConfetti,
  setShowConfetti,
  setCvData,
  cvData,
  previewRef,
  template,
  setTemplate,
}: EditorHeaderProps) {
  const calculateProgress = () => {
    let progress = 0;
    const sections = 5; // Personal Info, Summary, Experience, Education, Skills

    // Check Personal Info
    const personalInfoFilled = Object.values(cvData.personalInfo).some(value => value.length > 0);
    if (personalInfoFilled) progress++;

    // Check Summary
    if (cvData.summary.length > 0) progress++;

    // Check Experience
    if (cvData.experience.some(exp => Object.values(exp).some(value => value.length > 0))) progress++;

    // Check Education
    if (cvData.education.some(edu => Object.values(edu).some(value => value.length > 0))) progress++;

    // Check Skills
    if (cvData.skills.some(skill => skill.length > 0)) progress++;

    return (progress / sections) * 100;
  };

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
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="bordered" className="hover-scale">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </Link>
              <TemplateSelector currentTemplate={template} onTemplateChange={setTemplate} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAutoFill} variant="bordered" className="hover-scale">
                <Wand2 className="mr-2 h-4 w-4" /> Auto Fill
              </Button>
              <Button onClick={handleSave} variant="bordered" className="hover-scale">
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
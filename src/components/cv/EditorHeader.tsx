import { Button } from "@nextui-org/react";
import { ArrowLeft, Download, Wand2, Save, LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Confetti } from "@/components/cv/Confetti";
import { PDFExport } from "@/components/cv/PDFExport";
import { sampleCVData } from "@/utils/sampleCVData";
import { TemplateSelector } from "@/components/cv/TemplateSelector";
import { CVData } from "@/types/cv";
import { useAuth } from "@/contexts/AuthContext";

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
  const { logout } = useAuth();

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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/home">
                <Button variant="bordered" className="hover-scale">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </Link>
              <TemplateSelector currentTemplate={template} onTemplateChange={setTemplate} />
            </div>
            <div className="flex gap-2">
              <Link to="/home">
                <Button variant="bordered" className="hover-scale">
                  <Home className="mr-2 h-4 w-4" /> My Resumes
                </Button>
              </Link>
              <Button onClick={handleAutoFill} variant="bordered" className="hover-scale">
                <Wand2 className="mr-2 h-4 w-4" /> Auto Fill
              </Button>
              <Button onClick={handleSave} variant="bordered" className="hover-scale">
                <Save className="mr-2 h-4 w-4" /> Save Progress
              </Button>
              <PDFExport previewRef={previewRef} />
              <Button onClick={handleLogout} color="danger" variant="flat" className="hover-scale">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useState, useRef, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { EditorForm } from "@/components/cv/EditorForm";
import { PreviewSection } from "@/components/cv/PreviewSection";
import { EditorHeader } from "@/components/cv/EditorHeader";
import { CVData } from "@/types/cv";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.resumeData?.content || {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
  };

  const [cvData, setCvData] = useState<CVData>(initialData);
  const [template, setTemplate] = useState(location.state?.resumeData?.template || "modern");
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const previewRef = useRef<HTMLDivElement>(null);

  const saveResume = async () => {
    const resumeId = location.state?.resumeData?.id;
    const title = cvData.personalInfo.fullName 
      ? `${cvData.personalInfo.fullName}'s Resume` 
      : "Untitled Resume";

    if (resumeId) {
      // Update existing resume
      const { error } = await supabase
        .from('resumes')
        .update({
          title,
          content: cvData,
          template,
          updated_at: new Date().toISOString(),
        })
        .eq('id', resumeId);

      if (error) {
        toast.error('Error updating resume');
        return;
      }
      toast.success('Resume updated successfully');
    } else {
      // Create new resume
      const { error } = await supabase
        .from('resumes')
        .insert({
          title,
          content: cvData,
          template,
        });

      if (error) {
        toast.error('Error creating resume');
        return;
      }
      toast.success('Resume created successfully');
    }

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background">
      <EditorHeader
        showConfetti={showConfetti}
        setShowConfetti={setShowConfetti}
        setCvData={setCvData}
        cvData={cvData}
        previewRef={previewRef}
        template={template}
        setTemplate={setTemplate}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex gap-2 mb-6">
              {["personal", "summary", "experience", "education", "skills"].map(
                (section) => (
                  <Button
                    key={section}
                    variant={activeSection === section ? "solid" : "bordered"}
                    onClick={() => setActiveSection(section)}
                    className="capitalize"
                  >
                    {section}
                  </Button>
                )
              )}
            </div>
            <EditorForm
              cvData={cvData}
              setCvData={setCvData}
              activeSection={activeSection}
            />
          </div>
          <div ref={previewRef}>
            <PreviewSection cvData={cvData} template={template} />
          </div>
        </div>
        <div className="fixed bottom-8 right-8">
          <Button
            color="primary"
            size="lg"
            onClick={saveResume}
          >
            Save Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
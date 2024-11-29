import { useState, useRef } from "react";
import { CVData } from "@/types/cv";
import { EditorHeader } from "@/components/cv/EditorHeader";
import { EditorForm } from "@/components/cv/EditorForm";
import { PreviewSection } from "@/components/cv/PreviewSection";

const Editor = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: "",
    experience: [{
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    }],
    education: [{
      degree: "",
      institution: "",
      year: "",
      description: "",
    }],
    skills: [""],
  });

  const [template, setTemplate] = useState("modern");
  const [showConfetti, setShowConfetti] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
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
        <div className="grid md:grid-cols-2 gap-8 relative">
          <EditorForm cvData={cvData} setCvData={setCvData} />
          <div ref={previewRef}>
            <PreviewSection cvData={cvData} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
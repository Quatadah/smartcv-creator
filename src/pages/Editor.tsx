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
  const [activeSection, setActiveSection] = useState("personal");
  const previewRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "personal", label: "Personal Info" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
  ];

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
        <div className="grid grid-cols-12 gap-8 relative">
          {/* Left sidebar with sections */}
          <div className="col-span-3 space-y-2">
            <div className="glass-card p-4 sticky top-24">
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-white"
                        : "hover:bg-white/50"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="col-span-5">
            <EditorForm 
              cvData={cvData} 
              setCvData={setCvData} 
              activeSection={activeSection} 
            />
          </div>

          {/* Preview area */}
          <div className="col-span-4" ref={previewRef}>
            <PreviewSection cvData={cvData} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
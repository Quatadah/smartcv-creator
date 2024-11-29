import { useState, useRef } from "react";
import { CVData } from "@/types/cv";
import { EditorHeader } from "@/components/cv/EditorHeader";
import { EditorForm } from "@/components/cv/EditorForm";
import { PreviewSection } from "@/components/cv/PreviewSection";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

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
    { id: "personal", label: "Personal Info", step: 1 },
    { id: "summary", label: "Summary", step: 2 },
    { id: "experience", label: "Experience", step: 3 },
    { id: "education", label: "Education", step: 4 },
    { id: "skills", label: "Skills", step: 5 },
  ];

  const getStepStatus = (sectionId: string) => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const thisIndex = sections.findIndex(s => s.id === sectionId);
    return thisIndex < currentIndex ? "completed" : thisIndex === currentIndex ? "current" : "upcoming";
  };

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
          {/* Left sidebar with stepper */}
          <div className="col-span-3 space-y-2">
            <div className="glass-card p-6 sticky top-24">
              <div className="flex flex-col space-y-8">
                {sections.map((section, index) => (
                  <div key={section.id} className="relative">
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center space-x-3"
                    >
                      {/* Step circle with number or check */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                          getStepStatus(section.id) === "completed" 
                            ? "bg-primary border-primary text-white"
                            : getStepStatus(section.id) === "current"
                            ? "border-primary text-primary"
                            : "border-gray-300 text-gray-300"
                        )}
                      >
                        {getStepStatus(section.id) === "completed" ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{section.step}</span>
                        )}
                      </div>
                      
                      {/* Section label */}
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors",
                          getStepStatus(section.id) === "completed" || getStepStatus(section.id) === "current"
                            ? "text-primary"
                            : "text-gray-400"
                        )}
                      >
                        {section.label}
                      </span>
                    </button>

                    {/* Connecting line */}
                    {index < sections.length - 1 && (
                      <div 
                        className={cn(
                          "absolute left-4 top-8 w-0.5 h-8 -translate-x-1/2",
                          getStepStatus(section.id) === "completed"
                            ? "bg-primary"
                            : "bg-gray-200"
                        )}
                      />
                    )}
                  </div>
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
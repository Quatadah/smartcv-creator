import { EditorForm } from "@/components/cv/EditorForm";
import { EditorHeader } from "@/components/cv/EditorHeader";
import { PreviewSection } from "@/components/cv/PreviewSection";
import { Stepper } from "@/components/cv/Stepper";
import { CVData } from "@/types/cv";
import { useRef, useState } from "react";

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

  const handleNavigate = (direction: 'prev' | 'next') => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (direction === 'next' && currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
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
        <Stepper 
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="grid grid-cols-9 gap-8 relative">
          {/* Main content area */}
          <div className="col-span-5">
            <EditorForm 
              cvData={cvData} 
              setCvData={setCvData} 
              activeSection={activeSection} 
            />
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleNavigate('prev')}
                disabled={activeSection === sections[0].id}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => handleNavigate('next')}
                disabled={activeSection === sections[sections.length - 1].id}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            </div>
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
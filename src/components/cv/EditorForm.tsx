import { CVData } from "@/types/cv";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AIAssistant } from "./AIAssistant";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { SkillsSection } from "./SkillsSection";
import { CVAnalyzer } from "./CVAnalyzer";
import { useState } from "react";

interface EditorFormProps {
  cvData: CVData;
  setCvData: (data: CVData) => void;
}

export function EditorForm({ cvData, setCvData }: EditorFormProps) {
  const [activeSection, setActiveSection] = useState<string>("personal");

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoSection
            personalInfo={cvData.personalInfo}
            onUpdate={(field, value) => {
              setCvData({
                ...cvData,
                personalInfo: { ...cvData.personalInfo, [field]: value },
              });
            }}
          />
        );
      case "summary":
        return (
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
            <Textarea
              value={cvData.summary}
              onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
              placeholder="Write a brief professional summary..."
              className="min-h-[120px]"
            />
            <AIAssistant
              section="summary"
              currentContent={cvData.summary}
              onSuggestionApply={(suggestion) =>
                setCvData({ ...cvData, summary: suggestion })
              }
            />
          </Card>
        );
      case "experience":
        return (
          <ExperienceSection
            experience={cvData.experience}
            onUpdate={(index, field, value) => {
              const newExperience = [...cvData.experience];
              newExperience[index] = { ...newExperience[index], [field]: value };
              setCvData({ ...cvData, experience: newExperience });
            }}
            onAdd={() => {
              setCvData({
                ...cvData,
                experience: [
                  ...cvData.experience,
                  { title: "", company: "", startDate: "", endDate: "", description: "" },
                ],
              });
            }}
          />
        );
      case "education":
        return (
          <EducationSection
            education={cvData.education}
            onUpdate={(index, field, value) => {
              const newEducation = [...cvData.education];
              newEducation[index] = { ...newEducation[index], [field]: value };
              setCvData({ ...cvData, education: newEducation });
            }}
            onAdd={() => {
              setCvData({
                ...cvData,
                education: [
                  ...cvData.education,
                  { degree: "", institution: "", year: "", description: "" },
                ],
              });
            }}
          />
        );
      case "skills":
        return (
          <SkillsSection
            skills={cvData.skills}
            onUpdate={(index, value) => {
              const newSkills = [...cvData.skills];
              newSkills[index] = value;
              setCvData({ ...cvData, skills: newSkills });
            }}
            onAdd={() => {
              setCvData({
                ...cvData,
                skills: [...cvData.skills, ""],
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-up max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
      {renderSection()}
      <CVAnalyzer cvData={cvData} />
    </div>
  );
}
import { CVData } from "@/types/cv";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AIAssistant } from "./AIAssistant";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { SkillsSection } from "./SkillsSection";
import { CVAnalyzer } from "./CVAnalyzer";
import { SummarySection } from "./SummarySection";
import { LanguagesSection } from "./LanguagesSection";
import { CertificatesSection } from "./CertificatesSection";

interface EditorFormProps {
  cvData: CVData;
  setCvData: (data: CVData) => void;
  activeSection: string;
}

export function EditorForm({ cvData, setCvData, activeSection }: EditorFormProps) {
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
          <SummarySection
            summary={cvData.summary}
            onUpdate={(value) => setCvData({ ...cvData, summary: value })}
          />
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
      case "languages":
        return (
          <LanguagesSection
            languages={cvData.languages}
            onUpdate={(index, field, value) => {
              const newLanguages = [...cvData.languages];
              newLanguages[index] = { ...newLanguages[index], [field]: value };
              setCvData({ ...cvData, languages: newLanguages });
            }}
            onAdd={() => {
              setCvData({
                ...cvData,
                languages: [
                  ...cvData.languages,
                  { name: "", proficiency: "" },
                ],
              });
            }}
          />
        );
      case "certificates":
        return (
          <CertificatesSection
            certificates={cvData.certificates}
            onUpdate={(index, field, value) => {
              const newCertificates = [...cvData.certificates];
              newCertificates[index] = { ...newCertificates[index], [field]: value };
              setCvData({ ...cvData, certificates: newCertificates });
            }}
            onAdd={() => {
              setCvData({
                ...cvData,
                certificates: [
                  ...cvData.certificates,
                  { name: "", issuer: "", date: "", description: "" },
                ],
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
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sampleCVData } from "@/utils/sampleCVData";
import { toast } from "sonner";
import { AIAssistant } from "@/components/cv/AIAssistant";
import { CVAnalyzer } from "@/components/cv/CVAnalyzer";
import { CVData } from "@/types/cv";
import { PersonalInfoSection } from "@/components/cv/PersonalInfoSection";
import { ExperienceSection } from "@/components/cv/ExperienceSection";
import { EducationSection } from "@/components/cv/EducationSection";
import { SkillsSection } from "@/components/cv/SkillsSection";
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

  const handleAutoFill = () => {
    setCvData(sampleCVData);
    toast.success("CV fields have been filled with sample data");
  };

  const updatePersonalInfo = (field: keyof typeof cvData.personalInfo, value: string) => {
    setCvData({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, [field]: value },
    });
  };

  const updateExperience = (index: number, field: keyof typeof cvData.experience[0], value: string) => {
    const newExperience = [...cvData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setCvData({ ...cvData, experience: newExperience });
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      }],
    });
  };

  const updateEducation = (index: number, field: keyof typeof cvData.education[0], value: string) => {
    const newEducation = [...cvData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setCvData({ ...cvData, education: newEducation });
  };

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, {
        degree: "",
        institution: "",
        year: "",
        description: "",
      }],
    });
  };

  const updateSkills = (index: number, value: string) => {
    const newSkills = [...cvData.skills];
    newSkills[index] = value;
    setCvData({ ...cvData, skills: newSkills });
  };

  const addSkill = () => {
    setCvData({ ...cvData, skills: [...cvData.skills, ""] });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="button-hover">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button onClick={handleAutoFill} variant="outline" className="button-hover">
              <Wand2 className="mr-2 h-4 w-4" /> Auto Fill
            </Button>
            <Button className="button-hover">
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="space-y-6 animate-fade-up max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
            <PersonalInfoSection
              personalInfo={cvData.personalInfo}
              onUpdate={updatePersonalInfo}
            />

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

            <ExperienceSection
              experience={cvData.experience}
              onUpdate={updateExperience}
              onAdd={addExperience}
            />

            <EducationSection
              education={cvData.education}
              onUpdate={updateEducation}
              onAdd={addEducation}
            />

            <SkillsSection
              skills={cvData.skills}
              onUpdate={updateSkills}
              onAdd={addSkill}
            />

            <CVAnalyzer cvData={cvData} />
          </div>

          <PreviewSection cvData={cvData} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
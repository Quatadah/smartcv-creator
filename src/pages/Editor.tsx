import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  skills: string[];
}

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
          <Button className="button-hover">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6 animate-fade-up">
            {/* Personal Information */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={cvData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={cvData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Professional Summary */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
              <Textarea
                value={cvData.summary}
                onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
                placeholder="Write a brief professional summary..."
                className="min-h-[120px]"
              />
            </Card>

            {/* Work Experience */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
              {cvData.experience.map((exp, index) => (
                <div key={index} className="mb-6 space-y-4">
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(index, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addExperience} variant="outline" className="w-full">
                Add Experience
              </Button>
            </Card>

            {/* Education */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Education</h2>
              {cvData.education.map((edu, index) => (
                <div key={index} className="mb-6 space-y-4">
                  <div>
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(index, "year", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) => updateEducation(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addEducation} variant="outline" className="w-full">
                Add Education
              </Button>
            </Card>

            {/* Skills */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
              {cvData.skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <Input
                    value={skill}
                    onChange={(e) => updateSkills(index, e.target.value)}
                    placeholder="Enter a skill"
                  />
                </div>
              ))}
              <Button onClick={addSkill} variant="outline" className="w-full">
                Add Skill
              </Button>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
            <div className="space-y-6">
              {/* Personal Info Preview */}
              <div className="text-center border-b pb-6">
                <h1 className="text-3xl font-bold">{cvData.personalInfo.fullName || "Your Name"}</h1>
                <div className="text-gray-600 mt-2 space-y-1">
                  {cvData.personalInfo.email && <p>{cvData.personalInfo.email}</p>}
                  {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
                  {cvData.personalInfo.location && <p>{cvData.personalInfo.location}</p>}
                </div>
              </div>

              {/* Summary Preview */}
              {cvData.summary && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
                  <p className="text-gray-700">{cvData.summary}</p>
                </div>
              )}

              {/* Experience Preview */}
              {cvData.experience.some(exp => exp.title || exp.company) && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Work Experience</h2>
                  {cvData.experience.map((exp, index) => (
                    exp.title || exp.company ? (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                          </div>
                          <div className="text-gray-500 text-sm">
                            {exp.startDate && `${exp.startDate} - ${exp.endDate || "Present"}`}
                          </div>
                        </div>
                        {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {/* Education Preview */}
              {cvData.education.some(edu => edu.degree || edu.institution) && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Education</h2>
                  {cvData.education.map((edu, index) => (
                    edu.degree || edu.institution ? (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.institution}</p>
                          </div>
                          {edu.year && <div className="text-gray-500">{edu.year}</div>}
                        </div>
                        {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {/* Skills Preview */}
              {cvData.skills.some(skill => skill) && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill, index) => (
                      skill ? (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                        >
                          {skill}
                        </span>
                      ) : null
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
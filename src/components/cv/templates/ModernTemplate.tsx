import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function ModernTemplate({ cvData }: TemplateProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="text-black">
      <div className="flex items-start gap-6">
        {cvData.personalInfo.photo && (
          <img 
            src={cvData.personalInfo.photo} 
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
          />
        )}
        <div className="border-l-2 border-primary pl-4 flex-1">
          <h1 className="text-2xl font-bold">{cvData.personalInfo.fullName || "Your Name"}</h1>
          <div className="mt-1 space-y-0.5 text-sm">
            {cvData.personalInfo.email && <p>{cvData.personalInfo.email}</p>}
            {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
            {cvData.personalInfo.location && <p>{cvData.personalInfo.location}</p>}
          </div>
        </div>
      </div>

      {cvData.summary && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-1">Professional Summary</h2>
          <p className="text-sm">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
          {cvData.experience.map((exp, index) => (
            exp.title || exp.company ? (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium">{exp.title}</h3>
                    <p className="text-sm">{exp.company}</p>
                  </div>
                  <div className="text-xs">
                    {exp.startDate && `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                  </div>
                </div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        {cvData.education.some(edu => edu.degree || edu.institution) && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Education</h2>
            {cvData.education.map((edu, index) => (
              edu.degree || edu.institution ? (
                <div key={index} className="mb-3">
                  <h3 className="text-base font-medium">{edu.degree}</h3>
                  <p className="text-sm">{edu.institution}</p>
                  {edu.year && <p className="text-xs">{edu.year}</p>}
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        )}

        {cvData.skills.some(skill => skill) && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {cvData.skills.map((skill, index) => (
                skill ? (
                  <span
                    key={index}
                    className="bg-primary/5 px-2 py-0.5 rounded text-xs text-primary"
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
  );
}
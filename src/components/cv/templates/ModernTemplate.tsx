import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function ModernTemplate({ cvData }: TemplateProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-background rounded-lg shadow-lg p-8 space-y-6">
      <div className="border-l-4 border-primary pl-4">
        <h1 className="text-3xl font-bold text-foreground">{cvData.personalInfo.fullName || "Your Name"}</h1>
        <div className=" mt-2 space-y-1">
          {cvData.personalInfo.email && <p>{cvData.personalInfo.email}</p>}
          {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
          {cvData.personalInfo.location && <p>{cvData.personalInfo.location}</p>}
        </div>
      </div>

      {cvData.summary && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-primary text-foreground">Professional Summary</h2>
          <p className="text-foreground/80">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div>
          <h2 className="text-xl font-semibold mb-3 text-primary text-foreground">Work Experience</h2>
          {cvData.experience.map((exp, index) => (
            exp.title || exp.company ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.title}</h3>
                    <p className="">{exp.company}</p>
                  </div>
                  <div className=" text-sm">
                    {exp.startDate && `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                  </div>
                </div>
                {exp.description && <p className="text-foreground/80 mt-2">{exp.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {cvData.education.some(edu => edu.degree || edu.institution) && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-primary text-foreground">Education</h2>
            {cvData.education.map((edu, index) => (
              edu.degree || edu.institution ? (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="">{edu.institution}</p>
                  {edu.year && <p className="">{edu.year}</p>}
                  {edu.description && <p className="text-foreground/80 mt-2">{edu.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        )}

        {cvData.skills.some(skill => skill) && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                skill ? (
                  <span
                    key={index}
                    className="bg-accent px-3 py-1 rounded-full text-accent-foreground"
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
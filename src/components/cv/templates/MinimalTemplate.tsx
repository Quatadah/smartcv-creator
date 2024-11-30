import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function MinimalTemplate({ cvData }: TemplateProps) {
  return (
    <div className="bg-background rounded-lg shadow-lg p-8 max-w-3xl mx-auto space-y-6">
      <div className="text-center pb-6">
        <h1 className="text-4xl font-light tracking-wide text-foreground">{cvData.personalInfo.fullName || "Your Name"}</h1>
        <div className=" mt-2 flex items-center justify-center gap-4 text-sm">
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>•</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.location && <span>•</span>}
          {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
        </div>
      </div>

      {cvData.summary && (
        <div className="border-t border-border pt-6">
          <p className="text-foreground/80 text-center max-w-2xl mx-auto">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div className="border-t border-border pt-6">
          <h2 className="text-lg uppercase tracking-wider mb-4 font-light text-primary">Experience</h2>
          {cvData.experience.map((exp, index) => (
            exp.title || exp.company ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.title}</h3>
                    <p className=" text-sm">{exp.company}</p>
                  </div>
                  <div className=" text-sm">
                    {exp.startDate && `${exp.startDate} - ${exp.endDate || "Present"}`}
                  </div>
                </div>
                {exp.description && <p className="text-foreground/80 mt-2 text-sm">{exp.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      {cvData.education.some(edu => edu.degree || edu.institution) && (
        <div className="border-t border-border pt-6">
          <h2 className="text-lg uppercase tracking-wider mb-4 font-light text-primary">Education</h2>
          {cvData.education.map((edu, index) => (
            edu.degree || edu.institution ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{edu.degree}</h3>
                    <p className=" text-sm">{edu.institution}</p>
                  </div>
                  {edu.year && <div className=" text-sm">{edu.year}</div>}
                </div>
                {edu.description && <p className="text-foreground/80 mt-2 text-sm">{edu.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      {cvData.skills.some(skill => skill) && (
        <div className="border-t border-border pt-6">
          <h2 className="text-lg uppercase tracking-wider mb-4 font-light text-primary">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              skill ? (
                <span
                  key={index}
                  className="border border-border px-3 py-1 rounded-full  text-sm"
                >
                  {skill}
                </span>
              ) : null
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
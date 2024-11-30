import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function CompactTemplate({ cvData }: TemplateProps) {
  return (
    <div className="bg-background rounded-lg shadow-lg p-8 space-y-4">
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{cvData.personalInfo.fullName || "Your Name"}</h1>
          <div className=" text-sm space-y-1">
            {cvData.personalInfo.email && <p>{cvData.personalInfo.email}</p>}
            {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
          </div>
        </div>
        {cvData.personalInfo.location && (
          <div className="text-right  text-sm">
            {cvData.personalInfo.location}
          </div>
        )}
      </div>

      {cvData.summary && (
        <div className="text-sm">
          <p className="text-foreground/80">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div>
          <h2 className="text-lg font-semibold mb-2 text-foreground">Experience</h2>
          <div className="space-y-3">
            {cvData.experience.map((exp, index) => (
              exp.title || exp.company ? (
                <div key={index} className="text-sm">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium text-foreground">{exp.title}</span>
                      {exp.company && <span className=""> • {exp.company}</span>}
                    </div>
                    <div className="">
                      {exp.startDate && `${exp.startDate} - ${exp.endDate || "Present"}`}
                    </div>
                  </div>
                  {exp.description && <p className="text-foreground/80 mt-1">{exp.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {cvData.education.some(edu => edu.degree || edu.institution) && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-foreground">Education</h2>
            <div className="space-y-2">
              {cvData.education.map((edu, index) => (
                edu.degree || edu.institution ? (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-foreground">{edu.degree}</div>
                    <div className="">{edu.institution}</div>
                    {edu.year && <div className="">{edu.year}</div>}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}

        {cvData.skills.some(skill => skill) && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((skill, index) => (
                skill ? (
                  <span
                    key={index}
                    className="inline-block bg-accent px-2 py-0.5 text-sm text-accent-foreground rounded"
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
import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function ElegantTemplate({ cvData }: TemplateProps) {
  return (
    <div className="bg-background rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <div className="border-b-2 border-primary pb-6 mb-6">
        <h1 className="text-4xl font-serif text-center mb-4">{cvData.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center gap-6 text-sm">
          {cvData.personalInfo.email && (
            <span className="flex items-center">
              <span className="mr-2">✉</span>
              {cvData.personalInfo.email}
            </span>
          )}
          {cvData.personalInfo.phone && (
            <span className="flex items-center">
              <span className="mr-2">☏</span>
              {cvData.personalInfo.phone}
            </span>
          )}
          {cvData.personalInfo.location && (
            <span className="flex items-center">
              <span className="mr-2">⌖</span>
              {cvData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {cvData.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif mb-4 text-primary text-foreground">Professional Summary</h2>
          <p className="text-foreground/80 leading-relaxed">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif mb-4 text-primary text-foreground">Experience</h2>
          {cvData.experience.map((exp, index) => (
            exp.title || exp.company ? (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-medium text-foreground">{exp.title}</h3>
                  <span className=" text-sm">
                    {exp.startDate && `${exp.startDate} - ${exp.endDate || "Present"}`}
                  </span>
                </div>
                <p className=" mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-foreground/80 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {cvData.education.some(edu => edu.degree || edu.institution) && (
          <div>
            <h2 className="text-2xl font-serif mb-4 text-primary text-foreground">Education</h2>
            {cvData.education.map((edu, index) => (
              edu.degree || edu.institution ? (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium text-foreground">{edu.degree}</h3>
                  <p className="">{edu.institution}</p>
                  {edu.year && <p className="">{edu.year}</p>}
                  {edu.description && (
                    <p className="text-foreground/80 mt-2">{edu.description}</p>
                  )}
                </div>
              ) : null
            ))}
          </div>
        )}

        {cvData.skills.some(skill => skill) && (
          <div>
            <h2 className="text-2xl font-serif mb-4 text-primary text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                skill ? (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
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
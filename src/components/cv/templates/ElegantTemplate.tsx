import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function ElegantTemplate({ cvData }: TemplateProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-background rounded-lg border p-8 max-w-3xl mx-auto">
      <div className="border-b-2 border-primary pb-6 mb-6">
        <div className="flex items-center justify-center gap-6 mb-4">
          {cvData.personalInfo.photo && (
            <img 
              src={cvData.personalInfo.photo} 
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-primary/20"
            />
          )}
        </div>
        <h1 className="text-3xl font-serif text-center mb-4">{cvData.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center gap-6 text-xs">
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
          <h2 className="text-xl font-serif mb-4 text-primary text-foreground">Professional Summary</h2>
          <p className="text-foreground/80 leading-relaxed text-sm">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div className="mb-8">
          <h2 className="text-xl font-serif mb-4 text-primary text-foreground">Experience</h2>
          {cvData.experience.map((exp, index) => (
            exp.title || exp.company ? (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium text-foreground">{exp.title}</h3>
                  <span className="text-xs">
                    {exp.startDate && `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                  </span>
                </div>
                <p className="mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="mt-2 text-foreground/80 text-sm">{exp.description}</p>
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

        {cvData.languages.some(lang => lang.name) && (
          <div>
            <h2 className="text-2xl font-serif mb-4 text-primary">Languages</h2>
            <div className="space-y-2">
              {cvData.languages.map((lang, index) => (
                lang.name ? (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{lang.name}</span>
                    {lang.proficiency && <span className="ml-2 opacity-80">- {lang.proficiency}</span>}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
      </div>

      {cvData.certificates.some(cert => cert.name) && (
        <div className="mt-8">
          <h2 className="text-2xl font-serif mb-4 text-primary">Certificates</h2>
          <div className="space-y-4">
            {cvData.certificates.map((cert, index) => (
              cert.name ? (
                <div key={index}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{cert.name}</h3>
                      <p className="text-sm opacity-80">{cert.issuer}</p>
                    </div>
                    {cert.date && <p className="text-sm">{formatDate(cert.date)}</p>}
                  </div>
                  {cert.description && <p className="mt-1 text-sm opacity-80">{cert.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

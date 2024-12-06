import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function ProfessionalTemplate({ cvData }: TemplateProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-background rounded-lg border p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-start border-b border-primary/20 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            {cvData.personalInfo.photo && (
              <img 
                src={cvData.personalInfo.photo} 
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
              />
            )}
            <div>
              <h1 className="text-2xl font-semibold text-primary">{cvData.personalInfo.fullName || "Your Name"}</h1>
              <div className="text-xs space-y-1 text-muted-foreground">
                {cvData.personalInfo.email && <div>{cvData.personalInfo.email}</div>}
                {cvData.personalInfo.phone && <div>{cvData.personalInfo.phone}</div>}
                {cvData.personalInfo.location && <div>{cvData.personalInfo.location}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {cvData.summary && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Professional Summary</h2>
          <p className="text-foreground/80 text-sm">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Professional Experience</h2>
          {cvData.experience.map((exp, index) => (
            exp.title || exp.company ? (
              <div key={index} className="mb-4 border-l-2 border-primary/20 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-foreground text-base">{exp.title}</h3>
                    <p className="text-sm">{exp.company}</p>
                  </div>
                  <div className="text-xs">
                    {exp.startDate && `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                  </div>
                </div>
                {exp.description && <p className="text-foreground/80 mt-2 text-sm">{exp.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      {cvData.education.some(edu => edu.degree || edu.institution) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Education</h2>
          {cvData.education.map((edu, index) => (
            edu.degree || edu.institution ? (
              <div key={index} className="mb-4 border-l-2 border-primary/20 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-foreground">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.year}
                  </div>
                </div>
                {edu.description && <p className="mt-2 text-foreground/80">{edu.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      {cvData.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {cvData.languages.some(lang => lang.name) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Languages</h2>
          <div className="grid grid-cols-2 gap-2">
            {cvData.languages.map((lang, index) => (
              lang.name ? (
                <div key={index} className="text-sm">
                  <span className="font-medium">{lang.name}</span>
                  {lang.proficiency && (
                    <span className="ml-2 text-muted-foreground">- {lang.proficiency}</span>
                  )}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {cvData.certificates.some(cert => cert.name) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Certificates</h2>
          <div className="space-y-4">
            {cvData.certificates.map((cert, index) => (
              cert.name ? (
                <div key={index} className="border-l-2 border-primary/20 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-muted-foreground">{cert.issuer}</p>
                    </div>
                    {cert.date && <div className="text-sm text-muted-foreground">{formatDate(cert.date)}</div>}
                  </div>
                  {cert.description && <p className="mt-2 text-sm">{cert.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function CreativeTemplate({ cvData }: TemplateProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-background rounded-lg border p-8 max-w-3xl mx-auto">
      <div className="relative mb-12">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full" />
        <div className="relative flex items-start gap-6">
          {cvData.personalInfo.photo && (
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-32 h-32 bg-primary/5 rounded-full animate-pulse" />
              <img 
                src={cvData.personalInfo.photo} 
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-primary/20 relative"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {cvData.personalInfo.fullName || "Your Name"}
            </h1>
            {cvData.personalInfo.email && (
              <h2 className="text-xl mt-2 text-muted-foreground font-light">{cvData.personalInfo.email}</h2>
            )}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {cvData.personalInfo.email}
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {cvData.personalInfo.phone}
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {cvData.personalInfo.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cvData.summary && (
        <div className="relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-primary/20 rounded-full" />
          <div className="pl-6">
            <h2 className="text-lg font-medium mb-2 text-primary">About Me</h2>
            <p className="text-foreground/80 italic">{cvData.summary}</p>
          </div>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4 text-primary">Experience</h2>
          <div className="space-y-6">
            {cvData.experience.map((exp, index) => (
              exp.title || exp.company ? (
                <div key={index} className="relative group">
                  <div className="absolute -left-2 top-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors rounded-full" />
                  <div className="pl-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exp.startDate && `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}`}
                      </div>
                    </div>
                    {exp.description && <p className="mt-2 text-foreground/80">{exp.description}</p>}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {cvData.education.some(edu => edu.degree || edu.institution) && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4 text-primary">Education</h2>
          <div className="space-y-6">
            {cvData.education.map((edu, index) => (
              edu.degree || edu.institution ? (
                <div key={index} className="relative group">
                  <div className="absolute -left-2 top-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors rounded-full" />
                  <div className="pl-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.year}
                      </div>
                    </div>
                    {edu.description && <p className="mt-2 text-foreground/80">{edu.description}</p>}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {cvData.skills.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4 text-primary">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-full text-sm transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
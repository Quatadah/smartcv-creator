import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function MinimalTemplate({ cvData }: TemplateProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto space-y-6">
      <div className="text-center pb-6">
        <h1 className="text-4xl font-light tracking-wide">{cvData.personalInfo.fullName || "Your Name"}</h1>
        <div className="text-gray-600 mt-2 flex items-center justify-center gap-4 text-sm">
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>•</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.location && <span>•</span>}
          {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
        </div>
      </div>

      {cvData.summary && (
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 text-center max-w-2xl mx-auto">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg uppercase tracking-wider mb-4 font-light">Experience</h2>
          {cvData.experience.map((exp, index) => (
            exp.title || exp.company ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {exp.startDate && `${exp.startDate} - ${exp.endDate || "Present"}`}
                  </div>
                </div>
                {exp.description && <p className="text-gray-700 mt-2 text-sm">{exp.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      {cvData.education.some(edu => edu.degree || edu.institution) && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg uppercase tracking-wider mb-4 font-light">Education</h2>
          {cvData.education.map((edu, index) => (
            edu.degree || edu.institution ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                  </div>
                  {edu.year && <div className="text-gray-500 text-sm">{edu.year}</div>}
                </div>
                {edu.description && <p className="text-gray-700 mt-2 text-sm">{edu.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      {cvData.skills.some(skill => skill) && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg uppercase tracking-wider mb-4 font-light">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              skill ? (
                <span
                  key={index}
                  className="border border-gray-200 px-3 py-1 rounded-full text-gray-600 text-sm"
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
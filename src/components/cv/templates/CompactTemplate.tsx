import { CVData } from "@/types/cv";

interface TemplateProps {
  cvData: CVData;
}

export function CompactTemplate({ cvData }: TemplateProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">{cvData.personalInfo.fullName || "Your Name"}</h1>
          <div className="text-gray-600 text-sm space-y-1">
            {cvData.personalInfo.email && <p>{cvData.personalInfo.email}</p>}
            {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
          </div>
        </div>
        {cvData.personalInfo.location && (
          <div className="text-right text-gray-600 text-sm">
            {cvData.personalInfo.location}
          </div>
        )}
      </div>

      {cvData.summary && (
        <div className="text-sm">
          <p className="text-gray-700">{cvData.summary}</p>
        </div>
      )}

      {cvData.experience.some(exp => exp.title || exp.company) && (
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Experience</h2>
          <div className="space-y-3">
            {cvData.experience.map((exp, index) => (
              exp.title || exp.company ? (
                <div key={index} className="text-sm">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">{exp.title}</span>
                      {exp.company && <span className="text-gray-600"> • {exp.company}</span>}
                    </div>
                    <div className="text-gray-500">
                      {exp.startDate && `${exp.startDate} - ${exp.endDate || "Present"}`}
                    </div>
                  </div>
                  {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {cvData.education.some(edu => edu.degree || edu.institution) && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Education</h2>
            <div className="space-y-2">
              {cvData.education.map((edu, index) => (
                edu.degree || edu.institution ? (
                  <div key={index} className="text-sm">
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-gray-600">{edu.institution}</div>
                    {edu.year && <div className="text-gray-500">{edu.year}</div>}
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}

        {cvData.skills.some(skill => skill) && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((skill, index) => (
                skill ? (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 px-2 py-0.5 text-sm text-gray-700 rounded"
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
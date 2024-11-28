import { CVData } from "@/types/cv";

interface PreviewSectionProps {
  cvData: CVData;
}

export function PreviewSection({ cvData }: PreviewSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in h-[calc(100vh-8rem)] overflow-y-auto sticky top-8">
      <div className="space-y-6">
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold">{cvData.personalInfo.fullName || "Your Name"}</h1>
          <div className="text-gray-600 mt-2 space-y-1">
            {cvData.personalInfo.email && <p>{cvData.personalInfo.email}</p>}
            {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
            {cvData.personalInfo.location && <p>{cvData.personalInfo.location}</p>}
          </div>
        </div>

        {cvData.summary && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
            <p className="text-gray-700">{cvData.summary}</p>
          </div>
        )}

        {cvData.experience.some(exp => exp.title || exp.company) && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Work Experience</h2>
            {cvData.experience.map((exp, index) => (
              exp.title || exp.company ? (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {exp.startDate && `${exp.startDate} - ${exp.endDate || "Present"}`}
                    </div>
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        )}

        {cvData.education.some(edu => edu.degree || edu.institution) && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Education</h2>
            {cvData.education.map((edu, index) => (
              edu.degree || edu.institution ? (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    {edu.year && <div className="text-gray-500">{edu.year}</div>}
                  </div>
                  {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        )}

        {cvData.skills.some(skill => skill) && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                skill ? (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
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
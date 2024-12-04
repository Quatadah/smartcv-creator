import { CVData } from "@/types/cv";

export const sampleCVData: CVData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
  },
  summary: "Experienced professional with a track record of success in...",
  experience: [
    {
      title: "Senior Developer",
      company: "Tech Corp",
      startDate: "2020-01-01",
      endDate: "2023-12-31",
      description: "Led development team and implemented key features...",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2019",
      description: "Graduated with honors, specialized in software engineering",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
  ],
  languages: [
    {
      name: "English",
      proficiency: "Native"
    },
    {
      name: "Spanish",
      proficiency: "Intermediate"
    }
  ],
  certificates: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2022-06-15",
      description: "Advanced cloud development certification"
    }
  ]
};
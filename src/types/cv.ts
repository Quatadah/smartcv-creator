export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  title: string;
  company: string;
  startDate: Date | string;
  endDate: Date | string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: Date | string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}
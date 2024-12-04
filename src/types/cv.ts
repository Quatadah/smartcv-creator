export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  photo?: string;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  certificates: Certificate[];
}
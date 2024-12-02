export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
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

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}
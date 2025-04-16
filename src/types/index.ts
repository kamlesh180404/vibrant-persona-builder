// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface AuthUser extends User {
  token: string;
}

// Portfolio related types
export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  summary: string;
  slug: string;
  isPublic: boolean;
  theme: string;
  sections: PortfolioSection[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSection {
  id: string;
  portfolioId: string;
  type: SectionType;
  title: string;
  order: number;
  content: any; // Will vary based on section type
}

export enum SectionType {
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CONTACT = 'contact',
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: number; // 1-5
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface JobDescription {
  title: string;
  description: string;
  keywords: string[];
}

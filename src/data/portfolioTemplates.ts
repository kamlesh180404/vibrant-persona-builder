
import { Portfolio, SectionType } from '@/types';

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  sections: {
    type: SectionType;
    title: string;
    order: number;
  }[];
}

export const portfolioTemplates: PortfolioTemplate[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple layout focusing on content',
    preview: '/templates/minimal.png',
    sections: [
      { type: SectionType.ABOUT, title: 'About Me', order: 1 },
      { type: SectionType.EXPERIENCE, title: 'Experience', order: 2 },
      { type: SectionType.SKILLS, title: 'Skills', order: 3 },
      { type: SectionType.CONTACT, title: 'Contact', order: 4 },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional corporate-style layout',
    preview: '/templates/professional.png',
    sections: [
      { type: SectionType.ABOUT, title: 'Professional Summary', order: 1 },
      { type: SectionType.EXPERIENCE, title: 'Work Experience', order: 2 },
      { type: SectionType.EDUCATION, title: 'Education', order: 3 },
      { type: SectionType.SKILLS, title: 'Skills & Expertise', order: 4 },
      { type: SectionType.PROJECTS, title: 'Key Projects', order: 5 },
      { type: SectionType.CONTACT, title: 'Contact Information', order: 6 },
    ],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern design for creative professionals',
    preview: '/templates/creative.png',
    sections: [
      { type: SectionType.ABOUT, title: 'Hello, World!', order: 1 },
      { type: SectionType.PROJECTS, title: 'Featured Work', order: 2 },
      { type: SectionType.SKILLS, title: 'Toolkit', order: 3 },
      { type: SectionType.EXPERIENCE, title: 'Journey', order: 4 },
      { type: SectionType.CONTACT, title: "Let's Connect", order: 5 },
    ],
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Perfect for developers and IT professionals',
    preview: '/templates/technical.png',
    sections: [
      { type: SectionType.ABOUT, title: 'Profile', order: 1 },
      { type: SectionType.SKILLS, title: 'Technical Skills', order: 2 },
      { type: SectionType.PROJECTS, title: 'Projects & Contributions', order: 3 },
      { type: SectionType.EXPERIENCE, title: 'Work Experience', order: 4 },
      { type: SectionType.EDUCATION, title: 'Education & Certifications', order: 5 },
      { type: SectionType.CONTACT, title: 'Contact', order: 6 },
    ],
  },
  {
    id: 'researcher',
    name: 'Academic',
    description: 'Ideal for researchers and educators',
    preview: '/templates/researcher.png',
    sections: [
      { type: SectionType.ABOUT, title: 'Research Focus', order: 1 },
      { type: SectionType.EDUCATION, title: 'Academic Background', order: 2 },
      { type: SectionType.EXPERIENCE, title: 'Research Experience', order: 3 },
      { type: SectionType.PROJECTS, title: 'Publications & Projects', order: 4 },
      { type: SectionType.SKILLS, title: 'Research Skills', order: 5 },
      { type: SectionType.CONTACT, title: 'Contact Details', order: 6 },
    ],
  },
];

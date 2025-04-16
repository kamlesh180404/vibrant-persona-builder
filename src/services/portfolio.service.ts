
import api from './api';
import { Portfolio, PortfolioSection, SectionType } from '@/types';

// For development purposes - simulating API responses
const MOCK_MODE = true;
const MOCK_DELAY = 800;

// Mock data
const MOCK_PORTFOLIOS: Portfolio[] = [
  {
    id: 'portfolio-1',
    userId: 'user-123',
    title: 'John Doe - Software Developer',
    summary: 'Full-stack developer with 5+ years experience in web development',
    slug: 'john-doe',
    isPublic: true,
    theme: 'default',
    sections: [
      {
        id: 'section-1',
        portfolioId: 'portfolio-1',
        type: SectionType.ABOUT,
        title: 'About Me',
        order: 1,
        content: {
          text: 'I am a passionate software developer with experience in web and mobile development. I love creating beautiful and functional applications that solve real-world problems.',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        id: 'section-2',
        portfolioId: 'portfolio-1',
        type: SectionType.EXPERIENCE,
        title: 'Work Experience',
        order: 2,
        content: [
          {
            id: 'exp-1',
            company: 'Tech Innovators Inc.',
            position: 'Senior Developer',
            location: 'San Francisco, CA',
            startDate: '2021-01-01',
            current: true,
            description: 'Leading development of enterprise web applications using React, Node.js, and AWS.',
          },
          {
            id: 'exp-2',
            company: 'Digital Solutions LLC',
            position: 'Web Developer',
            location: 'Boston, MA',
            startDate: '2018-06-01',
            endDate: '2020-12-31',
            current: false,
            description: 'Developed responsive websites and e-commerce solutions using modern JavaScript frameworks.',
          },
        ],
      },
      {
        id: 'section-3',
        portfolioId: 'portfolio-1',
        type: SectionType.EDUCATION,
        title: 'Education',
        order: 3,
        content: [
          {
            id: 'edu-1',
            institution: 'Massachusetts Institute of Technology',
            degree: 'Master of Computer Science',
            field: 'Software Engineering',
            location: 'Cambridge, MA',
            startDate: '2016-09-01',
            endDate: '2018-05-31',
            current: false,
          },
          {
            id: 'edu-2',
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            location: 'Berkeley, CA',
            startDate: '2012-09-01',
            endDate: '2016-05-31',
            current: false,
          },
        ],
      },
      {
        id: 'section-4',
        portfolioId: 'portfolio-1',
        type: SectionType.SKILLS,
        title: 'Skills',
        order: 4,
        content: [
          { id: 'skill-1', name: 'React', level: 5, category: 'Frontend' },
          { id: 'skill-2', name: 'TypeScript', level: 4, category: 'Frontend' },
          { id: 'skill-3', name: 'Node.js', level: 4, category: 'Backend' },
          { id: 'skill-4', name: '.NET Core', level: 3, category: 'Backend' },
          { id: 'skill-5', name: 'AWS', level: 4, category: 'DevOps' },
          { id: 'skill-6', name: 'Azure', level: 3, category: 'DevOps' },
          { id: 'skill-7', name: 'SQL', level: 4, category: 'Database' },
          { id: 'skill-8', name: 'MongoDB', level: 3, category: 'Database' },
        ],
      },
      {
        id: 'section-5',
        portfolioId: 'portfolio-1',
        type: SectionType.PROJECTS,
        title: 'Projects',
        order: 5,
        content: [
          {
            id: 'proj-1',
            title: 'E-commerce Platform',
            description: 'A full-featured e-commerce platform with product management, user authentication, and payment processing.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            liveUrl: 'https://example.com',
            repoUrl: 'https://github.com/example/repo',
          },
          {
            id: 'proj-2',
            title: 'Task Management App',
            description: 'A Kanban-style task management application for teams with real-time updates.',
            technologies: ['React', 'Firebase', 'Material UI'],
            imageUrl: 'https://images.unsplash.com/photo-1611224885990-ab7363d7f2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            liveUrl: 'https://example.com',
            repoUrl: 'https://github.com/example/repo',
          },
        ],
      },
      {
        id: 'section-6',
        portfolioId: 'portfolio-1',
        type: SectionType.CONTACT,
        title: 'Contact Information',
        order: 6,
        content: {
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          website: 'https://johndoe.com',
          location: 'San Francisco, CA',
          socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
            { platform: 'GitHub', url: 'https://github.com/johndoe' },
            { platform: 'Twitter', url: 'https://twitter.com/johndoe' },
          ],
        },
      },
    ],
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-06-20T15:30:00Z',
  }
];

// Mock functions
const mockGetPortfolios = async (userId: string): Promise<Portfolio[]> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return MOCK_PORTFOLIOS.filter(p => p.userId === userId);
};

const mockGetPortfolioById = async (id: string): Promise<Portfolio> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const portfolio = MOCK_PORTFOLIOS.find(p => p.id === id);
  if (!portfolio) {
    throw new Error('Portfolio not found');
  }
  return portfolio;
};

const mockGetPortfolioBySlug = async (slug: string): Promise<Portfolio> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const portfolio = MOCK_PORTFOLIOS.find(p => p.slug === slug);
  if (!portfolio) {
    throw new Error('Portfolio not found');
  }
  return portfolio;
};

const mockCreatePortfolio = async (portfolio: Partial<Portfolio>): Promise<Portfolio> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const newPortfolio: Portfolio = {
    id: `portfolio-${Date.now()}`,
    userId: portfolio.userId || 'user-123',
    title: portfolio.title || 'Untitled Portfolio',
    summary: portfolio.summary || '',
    slug: portfolio.slug || `untitled-${Date.now()}`,
    isPublic: portfolio.isPublic || false,
    theme: portfolio.theme || 'default',
    sections: portfolio.sections || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newPortfolio;
};

const mockUpdatePortfolio = async (id: string, updates: Partial<Portfolio>): Promise<Portfolio> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const portfolio = MOCK_PORTFOLIOS.find(p => p.id === id);
  if (!portfolio) {
    throw new Error('Portfolio not found');
  }
  const updatedPortfolio = { ...portfolio, ...updates, updatedAt: new Date().toISOString() };
  return updatedPortfolio;
};

const mockDeletePortfolio = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
};

// Real API functions
const apiGetPortfolios = async (userId: string): Promise<Portfolio[]> => {
  const response = await api.get(`/portfolios?userId=${userId}`);
  return response.data;
};

const apiGetPortfolioById = async (id: string): Promise<Portfolio> => {
  const response = await api.get(`/portfolios/${id}`);
  return response.data;
};

const apiGetPortfolioBySlug = async (slug: string): Promise<Portfolio> => {
  const response = await api.get(`/portfolios/slug/${slug}`);
  return response.data;
};

const apiCreatePortfolio = async (portfolio: Partial<Portfolio>): Promise<Portfolio> => {
  const response = await api.post('/portfolios', portfolio);
  return response.data;
};

const apiUpdatePortfolio = async (id: string, updates: Partial<Portfolio>): Promise<Portfolio> => {
  const response = await api.put(`/portfolios/${id}`, updates);
  return response.data;
};

const apiDeletePortfolio = async (id: string): Promise<void> => {
  await api.delete(`/portfolios/${id}`);
};

// Service functions that either use mock or real API
const getPortfolios = (userId: string): Promise<Portfolio[]> => {
  return MOCK_MODE ? mockGetPortfolios(userId) : apiGetPortfolios(userId);
};

const getPortfolioById = (id: string): Promise<Portfolio> => {
  return MOCK_MODE ? mockGetPortfolioById(id) : apiGetPortfolioById(id);
};

const getPortfolioBySlug = (slug: string): Promise<Portfolio> => {
  return MOCK_MODE ? mockGetPortfolioBySlug(slug) : apiGetPortfolioBySlug(slug);
};

const createPortfolio = (portfolio: Partial<Portfolio>): Promise<Portfolio> => {
  return MOCK_MODE ? mockCreatePortfolio(portfolio) : apiCreatePortfolio(portfolio);
};

const updatePortfolio = (id: string, updates: Partial<Portfolio>): Promise<Portfolio> => {
  return MOCK_MODE ? mockUpdatePortfolio(id, updates) : apiUpdatePortfolio(id, updates);
};

const deletePortfolio = (id: string): Promise<void> => {
  return MOCK_MODE ? mockDeletePortfolio(id) : apiDeletePortfolio(id);
};

export const portfolioService = {
  getPortfolios,
  getPortfolioById,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};

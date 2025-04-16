
import { create } from 'zustand';
import { Portfolio, PortfolioSection } from '@/types';
import { portfolioService } from '@/services/portfolio.service';

interface PortfolioState {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;
  
  fetchUserPortfolios: (userId: string) => Promise<void>;
  fetchPortfolioById: (id: string) => Promise<void>;
  fetchPortfolioBySlug: (slug: string) => Promise<void>;
  createPortfolio: (portfolio: Partial<Portfolio>) => Promise<Portfolio>;
  updatePortfolio: (id: string, updates: Partial<Portfolio>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  
  addSection: (section: Partial<PortfolioSection>) => void;
  updateSection: (sectionId: string, updates: Partial<PortfolioSection>) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (orderedIds: string[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  currentPortfolio: null,
  isLoading: false,
  error: null,
  
  fetchUserPortfolios: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const portfolios = await portfolioService.getPortfolios(userId);
      set({ portfolios, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch portfolios',
        isLoading: false
      });
    }
  },
  
  fetchPortfolioById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const portfolio = await portfolioService.getPortfolioById(id);
      set({ currentPortfolio: portfolio, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch portfolio',
        isLoading: false
      });
    }
  },
  
  fetchPortfolioBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const portfolio = await portfolioService.getPortfolioBySlug(slug);
      set({ currentPortfolio: portfolio, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch portfolio',
        isLoading: false
      });
    }
  },
  
  createPortfolio: async (portfolio: Partial<Portfolio>) => {
    set({ isLoading: true, error: null });
    try {
      const newPortfolio = await portfolioService.createPortfolio(portfolio);
      set(state => ({ 
        portfolios: [...state.portfolios, newPortfolio],
        currentPortfolio: newPortfolio,
        isLoading: false
      }));
      return newPortfolio;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create portfolio',
        isLoading: false
      });
      throw error;
    }
  },
  
  updatePortfolio: async (id: string, updates: Partial<Portfolio>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPortfolio = await portfolioService.updatePortfolio(id, updates);
      set(state => ({
        portfolios: state.portfolios.map(p => p.id === id ? updatedPortfolio : p),
        currentPortfolio: state.currentPortfolio?.id === id ? updatedPortfolio : state.currentPortfolio,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update portfolio',
        isLoading: false
      });
    }
  },
  
  deletePortfolio: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await portfolioService.deletePortfolio(id);
      set(state => ({
        portfolios: state.portfolios.filter(p => p.id !== id),
        currentPortfolio: state.currentPortfolio?.id === id ? null : state.currentPortfolio,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete portfolio',
        isLoading: false
      });
    }
  },
  
  addSection: (section: Partial<PortfolioSection>) => {
    const { currentPortfolio } = get();
    if (!currentPortfolio) return;
    
    const newSection: PortfolioSection = {
      id: `section-${Date.now()}`,
      portfolioId: currentPortfolio.id,
      type: section.type!,
      title: section.title || 'New Section',
      order: section.order || (currentPortfolio.sections.length + 1),
      content: section.content || {},
    };
    
    const updatedPortfolio = {
      ...currentPortfolio,
      sections: [...currentPortfolio.sections, newSection],
      updatedAt: new Date().toISOString(),
    };
    
    set({ currentPortfolio: updatedPortfolio });
  },
  
  updateSection: (sectionId: string, updates: Partial<PortfolioSection>) => {
    const { currentPortfolio } = get();
    if (!currentPortfolio) return;
    
    const updatedSections = currentPortfolio.sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    );
    
    const updatedPortfolio = {
      ...currentPortfolio,
      sections: updatedSections,
      updatedAt: new Date().toISOString(),
    };
    
    set({ currentPortfolio: updatedPortfolio });
  },
  
  removeSection: (sectionId: string) => {
    const { currentPortfolio } = get();
    if (!currentPortfolio) return;
    
    const updatedSections = currentPortfolio.sections.filter(section => section.id !== sectionId);
    
    // Reorder remaining sections
    const reorderedSections = updatedSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));
    
    const updatedPortfolio = {
      ...currentPortfolio,
      sections: reorderedSections,
      updatedAt: new Date().toISOString(),
    };
    
    set({ currentPortfolio: updatedPortfolio });
  },
  
  reorderSections: (orderedIds: string[]) => {
    const { currentPortfolio } = get();
    if (!currentPortfolio) return;
    
    // Create a map for quick lookup of sections by id
    const sectionsMap = new Map(
      currentPortfolio.sections.map(section => [section.id, section])
    );
    
    // Create new sections array with updated order
    const reorderedSections = orderedIds.map((id, index) => {
      const section = sectionsMap.get(id);
      if (!section) return null;
      return { ...section, order: index + 1 };
    }).filter(Boolean) as PortfolioSection[];
    
    const updatedPortfolio = {
      ...currentPortfolio,
      sections: reorderedSections,
      updatedAt: new Date().toISOString(),
    };
    
    set({ currentPortfolio: updatedPortfolio });
  },
}));

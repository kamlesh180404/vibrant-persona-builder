
import { useEffect, ReactNode, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// Define the context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/portfolio'];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  // Handle routing based on auth status
  useEffect(() => {
    // Skip redirects while auth is being checked
    if (isLoading) return;
    
    const isPublicRoute = publicRoutes.some(route => 
      location.pathname === route || 
      location.pathname.startsWith(`${route}/`)
    );
    
    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login if trying to access protected route while not authenticated
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);
  
  const value = {
    isAuthenticated,
    isLoading,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

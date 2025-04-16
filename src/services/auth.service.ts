
import api from './api';
import { AuthUser, LoginForm, RegisterForm } from '@/types';

// For development purposes - simulating API responses
const MOCK_MODE = true;
const MOCK_DELAY = 800;

// Mock user data
const MOCK_USER: AuthUser = {
  id: 'user-123',
  username: 'johndoe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  token: 'mock-jwt-token',
  createdAt: new Date().toISOString(),
};

// Mock functions
const mockLogin = async (data: LoginForm): Promise<AuthUser> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  if (data.email === 'demo@example.com' && data.password === 'password') {
    return MOCK_USER;
  }
  throw new Error('Invalid credentials');
};

const mockRegister = async (data: RegisterForm): Promise<AuthUser> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return {
    ...MOCK_USER,
    email: data.email,
    username: data.username,
  };
};

// Real API functions
const apiLogin = async (data: LoginForm): Promise<AuthUser> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

const apiRegister = async (data: RegisterForm): Promise<AuthUser> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Service functions that either use mock or real API
const login = async (data: LoginForm): Promise<AuthUser> => {
  try {
    const user = MOCK_MODE ? await mockLogin(data) : await apiLogin(data);
    
    // Store auth data in localStorage
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    throw error;
  }
};

const register = async (data: RegisterForm): Promise<AuthUser> => {
  try {
    const user = MOCK_MODE ? await mockRegister(data) : await apiRegister(data);
    
    // Store auth data in localStorage
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const getCurrentUser = (): AuthUser | null => {
  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

export const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated,
};

import api from './api';
import type { LoginDto, RegisterDto, AuthResponse } from '../types/auth';

export const authService = {
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): AuthResponse | null => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('tokenType');
    const user = localStorage.getItem('user');

    if (token && type && user) {
      return {
        token,
        type,
        user: JSON.parse(user),
      };
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};
import React, { useEffect, useState, createContext, useContext } from 'react';
import { apiService } from '../services/api';
import { User, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '../types/api';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const loginData: LoginRequest = { email, password };
      const response: LoginResponse = await apiService.login(loginData);
      
      if (response.success && response.userId && response.email && response.nome) {
        const newUser: User = {
          id: response.userId,
          nome: response.nome,
          email: response.email,
          role: response.role || 'comprador',
          dataRegistro: new Date().toISOString(),
          token: response.token?.token, // Armazenar o token
        };
        
        setUser(newUser);
        
        if (remember) {
          localStorage.setItem('user', JSON.stringify(newUser));
        }
      } else {
        throw new Error(response.message || 'Login falhou');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const registerData: RegisterRequest = { 
        nome: name, 
        email, 
        senha: password 
      };
      
      const response: RegisterResponse = await apiService.register(registerData);
      
      if (response.success) {
        // After successful registration, automatically log in
        await login(email, password, true);
      } else {
        throw new Error(response.message || 'Registro falhou');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar conta';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('cartId');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
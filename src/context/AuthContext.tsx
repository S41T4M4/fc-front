import React, { useEffect, useState, createContext, useContext } from 'react';
type User = {
  id: string;
  name: string;
  email: string;
  platform: 'console' | 'pc' | null;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const login = async (email: string, password: string, remember: boolean) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mock successful login
    const newUser = {
      id: '1',
      name: 'Usuário Teste',
      email,
      platform: null as 'console' | 'pc' | null
    };
    setUser(newUser);
    if (remember) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mock successful registration
    const newUser = {
      id: '1',
      name,
      email,
      platform: null as 'console' | 'pc' | null
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
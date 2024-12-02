import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, firstName: string, lastName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    if (email === 'admin@admin.com' && password === 'password') {
      setIsAuthenticated(true);
      toast.success("Successfully logged in!");
      navigate('/editor');
    } else {
      toast.error("Invalid credentials");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const signup = (email: string, password: string, firstName: string, lastName: string) => {
    if (email === 'admin@admin.com' && password === 'password') {
      setIsAuthenticated(true);
      toast.success("Successfully signed up!");
      navigate('/editor');
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
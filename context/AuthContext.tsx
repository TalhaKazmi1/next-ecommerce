'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setCookie } from 'nookies';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  console.log(user,'chec user')
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token,'created')
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/login', { email, password });
    const token = response.data.token;
    console.log(token,'check token')
    setCookie(null, 'token', token, { path: '/' }); 
    localStorage.setItem('token', token);
    const decoded: any = jwtDecode(token);
    setUser(decoded);
    router.push('/store');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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

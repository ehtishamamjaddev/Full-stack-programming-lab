"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

type User = { id: string; name: string; email: string; role?: string } | null;

type AuthContextValue = {
  user: User;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('rp_token') : null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // attempt to fetch user
      api.get('/auth/me').then(res => setUser(res.data.user)).catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('rp_token');
      });
    }
  }, [token]);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const t = res.data.token;
      setToken(t);
      localStorage.setItem('rp_token', t);
      api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
      setUser(res.data.user);
    } finally {
      setLoading(false);
    }
  }

  async function register(payload: { name: string; email: string; password: string }) {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', payload);
      const t = res.data.token;
      setToken(t);
      localStorage.setItem('rp_token', t);
      api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
      setUser(res.data.user);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('rp_token');
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

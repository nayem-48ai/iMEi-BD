"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('idToken');
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        // টোকেন এক্সপায়ার হয়েছে কি না চেক
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded.user_data);
          setToken(savedToken);
        } else {
          localStorage.removeItem('idToken');
        }
      } catch (e) {
        localStorage.removeItem('idToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('idToken', newToken);
    const decoded = jwtDecode(newToken);
    setUser(decoded.user_data);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('idToken');
    setUser(null);
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

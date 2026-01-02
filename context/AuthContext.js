"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const DEFAULT_USER = { u: "tnayem48", p: "Torikul$48" };

  const login = async (username, password) => {
    try {
      const res = await axios.post('/api/proxy', {
        url: 'https://neir.btrc.gov.bd/api/authenticate-user',
        payload: { username, password }
      });
      if (res.data.idToken) {
        saveAuth(res.data.idToken, username, password);
        return { success: true };
      }
      return { success: false, msg: res.data.message };
    } catch (e) { return { success: false, msg: "Server Error" }; }
  };

  const saveAuth = (newToken, u, p) => {
    const decoded = jwtDecode(newToken);
    setToken(newToken);
    setUser(decoded.user_data);
    localStorage.setItem('token', newToken);
    localStorage.setItem('creds', JSON.stringify({ u, p }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    window.location.href = '/login';
  };

  // টোকেন ভ্যালিড আছে কি না চেক করে অটো-রিফ্রেশ করা
  const getValidToken = async () => {
    let currentToken = localStorage.getItem('token');
    let creds = JSON.parse(localStorage.getItem('creds')) || DEFAULT_USER;

    if (currentToken) {
      const decoded = jwtDecode(currentToken);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (!isExpired) return currentToken;
    }

    // টোকেন নেই বা এক্সপায়ার হয়ে গেছে, নতুন টোকেন নিচ্ছি
    const res = await axios.post('/api/proxy', {
      url: 'https://neir.btrc.gov.bd/api/authenticate-user',
      payload: { username: creds.u, password: creds.p }
    });
    if (res.data.idToken) {
      saveAuth(res.data.idToken, creds.u, creds.p);
      return res.data.idToken;
    }
    return null;
  };

  useEffect(() => {
    const initAuth = async () => {
      await getValidToken();
      setLoading(false);
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getValidToken, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

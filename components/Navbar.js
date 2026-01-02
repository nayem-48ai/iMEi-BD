"use client";
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Sun, Moon, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" href="/">IMEI BD</Link>
        <div className="d-flex align-items-center">
          <button className="btn btn-link nav-link me-3" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {!isLoggedIn ? (
            <Link href="/login" className="btn btn-outline-primary btn-sm rounded-pill px-3">Login</Link>
          ) : (
            <div className="d-flex align-items-center">
              <Link href="/profile" className="nav-link me-3"><User size={20} /></Link>
              <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

"use client";
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Sun, Moon, Menu, User, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload.user_data);
      } catch (e) { setUser(null); }
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body border-bottom px-3 py-2">
      <div className="container-fluid">
        <button className="btn btn-light d-lg-none me-2 rounded-circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar">
          <Menu size={20} />
        </button>
        
        <Link href="/" className="navbar-brand fw-bold d-lg-none">NEIR</Link>

        <div className="ms-auto d-flex align-items-center gap-2">
          <button className="btn btn-link nav-link rounded-circle p-2" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {!user ? (
            <Link href="/login" className="btn btn-primary rounded-pill px-4 btn-sm">Login</Link>
          ) : (
            <div className="dropdown">
              <button className="btn btn-outline-primary rounded-pill px-3 py-1 btn-sm dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                <User size={16} /> {user.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3">
                <li><Link className="dropdown-item py-2" href="/profile">My Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger py-2" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
                  <LogOut size={16} className="me-2" /> Logout
                </button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

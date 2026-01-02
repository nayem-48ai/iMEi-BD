"use client";
import { useTheme } from '@/context/ThemeContext';

export default function Navbar({ toggleSidebar }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className={`navbar sticky-top shadow-sm ${darkMode ? 'navbar-dark bg-dark border-bottom border-secondary' : 'navbar-light bg-white'}`}>
      <div className="container-fluid">
        <button className="btn border-0" onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1 fw-bold text-primary mx-auto">NEIR Portal <small className="fs-6 text-muted">by Tnayem48</small></span>
        <button className="btn btn-outline-secondary btn-sm rounded-circle" onClick={toggleTheme}>
          {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
        </button>
      </div>
    </nav>
  );
  }

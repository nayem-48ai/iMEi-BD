import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navs = [
    { name: 'IMEI Check', path: '/', icon: '📱' },
    { name: 'NID List', path: '/nid', icon: '🆔' },
    { name: 'Transfer', path: '/transfer', icon: '🔄' }
  ];

  return (
    <div className="app-container">
      {/* Mobile Nav */}
      <header className="mobile-header d-md-none p-3 bg-white shadow-sm sticky-top">
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-light" onClick={() => setIsOpen(true)}>☰</button>
          <h5 className="mb-0 fw-bold text-primary">NEIR BD</h5>
          <div style={{width: 40}}></div>
        </div>
      </header>

      <div className="d-flex">
        {/* Sidebar */}
        <aside className={`sidebar-nav ${isOpen ? 'show' : ''} bg-white shadow`}>
          <div className="p-4 border-bottom d-flex justify-content-between">
            <h4 className="fw-bold text-primary mb-0">NEIR System</h4>
            <button className="btn d-md-none" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <nav className="p-3">
            {navs.map(n => (
              <Link key={n.path} href={n.path} 
                className={`nav-link p-3 rounded-4 mb-2 d-flex align-items-center ${router.pathname === n.path ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}>
                <span className="me-3 fs-5">{n.icon}</span> {n.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="main-body flex-grow-1 p-3 p-md-5">
          {children}
        </main>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
}

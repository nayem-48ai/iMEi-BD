"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Smartphone, List, Send, User, Home, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [pathname]);

  const navItems = [
    { name: 'Home / IMEI', href: '/', icon: <Home size={20}/> },
    { name: 'NID IMEI List', href: '/nid-list', icon: <List size={20}/> },
    { name: 'Device Transfer', href: '/transfer', icon: <Send size={20}/> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="d-none d-lg-flex flex-column border-end vh-100 sticky-top" style={{ width: '280px', background: 'var(--bg-card)' }}>
        <div className="p-4 text-center border-bottom">
          <h4 className="fw-bold text-primary mb-0">NEIR BD</h4>
        </div>
        
        <div className="nav nav-pills flex-column px-3 mt-4 gap-2 flex-grow-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === item.href ? 'active shadow-sm' : ''}`}>
              {item.icon} <span className="fw-medium">{item.name}</span>
            </Link>
          ))}
          <hr className="my-3 opacity-10" />
          {isLoggedIn ? (
            <Link href="/profile" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/profile' ? 'active' : ''}`}>
              <User size={20}/> <span className="fw-medium">My Profile</span>
            </Link>
          ) : (
            <Link href="/login" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/login' ? 'active' : ''}`}>
              <LogIn size={20}/> <span className="fw-medium">Login</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile Drawer (Bootstrap Offcanvas) */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold text-primary">NEIR Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="nav nav-pills flex-column px-3 mt-3 gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === item.href ? 'active' : ''}`} data-bs-dismiss="offcanvas">
                {item.icon} {item.name}
              </Link>
            ))}
            <hr />
            {isLoggedIn ? (
              <Link href="/profile" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/profile' ? 'active' : ''}`} data-bs-dismiss="offcanvas">
                <User size={20}/> My Profile
              </Link>
            ) : (
              <Link href="/login" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/login' ? 'active' : ''}`} data-bs-dismiss="offcanvas">
                <LogIn size={20}/> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

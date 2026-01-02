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
    { name: 'IMEI Check', href: '/', icon: <Home size={22}/> },
    { name: 'NID List', href: '/nid-list', icon: <List size={22}/> },
    { name: 'Transfer', href: '/transfer', icon: <Send size={22}/> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="d-none d-lg-flex flex-column border-end bg-body sticky-top vh-100" style={{ width: '280px', zIndex: 1000 }}>
        <div className="p-4 border-bottom">
          <h4 className="fw-bold text-primary mb-0">NEIR Pro</h4>
        </div>
        <div className="nav nav-pills flex-column px-3 mt-4 gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === item.href ? 'active shadow-primary' : 'text-secondary'}`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
          <hr className="my-3" />
          {isLoggedIn ? (
            <Link href="/profile" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/profile' ? 'active shadow-primary' : 'text-secondary'}`}>
              <User size={22}/> Profile
            </Link>
          ) : (
            <Link href="/login" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/login' ? 'active shadow-primary' : 'text-secondary'}`}>
              <LogIn size={22}/> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="offcanvas offcanvas-start bg-body" tabIndex="-1" id="mobileSidebar">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold text-primary">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-3">
          <div className="nav nav-pills flex-column gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === item.href ? 'active' : ''}`} data-bs-dismiss="offcanvas">
                {item.icon} {item.name}
              </Link>
            ))}
            <hr />
            <Link href={isLoggedIn ? "/profile" : "/login"} className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === (isLoggedIn ? '/profile' : '/login') ? 'active' : ''}`} data-bs-dismiss="offcanvas">
              {isLoggedIn ? <User size={22}/> : <LogIn size={22}/>} {isLoggedIn ? "Profile" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

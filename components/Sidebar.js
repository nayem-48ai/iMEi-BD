"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Smartphone, ShieldCheck, RefreshCw, User, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [pathname]);

  const navItems = [
    { name: 'Check IMEI', href: '/', icon: <Smartphone size={20}/> },
    { name: 'NID List', href: '/nid-list', icon: <ShieldCheck size={20}/> },
    { name: 'Transfer', href: '/transfer', icon: <RefreshCw size={20}/> },
  ];

  return (
    <>
      <div className="d-none d-lg-flex flex-column border-end bg-body shadow-sm vh-100 sticky-top" style={{ width: '280px' }}>
        <div className="p-4 border-bottom"><h4 className="fw-bold text-primary mb-0">IMEI BD</h4></div>
        <div className="nav nav-pills flex-column px-3 mt-4 gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 transition-all ${pathname === item.href ? 'active shadow' : 'text-secondary'}`}>
              {item.icon} {item.name}
            </Link>
          ))}
          <hr />
          {isLoggedIn ? (
            <Link href="/profile" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/profile' ? 'active shadow' : 'text-secondary'}`}>
              <User size={20}/> Profile
            </Link>
          ) : (
            <Link href="/login" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === '/login' ? 'active shadow' : 'text-secondary'}`}>
              <LogIn size={20}/> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Needs trigger from Navbar) */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar">
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold mb-0">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="nav nav-pills flex-column px-3 mt-3 gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-bs-dismiss="offcanvas" className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 ${pathname === item.href ? 'active shadow' : ''}`}>
                {item.icon} {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

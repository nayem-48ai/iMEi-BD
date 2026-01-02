"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Smartphone, List, Send, User, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [pathname]);

  // মোবাইল মেনু বন্ধ করার ফাংশন
  const closeMobileMenu = () => {
    const menu = document.getElementById('mobileSidebar');
    if (menu) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(menu);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  const navItems = [
    { name: 'Home / IMEI', href: '/', icon: <Home size={20}/> },
    { name: 'NID IMEI List', href: '/nid-list', icon: <List size={20}/> },
    { name: 'Device Transfer', href: '/transfer', icon: <Send size={20}/> },
  ];

  const MenuList = () => (
    <div className="nav nav-pills flex-column px-3 mt-4">
      {navItems.map((item) => (
        <Link 
          key={item.href} 
          href={item.href} 
          onClick={closeMobileMenu}
          className={`nav-link d-flex align-items-center gap-3 mb-2 p-3 rounded-4 ${pathname === item.href ? 'active shadow' : 'text-secondary'}`}
        >
          {item.icon} {item.name}
        </Link>
      ))}
      {isLoggedIn && (
        <Link 
          href="/profile" 
          onClick={closeMobileMenu}
          className={`nav-link d-flex align-items-center gap-3 mb-2 p-3 rounded-4 ${pathname === '/profile' ? 'active shadow' : 'text-secondary'}`}
        >
          <User size={20}/> Profile
        </Link>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="d-none d-lg-flex flex-column border-end bg-body shadow-sm" style={{ width: '280px', height: '100vh', position: 'sticky', top: 0 }}>
        <div className="p-4 border-bottom text-center">
          <h4 className="fw-bold text-primary mb-0">BTRC NEIR</h4>
        </div>
        <MenuList />
      </div>

      {/* Mobile Offcanvas */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar">
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold text-primary mb-0">NEIR Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <MenuList />
        </div>
      </div>
    </>
  );
}

"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Smartphone, ShieldCheck, RefreshCw, User, LogIn, LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [pathname]);

  const navItems = [
    { name: 'IMEI Check', href: '/', icon: <Smartphone size={20}/> },
    { name: 'NID IMEI List', href: '/nid-list', icon: <ShieldCheck size={20}/> },
    { name: 'Device Transfer', href: '/transfer', icon: <RefreshCw size={20}/> },
  ];

  const NavItem = ({ item }) => (
    <Link 
      href={item.href} 
      className={`nav-link d-flex align-items-center gap-3 p-3 rounded-4 mb-2 transition-all ${pathname === item.href ? 'active shadow-lg' : 'hover-effect'}`}
      // মোবাইলে ক্লিক করলে মেনু বন্ধ হওয়ার জন্য
      data-bs-dismiss="offcanvas"
    >
      {item.icon} <span className="fw-medium">{item.name}</span>
    </Link>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="d-none d-lg-flex flex-column border-end vh-100 sticky-top bg-body shadow-sm" style={{ width: '280px' }}>
        <div className="p-4 border-bottom d-flex align-items-center gap-2">
          <div className="bg-primary p-2 rounded-3 text-white"><LayoutDashboard size={24}/></div>
          <h5 className="fw-bold m-0 text-primary">NEIR Pro</h5>
        </div>
        <div className="p-3 mt-3">
          {navItems.map(item => <NavItem key={item.href} item={item} />)}
          <hr className="my-4 opacity-10" />
          {isLoggedIn ? (
            <NavItem item={{ name: 'My Profile', href: '/profile', icon: <User size={20}/> }} />
          ) : (
            <NavItem item={{ name: 'Login Portal', href: '/login', icon: <LogIn size={20}/> }} />
          )}
        </div>
      </div>

      {/* Mobile Sidebar (Offcanvas) */}
      <div className="offcanvas offcanvas-start bg-body" tabIndex="-1" id="mobileSidebar">
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold m-0 text-primary">NEIR Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-3">
          {navItems.map(item => <NavItem key={item.href} item={item} />)}
          <hr />
          {isLoggedIn ? (
            <NavItem item={{ name: 'My Profile', href: '/profile', icon: <User size={20}/> }} />
          ) : (
            <NavItem item={{ name: 'Login Portal', href: '/login', icon: <LogIn size={20}/> }} />
          )}
        </div>
      </div>
    </>
  );
}

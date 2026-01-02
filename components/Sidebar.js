"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, List, Smartphone, LogIn, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const menuItems = [
    { name: 'IMEI Check', href: '/', icon: <Home size={20} /> },
    { name: 'NID IMEI List', href: '/nid-list', icon: <List size={20} /> },
    { name: 'Transfer', href: '/transfer', icon: <Smartphone size={20} /> },
  ];

  return (
    <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end" 
         style={{ width: '280px', height: '100vh', position: 'sticky', top: 0 }}>
      <h3 className="mb-4 fw-bold text-primary px-2">BTRC NEIR</h3>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li key={item.href} className="nav-item mb-2">
            <Link href={item.href} 
                  className={`nav-link d-flex align-items-center gap-3 ${pathname === item.href ? 'active' : 'text-body'}`}>
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
        {isLoggedIn && (
           <li className="nav-item mb-2">
             <Link href="/profile" className={`nav-link d-flex align-items-center gap-3 ${pathname === '/profile' ? 'active' : 'text-body'}`}>
               <User size={20} /> My Profile
             </Link>
           </li>
        )}
      </ul>
      <hr />
      <div className="px-2">
        <small className="text-muted">Developed by Tnayem48</small>
      </div>
    </div>
  );
}

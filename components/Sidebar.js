"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const menuItems = [
    { name: 'IMEI Check', icon: 'bi-search', path: '/' },
    { name: 'NID IMEI List', icon: 'bi-list-ul', path: '/nid-list' },
    { name: 'Transfer / Deregister', icon: 'bi-arrow-left-right', path: '/transfer' },
    { name: 'My Profile', icon: 'bi-person-circle', path: '/profile' },
    { name: 'Login', icon: 'bi-box-arrow-in-right', path: '/login' },
  ];

  return (
    <div className={`sidebar bg-primary text-white ${isOpen ? 'open' : ''}`} style={{
      width: isOpen ? '250px' : '0',
      position: 'fixed', height: '100vh', transition: '0.3s', overflowX: 'hidden', zIndex: 1000
    }}>
      <div className="p-4 mt-5">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} 
            className={`d-block p-3 mb-2 text-decoration-none rounded-3 ${pathname === item.path ? 'bg-white text-primary fw-bold' : 'text-white'}`}>
            <i className={`bi ${item.icon} me-3`}></i> {item.name}
          </Link>
        ))}
      </div>
      <style jsx>{`
        .sidebar { box-shadow: 4px 0 10px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
}

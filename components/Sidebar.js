"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const menuItems = [
    { name: 'IMEI Check', icon: 'bi-search', path: '/' },
    { name: 'NID IMEI List', icon: 'bi-list-ul', path: '/nid-list' },
    { name: 'Transfer IMEI', icon: 'bi-arrow-left-right', path: '/transfer' },
    { name: 'Profile', icon: 'bi-person-badge', path: '/profile' },
    { name: 'Login', icon: 'bi-box-arrow-in-right', path: '/login' },
  ];

  return (
    <>
      {isOpen && <div className="position-fixed vh-100 vw-100 bg-dark opacity-50 z-2" onClick={() => setIsOpen(false)}></div>}
      <div className={`bg-primary text-white position-fixed h-100 z-3 shadow-lg`} style={{
        width: '280px',
        left: isOpen ? '0' : '-280px',
        transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div className="p-4">
            <h4 className="fw-bold mb-4 border-bottom pb-2 text-center">NEIR Panel</h4>
            {menuItems.map((item) => (
            <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} 
                className={`d-flex align-items-center p-3 mb-2 text-decoration-none rounded-3 transition-all ${pathname === item.path ? 'bg-white text-primary shadow' : 'text-white-50 hover-bg'}`}>
                <i className={`bi ${item.icon} fs-5 me-3`}></i>
                <span className="fw-semibold">{item.name}</span>
            </Link>
            ))}
        </div>
      </div>
      <style jsx>{`
        .hover-bg:hover { background: rgba(255,255,255,0.1); color: white !important; }
      `}</style>
    </>
  );
}

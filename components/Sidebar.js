"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Smartphone, ShieldCheck, RefreshCw, User, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Check IMEI', href: '/', icon: <Smartphone size={20} /> },
    { name: 'NID IMEI List', href: '/nid-list', icon: <ShieldCheck size={20} /> },
    { name: 'Transfer Device', href: '/transfer', icon: <RefreshCw size={20} /> },
  ];

  const NavContent = () => (
    <>
      <div className="p-4">
        <h4 className="fw-bold text-primary">BTRC NEIR</h4>
        <p className="text-muted small">Advanced Portal</p>
      </div>
      <div className="nav nav-pills flex-column px-3">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`nav-link d-flex align-items-center gap-3 mb-2 py-3 px-3 rounded-4 transition-all ${pathname === item.href ? 'active shadow-primary' : 'text-secondary hover-bg'}`}
          >
            {item.icon} <span className="fw-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop View */}
      <aside className="d-none d-lg-flex flex-column border-end bg-body shadow-sm" style={{ width: '280px' }}>
        <NavContent />
      </aside>

      {/* Mobile View (Offcanvas) */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold text-primary" id="mobileSidebarLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <NavContent />
        </div>
      </div>
    </>
  );
}

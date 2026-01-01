import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Check IMEI', path: '/', icon: '🔍' },
    { name: 'NID Search', path: '/nid', icon: '🆔' },
    { name: 'Transfer IMEI', path: '/transfer', icon: '🔄' }
  ];

  return (
    <div className="wrapper">
      {/* Mobile Topbar */}
      <nav className="navbar navbar-dark bg-dark d-md-none px-3 sticky-top shadow">
        <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand fw-bold">NEIR Portal</span>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <aside className={`sidebar ${isOpen ? 'active' : ''} bg-white shadow-sm`}>
          <div className="p-4 border-bottom text-center">
            <h4 className="fw-bold text-primary mb-0">NEIR System</h4>
            <p className="small text-muted mb-0">Bangladesh BTRC</p>
          </div>
          <ul className="nav flex-column p-3">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item mb-2" onClick={() => setIsOpen(false)}>
                <Link href={item.path} className={`nav-link rounded-3 py-3 px-4 d-flex align-items-center ${router.pathname === item.path ? 'active-menu' : 'text-dark'}`}>
                  <span className="me-3 fs-5">{item.icon}</span>
                  <span className="fw-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content w-100">
          <div className="container-fluid py-4 px-md-5">
            {children}
          </div>
        </main>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && <div className="backdrop d-md-none" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
}

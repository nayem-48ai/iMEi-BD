import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const menuItems = [
    { name: 'IMEI Check', path: '/', icon: '📱' },
    { name: 'NID Search', path: '/nid', icon: '🆔' },
    { name: 'Transfer IMEI', path: '/transfer', icon: '🔄' }
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="sidebar vh-100 sticky-top d-none d-md-block shadow">
        <div className="p-4 text-center">
          <h4 className="fw-bold text-white">NEIR Portal</h4>
          <hr />
        </div>
        <ul className="nav flex-column mt-3">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link href={item.path} className={`nav-link d-flex align-items-center ${router.pathname === item.path ? 'active' : ''}`}>
                <span className="me-2">{item.icon}</span> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3 mb-4">
          <div className="container-fluid">
            <span className="navbar-brand d-md-none">NEIR Portal</span>
            <div className="ms-auto text-muted small">System Status: <span className="text-success">● Active</span></div>
          </div>
        </nav>
        <main className="container-fluid px-4 animate__animated animate__fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
}

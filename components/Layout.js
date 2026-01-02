import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem('username'));
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="main-wrapper">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
        <Link href="/" className="navbar-brand fw-bold">NEIR Portal</Link>
        <div className="ms-auto d-flex align-items-center">
          {user ? (
            <>
              <span className="text-white me-3 small">Welcome, {user}</span>
              <button onClick={logout} className="btn btn-sm btn-outline-danger">Logout</button>
            </>
          ) : (
            <Link href="/login" className="btn btn-sm btn-primary">Login</Link>
          )}
        </div>
      </nav>
      <div className="container py-5">{children}</div>
    </div>
  );
}

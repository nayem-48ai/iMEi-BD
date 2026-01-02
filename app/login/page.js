"use client";
import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/api/authenticate-user',
          payload: credentials
        })
      });
      const data = await res.json();
      if (data.idToken) {
        localStorage.setItem('token', data.idToken);
        window.location.href = '/profile';
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Server Error");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card border-0 shadow-lg p-4 w-100" style={{ maxWidth: '400px', borderRadius: '30px' }}>
        <h2 className="text-center fw-bold mb-4">NEIR Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input className="form-control form-control-lg bg-light border-0 rounded-4" placeholder="Username" required onChange={e => setCredentials({...credentials, username: e.target.value})} />
          </div>
          <div className="mb-4">
            <input className="form-control form-control-lg bg-light border-0 rounded-4" type="password" placeholder="Password" required onChange={e => setCredentials({...credentials, password: e.target.value})} />
          </div>
          <button className="btn btn-primary w-100 py-3 rounded-4 fw-bold shadow" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

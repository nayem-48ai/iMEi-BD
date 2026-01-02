"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card shadow-lg border-0 p-4 w-100" style={{ maxWidth: '450px', borderRadius: '24px' }}>
        <div className="text-center mb-4">
          <div className="bg-primary-subtle d-inline-block p-3 rounded-circle mb-3 text-primary">
            <User size={32} />
          </div>
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Login to access your NEIR devices</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input className="form-control form-control-lg bg-light border-0" placeholder="e.g. tnayem48" required onChange={e => setCredentials({...credentials, username: e.target.value})} />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input className="form-control form-control-lg bg-light border-0" type="password" placeholder="••••••••" required onChange={e => setCredentials({...credentials, password: e.target.value})} />
          </div>
          <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-primary" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

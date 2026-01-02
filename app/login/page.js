"use client";
import { useState } from 'react';

export default function LoginPage() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const doLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/proxy', {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://neir.btrc.gov.bd/api/authenticate-user',
        payload: user
      })
    });
    const data = await res.json();
    if (data.idToken) {
      localStorage.setItem('token', data.idToken);
      window.location.href = '/profile';
    } else {
      alert("Login Failed: " + (data.message || "Unknown error"));
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0 p-4 mx-auto rounded-5" style={{ maxWidth: '400px' }}>
        <h2 className="text-center fw-bold mb-4">Login</h2>
        <form onSubmit={doLogin}>
          <input className="form-control mb-3 py-3 rounded-4 bg-light border-0" placeholder="Username" required onChange={e => setUser({...user, username: e.target.value})} />
          <input className="form-control mb-4 py-3 rounded-4 bg-light border-0" type="password" placeholder="Password" required onChange={e => setUser({...user, password: e.target.value})} />
          <button className="btn btn-primary w-100 py-3 rounded-4 fw-bold" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

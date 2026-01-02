import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isLogin: true, payload: user })
    });
    const data = await res.json();
    if (data.idToken) {
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('username', user.username);
      router.push('/');
    } else {
      alert(data.message || "Login Failed!");
    }
    setLoading(false);
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="card glass-card p-5 shadow-lg animate__animated animate__fadeIn" style={{width: '400px'}}>
        <h2 className="text-center fw-bold mb-4">NEIR Portal Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" className="form-control mb-3 p-3" placeholder="Username" required onChange={e => setUser({...user, username: e.target.value})} />
          <input type="password" className="form-control mb-4 p-3" placeholder="Password" required onChange={e => setUser({...user, password: e.target.value})} />
          <button className="btn btn-primary w-100 py-3" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Login Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

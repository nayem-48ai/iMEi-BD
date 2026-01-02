"use client";
import { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Login() {
    const [username, setUsername] = useState('tnayem48');
    const [password, setPassword] = useState('Torikul$48');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/proxy', {
                url: 'https://neir.btrc.gov.bd/api/authenticate-user',
                payload: { username, password }
            });
            if (res.data.idToken) {
                localStorage.setItem('token', res.data.idToken);
                alert("Login Successful!");
                window.location.href = '/profile';
            } else {
                alert(res.data.message || "Login failed");
            }
        } catch (e) { alert("Error connecting to server"); }
        setLoading(false);
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card p-4 shadow-lg border-0 rounded-4" style={{width: '350px'}}>
                <h3 className="text-center mb-4">Login</h3>
                <input className="form-control mb-3" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
                <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
                    {loading ? <LoadingSpinner /> : 'Login'}
                </button>
            </div>
        </div>
    );
}

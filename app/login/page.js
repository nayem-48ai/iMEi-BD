"use client";
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) return alert("ইউজারনেম ও পাসওয়ার্ড দিন");
        setLoading(true);
        try {
            const res = await axios.post('/api/proxy', {
                url: 'https://neir.btrc.gov.bd/api/authenticate-user',
                payload: { username, password }
            });
            if (res.data.idToken) {
                login(res.data.idToken);
                window.location.href = '/profile';
            } else {
                alert(res.data.message || "ভুল ইউজারনেম বা পাসওয়ার্ড");
            }
        } catch (e) {
            alert("সিস্টেমে সমস্যা হচ্ছে, পরে চেষ্টা করুন।");
        }
        setLoading(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '70vh'}}>
            <div className="card p-4 shadow-lg border-0 rounded-4" style={{width: '100%', maxWidth: '400px'}}>
                <div className="text-center mb-4">
                    <div className="bg-primary d-inline-block p-3 rounded-circle text-white mb-2">
                        <i className="bi bi-lock-fill fs-2"></i>
                    </div>
                    <h3 className="fw-bold">Sign In</h3>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control form-control-lg" value={username} onChange={e=>setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input className="form-control form-control-lg" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow" disabled={loading}>
                        {loading ? <LoadingSpinner /> : 'LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    );
}

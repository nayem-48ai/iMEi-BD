"use client";
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.user_data);
            } catch (e) { console.error("Invalid Token"); }
        }
    }, []);

    if (!user) return <div className="text-center mt-5"><h5>দয়া করে লগইন করুন।</h5></div>;

    return (
        <div className="container py-4">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{maxWidth: '400px', margin: '0 auto'}}>
                <div className="bg-primary p-5 text-center text-white">
                    <i className="bi bi-person-circle display-1"></i>
                    <h3 className="mt-2">{user.username}</h3>
                </div>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span><i className="bi bi-card-text"></i> NID:</span>
                        <span className="fw-bold">{user.docId}</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span><i className="bi bi-phone"></i> Mobile:</span>
                        <span className="fw-bold">{user.msisdn}</span>
                    </div>
                    <div className="d-flex justify-content-between py-2">
                        <span><i className="bi bi-hash"></i> User ID:</span>
                        <span className="fw-bold">{user.userId}</span>
                    </div>
                    <button className="btn btn-danger w-100 mt-4 rounded-pill" onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}>Logout</button>
                </div>
            </div>
        </div>
    );
}

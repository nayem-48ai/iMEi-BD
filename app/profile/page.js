"use client";
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload);
  }, []);

  if (!user) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container mt-4">
      <div className="card border-0 shadow-lg rounded-5 overflow-hidden mx-auto" style={{ maxWidth: '600px' }}>
        <div className="bg-primary p-5 text-center text-white position-relative">
          <div className="bg-white rounded-circle d-inline-flex p-3 text-primary mb-3 shadow">
            <User size={48} />
          </div>
          <h3 className="mb-0 fw-bold">{user.user_data.username}</h3>
          <p className="opacity-75">Citizen Portal Profile</p>
        </div>
        <div className="card-body p-4 p-md-5">
          <div className="row g-4">
            <div className="col-6">
              <label className="text-muted small d-block">Document ID (NID)</label>
              <span className="fw-bold fs-5">{user.user_data.docId}</span>
            </div>
            <div className="col-6">
              <label className="text-muted small d-block">Phone Number</label>
              <span className="fw-bold fs-5">{user.user_data.msisdn}</span>
            </div>
            <div className="col-12 mt-4 pt-4 border-top">
              <label className="text-muted small d-block mb-2">Access Token (Authorization Key)</label>
              <div className="p-3 bg-light rounded-4 text-break x-small">
                {localStorage.getItem('token')}
              </div>
              <button className="btn btn-sm btn-outline-primary mt-2 rounded-pill" onClick={() => navigator.clipboard.writeText(localStorage.getItem('token'))}>
                Copy Token
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

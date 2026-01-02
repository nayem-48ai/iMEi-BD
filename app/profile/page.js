"use client";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Shield, Clock, Eye, EyeOff, Copy } from 'lucide-react';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    try {
      const decoded = jwtDecode(token);
      const bdTime = new Date(decoded.exp * 1000).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' });
      setUserData({ ...decoded, expiryDate: bdTime });
    } catch (e) { localStorage.removeItem('token'); window.location.href = '/login'; }
  }, []);

  if (!userData) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">
      <div className="card border-0 rounded-5 overflow-hidden mx-auto shadow-lg" style={{ maxWidth: '650px' }}>
        <div className="bg-primary p-5 text-white text-center">
          <h3 className="fw-bold mb-1">{userData.user_data.username}</h3>
          <span className="badge bg-white text-primary rounded-pill">Citizen Authorization</span>
        </div>
        
        <div className="card-body p-4">
          <div className="row g-3 mb-4">
            <div className="col-6">
              <div className="p-3 bg-body-tertiary rounded-4">
                <small className="text-muted d-block">NID Number</small>
                <span className="fw-bold">{userData.user_data.docId}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 bg-body-tertiary rounded-4">
                <small className="text-muted d-block">Session Expires</small>
                <span className="fw-bold small">{userData.expiryDate.split(',')[0]}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-4 bg-body-tertiary position-relative">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold m-0 d-flex align-items-center gap-2">
                <Shield size={18} className="text-primary"/> Encoded Auth Key
              </h6>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-light rounded-circle" onClick={() => setShowToken(!showToken)}>
                  {showToken ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
                <button className="btn btn-sm btn-light rounded-circle" onClick={() => {
                  navigator.clipboard.writeText(localStorage.getItem('token'));
                  alert("Copied!");
                }}><Copy size={16}/></button>
              </div>
            </div>
            <div className={`token-spoiler p-2 rounded small bg-dark text-light font-monospace overflow-hidden ${showToken ? 'revealed' : ''}`} style={{ maxHeight: '100px' }}>
              {localStorage.getItem('token')}
            </div>
            {!showToken && <div className="position-absolute top-50 start-50 translate-middle text-primary fw-bold">Click Eye to Reveal</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

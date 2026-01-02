"use client";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Calendar, Clock, Shield, User } from 'lucide-react';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    const decoded = jwtDecode(token);
    
    // Unix Timestamp conversion to BD Time
    const date = new Date(decoded.exp * 1000);
    const bdTime = date.toLocaleString('en-GB', { 
      timeZone: 'Asia/Dhaka',
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: true
    });

    setUserData({ ...decoded, expiryDate: bdTime });
  }, []);

  if (!userData) return <div className="p-5 text-center">Loading Profile...</div>;

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">
      <div className="card border-0 shadow-lg rounded-5 overflow-hidden mx-auto" style={{ maxWidth: '650px' }}>
        <div className="bg-primary p-5 text-white text-center">
          <div className="bg-white text-primary rounded-circle d-inline-flex p-3 mb-3 shadow">
            <User size={50} />
          </div>
          <h3 className="fw-bold mb-0">{userData.user_data.username}</h3>
          <p className="opacity-75">Citizen Authorization Active</p>
        </div>
        
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-4">
                <small className="text-muted d-block mb-1">Registered NID</small>
                <div className="d-flex align-items-center gap-2 fw-bold text-dark">
                  <Shield size={18} className="text-primary"/> {userData.user_data.docId}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-4">
                <small className="text-muted d-block mb-1">Mobile Number</small>
                <div className="fw-bold text-dark">{userData.user_data.msisdn}</div>
              </div>
            </div>
            <div className="col-12">
              <div className="p-4 border border-warning rounded-4 bg-warning-subtle">
                <h6 className="fw-bold text-warning-emphasis d-flex align-items-center gap-2">
                  <Clock size={20}/> Token Expiry (BD Time)
                </h6>
                <div className="fs-5 fw-bold text-dark">{userData.expiryDate}</div>
                <small className="text-muted">লগইন মেয়াদের পর আপনাকে পুনরায় লগইন করতে হবে।</small>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-dark text-light rounded-4">
            <small className="opacity-50 d-block mb-2">Encoded Auth Key (Click to Copy)</small>
            <div 
              className="x-small text-break pointer" 
              style={{ cursor: 'pointer', fontFamily: 'monospace', fontSize: '11px' }}
              onClick={() => {
                navigator.clipboard.writeText(localStorage.getItem('token'));
                alert("Token Copied!");
              }}
            >
              {localStorage.getItem('token')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

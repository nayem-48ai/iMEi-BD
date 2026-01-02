"use client";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Calendar, Clock, Shield, User, Eye, EyeOff, Copy } from 'lucide-react';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const date = new Date(decoded.exp * 1000);
      const bdTime = date.toLocaleString('en-GB', { 
        timeZone: 'Asia/Dhaka',
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });
      setUserData({ ...decoded, expiryDate: bdTime });
    } catch (e) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }, []);

  if (!userData) return <div className="p-5 text-center">Loading...</div>;

  const copyToken = () => {
    navigator.clipboard.writeText(localStorage.getItem('token'));
    alert("Token copied to clipboard!");
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-lg rounded-5 overflow-hidden mx-auto" style={{ maxWidth: '650px' }}>
        <div className="bg-primary p-5 text-white text-center">
          <div className="bg-white text-primary rounded-circle d-inline-flex p-3 mb-3 shadow">
            <User size={50} />
          </div>
          <h3 className="fw-bold mb-0">{userData.user_data.username}</h3>
          <p className="opacity-75">Citizen Access Token</p>
        </div>
        
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 rounded-4" style={{ background: 'rgba(var(--primary-rgb), 0.1)', border: '1px solid var(--border-color)' }}>
                <small className="opacity-50 d-block">Document ID (NID)</small>
                <div className="fw-bold fs-5">{userData.user_data.docId}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 rounded-4" style={{ background: 'rgba(var(--primary-rgb), 0.1)', border: '1px solid var(--border-color)' }}>
                <small className="opacity-50 d-block">Phone Number</small>
                <div className="fw-bold fs-5">{userData.user_data.msisdn}</div>
              </div>
            </div>
            <div className="col-12">
              <div className="p-4 rounded-4 border-start border-4 border-warning bg-warning-subtle text-dark">
                <h6 className="fw-bold d-flex align-items-center gap-2"><Clock size={18}/> Expiry (BD Time)</h6>
                <div className="fs-5 fw-bold">{userData.expiryDate}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-4" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="opacity-50 fw-bold text-uppercase">Auth Token (Spoiler)</small>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-light p-1" onClick={() => setShowToken(!showToken)}>
                  {showToken ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
                <button className="btn btn-sm btn-light p-1" onClick={copyToken}><Copy size={16}/></button>
              </div>
            </div>
            <div className={`token-spoiler x-small text-break ${showToken ? 'revealed' : ''}`} 
                 style={{ fontFamily: 'monospace', fontSize: '12px' }}>
              {localStorage.getItem('token')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

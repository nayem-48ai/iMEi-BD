"use client";
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function NidListPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({ registered: [], restricted: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const fetchImeiLists = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      // Registered List (GET)
      const resReg = await fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/bound-imeis',
          method: 'GET',
          token: token
        })
      });
      const regData = await resReg.json();

      // Restricted List (GET)
      const resRes = await fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/restricted_imeis',
          method: 'GET',
          token: token
        })
      });
      const resData = await resRes.json();

      setData({
        registered: Array.isArray(regData.replyMessage) ? regData.replyMessage : [],
        restricted: resData.replyMessage
      });
    } catch (e) {
      alert("Error fetching list. Your token might be expired.");
    }
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center mt-5">
        <h3>Access Denied</h3>
        <p>Please login to view your NID IMEI List.</p>
        <a href="/login" className="btn btn-primary rounded-pill px-4">Login Now</a>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0">My Device Explorer</h3>
        <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={fetchImeiLists} disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Fetch My Lists"}
        </button>
      </div>

      <div className="row g-4">
        {/* Registered List */}
        <div className="col-12">
          <h5 className="mb-3 text-success fw-bold">Registered Devices ({data.registered.length})</h5>
          <div className="row g-3">
            {data.registered.length > 0 ? data.registered.map((item, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm border-start border-4 border-success p-3 rounded-4 h-100">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-success-subtle text-success">{item.regState}</span>
                    <span className="badge bg-light text-dark">{item.tag}</span>
                  </div>
                  <h6 className="fw-bold mb-1">{item.imei}</h6>
                  <p className="small text-muted mb-3">MSISDN: {item.msisdn === "-1" ? "Not Set" : item.msisdn}</p>
                  <div className="mt-auto pt-2 border-top x-small text-muted d-flex justify-content-between">
                    <span>📅 {item.createdAt.split('T')[0]}</span>
                    <span>⏰ {item.createdAt.split('T')[1].substring(0, 5)}</span>
                  </div>
                </div>
              </div>
            )) : <div className="card p-4 text-center border-0 bg-light rounded-4">No data found. Click fetch to reload.</div>}
          </div>
        </div>

        {/* Restricted List */}
        <div className="col-12 mt-5">
          <h5 className="mb-3 text-danger fw-bold">Restricted Devices</h5>
          <div className="alert alert-danger border-0 rounded-4 shadow-sm">
             {typeof data.restricted === 'string' ? data.restricted : "No restricted devices currently listed."}
          </div>
        </div>
      </div>
    </div>
  );
}

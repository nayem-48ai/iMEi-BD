"use client";
import { useState, useEffect, Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

function NidListContent() {
  const [data, setData] = useState({ registered: [], restricted: null });
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const fetchLists = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      // Registered List (GET Method)
      const resReg = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/bound-imeis',
          method: 'GET',
          token: token
        })
      });
      const regData = await resReg.json();

      // Restricted List (GET Method)
      const resRes = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      alert("Error fetching data!");
    }
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center mt-5 p-5 card rounded-5 shadow border-0">
        <h3>Access Restricted</h3>
        <p className="text-muted">Please login to view your IMEI history.</p>
        <a href="/login" className="btn btn-primary rounded-pill px-5">Login Now</a>
      </div>
    );
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0">NID Explorer</h3>
        <button className="btn btn-primary rounded-pill px-4" onClick={fetchLists} disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Fetch My Devices"}
        </button>
      </div>

      <div className="row g-3">
        {data.registered.map((item, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="card h-100 border-0 shadow-sm border-start border-4 border-success p-3 rounded-4">
              <span className="badge bg-success-subtle text-success mb-2 w-fit">{item.tag}</span>
              <h6 className="fw-bold mb-1">{item.imei}</h6>
              <p className="small text-muted mb-2">Number: {item.msisdn === "-1" ? "Hidden" : item.msisdn}</p>
              <div className="mt-auto pt-2 border-top small text-muted d-flex justify-content-between">
                <span>{item.createdAt.split('T')[0]}</span>
                <span>{item.createdAt.split('T')[1].substring(0, 5)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {data.restricted && (
        <div className="alert alert-danger mt-4 rounded-4 border-0">
          <strong>Restricted Message:</strong> {typeof data.restricted === 'string' ? data.restricted : "N/A"}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <Suspense><NidListContent /></Suspense>;
}

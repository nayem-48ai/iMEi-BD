"use client";
import { useState, Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

function ImeiContent() {
  const [imei, setImei] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkImei = async () => {
    if (imei.length < 14) return alert("Enter valid IMEI");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/imei-status-check',
          payload: { imei: imei }
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="card shadow-lg border-0 p-4 mx-auto rounded-5 mt-md-5" style={{ maxWidth: '550px' }}>
      <h3 className="text-center fw-bold mb-4">IMEI Status</h3>
      <div className="input-group mb-4 shadow-sm rounded-pill overflow-hidden border">
        <input 
          className="form-control border-0 px-4" 
          placeholder="Enter 15 digit IMEI"
          value={imei}
          onChange={e => setImei(e.target.value)}
        />
        <button className="btn btn-primary px-4" onClick={checkImei} disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <div className={`alert rounded-4 border-0 shadow-sm ${result.replyMessage?.msg === 'WL' ? 'alert-success' : 'alert-danger'}`}>
          <div className="d-flex align-items-center gap-3">
             <div className="flex-grow-1">
               <h6 className="fw-bold mb-1">Result: {result.replyMessage?.msg}</h6>
               <p className="mb-0 small">
                 {result.replyMessage?.msg === 'WL' 
                 ? `IMEI নম্বর ${result.replyMessage?.imei} নিবন্ধিত রয়েছে।` 
                 : `IMEI নম্বর ${result.replyMessage?.imei} নিবন্ধিত নয়।`}
               </p>
               <hr className="my-2 opacity-10" />
               <small className="fw-bold">Admin: Tnayem48</small>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <Suspense><ImeiContent /></Suspense>;
}

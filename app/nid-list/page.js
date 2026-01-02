"use client";
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { jwtDecode } from 'jwt-decode';

export default function NidListPage() {
  const [docId, setDocId] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState([]);
  const [restricted, setRestricted] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.user_data?.docId) {
        setDocId(decoded.user_data.docId);
      }
    }
  }, []);

  const fetchData = async () => {
    if (!docId) return alert("Please enter NID number");
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      // Registered List
      const res1 = await fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list',
          payload: { docId, docType: "SNID" },
          token
        })
      });
      const data1 = await res1.json();
      setRegistered(Array.isArray(data1.replyMessage) ? data1.replyMessage : []);

      // Restricted List
      const res2 = await fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/restricted_imei_list',
          payload: { docId, docType: "SNID" },
          token
        })
      });
      const data2 = await res2.json();
      setRestricted(data2.replyMessage);

    } catch (e) {
      alert("Error fetching data");
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">NID to IMEI Explorer</h3>
      <div className="card p-4 shadow-sm mb-4 border-0">
        <div className="input-group">
          <input 
            className="form-control form-control-lg" 
            placeholder="NID Number" 
            value={docId}
            onChange={e => setDocId(e.target.value)}
          />
          <button className="btn btn-dark px-4" onClick={fetchData} disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : "Search"}
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <h5>Registered IMEI List ({registered.length})</h5>
          <div className="row g-3">
            {registered.length > 0 ? registered.map((item, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card h-100 shadow-sm border-start border-success border-4 p-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-success-subtle text-success">{item.regState}</span>
                    <span className="badge bg-secondary-subtle text-secondary">{item.tag}</span>
                  </div>
                  <h6 className="fw-bold mb-1">{item.imei}</h6>
                  <p className="small text-muted mb-2">Number: {item.msisdn === "-1" ? "Not Set" : item.msisdn}</p>
                  <div className="mt-auto pt-2 border-top small text-muted">
                    Date: {item.createdAt.split('T')[0]} | Time: {item.createdAt.split('T')[1].substring(0, 5)}
                  </div>
                </div>
              </div>
            )) : <p className="text-muted">No registered devices found.</p>}
          </div>
        </div>

        <div className="col-12">
          <h5>Restricted List</h5>
          <div className="alert alert-warning border-0 shadow-sm">
            {typeof restricted === 'string' ? restricted : "No restricted IMEI found for this NID."}
          </div>
        </div>
      </div>
    </div>
  );
}

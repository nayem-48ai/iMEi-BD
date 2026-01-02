"use client";
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function NidListPage() {
  const [docId, setDocId] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [restrictedMsg, setRestrictedMsg] = useState('');

  const fetchList = async () => {
    setLoading(true);
    const token = localStorage.getItem('token') || ''; // এখানে ডিফল্ট টোকেন লজিক যোগ করা যাবে
    
    // Fetch Registered
    const resReg = await fetch('/api/proxy', {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list',
        payload: { docId, docType: "SNID" },
        token: token
      })
    });
    const dataReg = await resReg.json();
    setList(Array.isArray(dataReg.replyMessage) ? dataReg.replyMessage : []);

    // Fetch Restricted
    const resRes = await fetch('/api/proxy', {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/restricted_imei_list',
        payload: { docId, docType: "SNID" },
        token: token
      })
    });
    const dataRes = await resRes.json();
    setRestrictedMsg(typeof dataRes.replyMessage === 'string' ? dataRes.replyMessage : "No items");

    setLoading(false);
  };

  return (
    <div>
      <h3 className="mb-4">NID to IMEI List</h3>
      <div className="input-group mb-4 shadow-sm">
        <input className="form-control" placeholder="Enter NID Number" onChange={e => setDocId(e.target.value)} />
        <button className="btn btn-dark" onClick={fetchList} disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Fetch Lists"}
        </button>
      </div>

      <div className="row">
        {list.map((item, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="card border-0 shadow-sm border-start border-4 border-success p-3">
              <div className="d-flex justify-content-between">
                <span className="badge bg-light text-dark">{item.tag}</span>
                <span className="text-muted small">{item.createdAt.split('T')[0]}</span>
              </div>
              <h5 className="mt-2 mb-1">{item.imei}</h5>
              <div className="small text-muted">MSISDN: {item.msisdn}</div>
              <div className="text-success fw-bold mt-2">{item.regState}</div>
            </div>
          </div>
        ))}
      </div>

      {restrictedMsg && (
        <div className="alert alert-info mt-3 border-0 shadow-sm">
          <strong>Restricted List:</strong> {restrictedMsg}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TransferPage() {
  const [formData, setFormData] = useState({ imei: '', msisdn: '', docDigits: '', nextMsisdn: '' });
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/deregistration',
          payload: {
            imei: formData.imei,
            msisdn: "88" + formData.msisdn,
            docDigits: formData.docDigits,
            nextMsisdn: "88" + formData.nextMsisdn
          }
        })
      });
      const data = await res.json();
      if (data.replyMessage === true) {
        alert("রিকোয়েস্ট সফল হয়েছে। আপনি দ্রুত একটি SMS পাবেন।");
      } else {
        alert("কিছু ভুল হয়েছে, আবার চেষ্টা করুন।");
      }
    } catch (err) {
      alert("সার্ভার ত্রুটি।");
    }
    setLoading(false);
  };

  return (
    <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Transfer / Deregister IMEI</h3>
      <form onSubmit={handleTransfer}>
        <div className="mb-3">
          <label className="form-label">IMEI Number</label>
          <input type="text" className="form-control" required onChange={e => setFormData({...formData, imei: e.target.value})} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Current Mobile Number</label>
            <input type="text" className="form-control" placeholder="0171..." required onChange={e => setFormData({...formData, msisdn: e.target.value})} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">NID (Last 4 Digits)</label>
            <input type="text" className="form-control" maxLength="4" required onChange={e => setFormData({...formData, docDigits: e.target.value})} />
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">Transfer To (New Number)</label>
          <input type="text" className="form-control" placeholder="0161..." required onChange={e => setFormData({...formData, nextMsisdn: e.target.value})} />
        </div>
        <button className="btn btn-primary w-100 py-2" disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Confirm Request"}
        </button>
      </form>
    </div>
  );
}

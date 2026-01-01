import { useState } from 'react';
import Layout from '../components/Layout';

export default function Transfer() {
  const [formData, setFormData] = useState({
    imei: '', msisdn: '', docDigits: '', nextMsisdn: ''
  });
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      imei: formData.imei,
      msisdn: "88" + formData.msisdn, // Adding 88 prefix
      docDigits: formData.docDigits,
      nextMsisdn: "88" + formData.nextMsisdn
    };

    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'deregistration', payload })
      });
      const data = await res.json();
      
      if (data.replyMessage === true) {
        alert("রিকোয়েস্ট সফল হয়েছে। আপনি দ্রুত একটি SMS পাবেন।");
      } else {
        alert("দুঃখিত, অনুরোধটি সফল হয়নি। তথ্য যাচাই করুন।");
      }
    } catch (err) {
      alert("Error processing request.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="row justify-content-center mt-4">
        <div className="col-md-7">
          <div className="card glass-card shadow-lg p-4">
            <h3 className="fw-bold mb-4 text-primary">Transfer / Deregister IMEI</h3>
            <form onSubmit={handleTransfer}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">IMEI Number</label>
                  <input type="text" className="form-control" required 
                  onChange={e => setFormData({...formData, imei: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Current Mobile Number (01xxx)</label>
                  <input type="text" className="form-control" required
                  onChange={e => setFormData({...formData, msisdn: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">NID (Last 4 Digits)</label>
                  <input type="text" className="form-control" required
                  onChange={e => setFormData({...formData, docDigits: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Transfer To (New Number)</label>
                  <input type="text" className="form-control" required
                  onChange={e => setFormData({...formData, nextMsisdn: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4 py-3 fw-bold" disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Transfer Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

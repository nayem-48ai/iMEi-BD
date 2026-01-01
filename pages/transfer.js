import { useState } from 'react';
import Layout from '../components/Layout';

export default function TransferPage() {
  const [formData, setFormData] = useState({ imei: '', msisdn: '', docDigits: '', nextMsisdn: '', token: '' });
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        endpoint: 'deregistration', 
        token: formData.token,
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
      alert("ব্যর্থ হয়েছে। টোকেন বা তথ্য চেক করুন।");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card glass-card shadow-lg p-4 border-0 rounded-4">
          <h3 className="fw-bold mb-4">IMEI Transfer / Deregister</h3>
          <form onSubmit={handleTransfer}>
            <div className="row g-3">
              <div className="col-md-6"><input type="text" className="form-control p-3" placeholder="IMEI" required onChange={e => setFormData({...formData, imei: e.target.value})} /></div>
              <div className="col-md-6"><input type="text" className="form-control p-3" placeholder="Current Mobile (01xxx)" required onChange={e => setFormData({...formData, msisdn: e.target.value})} /></div>
              <div className="col-md-6"><input type="text" className="form-control p-3" placeholder="NID Last 4 Digits" required onChange={e => setFormData({...formData, docDigits: e.target.value})} /></div>
              <div className="col-md-6"><input type="text" className="form-control p-3" placeholder="Transfer To Number" required onChange={e => setFormData({...formData, nextMsisdn: e.target.value})} /></div>
              <div className="col-12">
                <textarea className="form-control" rows="3" placeholder="Security Token" required onChange={e => setFormData({...formData, token: e.target.value})}></textarea>
              </div>
              <button className="btn btn-primary w-100 py-3 mt-3" disabled={loading}>{loading ? 'Processing...' : 'Submit Request'}</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

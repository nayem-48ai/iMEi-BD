import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [imei, setImei] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if(imei.length < 14) return alert("Valid IMEI লিখুন");
    setLoading(true);
    const res = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: 'imei-status-check', payload: { imei } })
    });
    const data = await res.json();
    setResult(data.replyMessage);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="row justify-content-center pt-md-5">
        <div className="col-lg-6 col-md-10">
          <div className="card glass-card p-4 p-md-5 animate__animated animate__fadeIn">
            <div className="text-center mb-4">
              <div className="display-4 text-primary mb-3">📱</div>
              <h2 className="fw-bold">IMEI ভেরিফিকেশন</h2>
              <p className="text-muted">আপনার হ্যান্ডসেটটি NEIR সিস্টেমে নিবন্ধিত কি না যাচাই করুন</p>
            </div>

            <div className="form-group mb-4">
              <input 
                type="text" className="form-control form-control-lg bg-light border-0 text-center" 
                placeholder="15 ডিজিটের IMEI লিখুন" 
                maxLength="15"
                onChange={(e) => setImei(e.target.value)}
              />
            </div>
            
            <button className="btn btn-primary w-100 shadow-sm" onClick={handleCheck} disabled={loading}>
              {loading ? 'যাচাই করা হচ্ছে...' : 'IMEI চেক করুন'}
            </button>

            {result && (
              <div className={`mt-4 p-4 rounded-4 text-center animate__animated animate__zoomIn ${result.msg === 'WL' ? 'bg-success-subtle border border-success' : 'bg-danger-subtle border border-danger'}`}>
                <h5 className={`fw-bold ${result.msg === 'WL' ? 'text-success' : 'text-danger'}`}>
                  {result.msg === 'WL' ? '✅ নিবন্ধিত রয়েছে' : '❌ নিবন্ধিত নয়'}
                </h5>
                <p className="mb-0 small">{result.msg === 'WL' ? 'এই IMEI নম্বরটি NEIR সিস্টেমে পাওয়া গেছে এবং সচল আছে।' : 'IMEI নম্বরটি NEIR ডাটাবেসে পাওয়া যায়নি।'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

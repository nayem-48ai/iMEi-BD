import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Home() {
  const router = useRouter();
  const { imei: queryImei } = router.query;
  const [imei, setImei] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryImei) {
      setImei(queryImei);
      checkIMEI(queryImei);
    }
  }, [queryImei]);

  const checkIMEI = async (inputImei) => {
    const target = inputImei || imei;
    if (!target) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'imei-status-check', payload: { imei: target } })
      });
      const data = await res.json();
      setResult(data.replyMessage);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="row justify-content-center pt-5">
        <div className="col-md-6 text-center">
          <div className="card glass-card p-5 animate__animated animate__backInUp">
            <h2 className="fw-bold mb-4 text-primary">IMEI Validator</h2>
            <div className="input-group mb-4 shadow-sm rounded-pill overflow-hidden">
              <input type="text" className="form-control border-0 p-3 px-4" placeholder="Enter 15 digit IMEI" value={imei} onChange={e => setImei(e.target.value)} />
              <button className="btn btn-primary px-4" onClick={() => checkIMEI()} disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Check'}
              </button>
            </div>

            {loading && <div className="mt-4"><div className="loader-circle mx-auto"></div><p className="mt-2 text-muted">BTRC সার্ভার থেকে তথ্য খোঁজা হচ্ছে...</p></div>}

            {result && (
              <div className={`mt-4 p-4 rounded-4 animate__animated animate__zoomIn ${result.msg === 'WL' ? 'bg-success-subtle' : 'bg-danger-subtle'}`}>
                <h4 className="fw-bold">{result.msg === 'WL' ? '✅ নিবন্ধিত' : '❌ নিবন্ধিত নয়'}</h4>
                <p className="mb-2">IMEI: {result.imei}</p>
                <hr />
                <footer className="small text-muted">System Verified | Admin: <b>Tnayem48</b></footer>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

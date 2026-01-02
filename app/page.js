"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Smartphone, CheckCircle, XCircle } from 'lucide-react';

function ImeiContent() {
  const [imei, setImei] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlImei = searchParams.get('imei');
    if (urlImei) {
      setImei(urlImei);
      checkImei(urlImei);
    }
  }, [searchParams]);

  const checkImei = async (targetImei = imei) => {
    if (!targetImei || targetImei.length < 14) return;
    setLoading(true);
    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/imei-status-check',
          payload: { imei: targetImei }
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto mt-5" style={{ maxWidth: '600px' }}>
      <div className="text-center mb-4">
        <Smartphone size={48} className="text-primary mb-2" />
        <h2 className="fw-bold">IMEI Status Check</h2>
        <p className="text-muted">Enter your 15-digit IMEI number below</p>
      </div>

      <div className="input-group input-group-lg mb-3 shadow-sm">
        <input 
          type="text" 
          className="form-control border-0" 
          placeholder="e.g. 860496059396795"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
        />
        <button className="btn btn-primary px-4" onClick={() => checkImei()} disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Check"}
        </button>
      </div>

      {result && (
        <div className={`card mt-4 border-0 ${result.replyMessage?.msg === 'WL' ? 'bg-success-subtle' : 'bg-danger-subtle'} animate__animated animate__fadeIn`}>
          <div className="card-body d-flex align-items-start gap-3">
            {result.replyMessage?.msg === 'WL' ? 
              <CheckCircle className="text-success mt-1" size={24} /> : 
              <XCircle className="text-danger mt-1" size={24} />
            }
            <div>
              <h5 className={`mb-1 ${result.replyMessage?.msg === 'WL' ? 'text-success' : 'text-danger'}`}>
                {result.replyMessage?.msg === 'WL' ? "Valid IMEI" : "Invalid / Not Found"}
              </h5>
              <p className="mb-0 text-dark">
                {result.replyMessage?.msg === 'WL' 
                  ? `IMEI নম্বর ${result.replyMessage?.imei} NEIR সিস্টেমে নিবন্ধিত রয়েছে এবং ব্যবহৃত হচ্ছে।`
                  : `IMEI নম্বর ${result.replyMessage?.imei} নিবন্ধিত নয় / বৈধতা যাচাই সম্ভব নয়।`
                }
              </p>
              <hr />
              <small className="text-muted fw-bold">Admin: Tnayem48</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center mt-5"><LoadingSpinner /></div>}>
      <ImeiContent />
    </Suspense>
  );
}

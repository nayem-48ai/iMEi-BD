"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
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
  }, []);

  const checkImei = async (targetImei = imei) => {
    if (!targetImei) return;
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
      alert("Error checking IMEI");
    }
    setLoading(false);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4">Check IMEI Status</h3>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control form-control-lg" 
          placeholder="Enter 15 digit IMEI"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
        />
        <button className="btn btn-primary px-4" onClick={() => checkImei()} disabled={loading}>
          {loading ? <LoadingSpinner size="sm" /> : "Check"}
        </button>
      </div>

      {result && (
        <div className={`alert mt-4 ${result.replyMessage?.msg === 'WL' ? 'alert-success' : 'alert-danger'} border-0 shadow-sm`}>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <strong>IMEI: {result.replyMessage?.imei}</strong>
              <p className="mb-0 mt-2">
                {result.replyMessage?.msg === 'WL' 
                  ? `IMEI নম্বর ${result.replyMessage?.imei} NEIR সিস্টেমে নিবন্ধিত রয়েছে এবং ব্যবহৃত হচ্ছে।`
                  : `IMEI নম্বর ${result.replyMessage?.imei} নিবন্ধিত নয় / বৈধতা যাচাই সম্ভব নয়।`
                }
              </p>
              <small className="text-muted mt-2 d-block text-end">Powered by Tnayem48</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

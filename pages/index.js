import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
    const [imei, setImei] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkIMEI = async () => {
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
            <div className="container mt-5">
                <div className="card shadow-lg border-0 rounded-4 animate__animated animate__fadeInUp">
                    <div className="card-body p-5 text-center">
                        <h2 className="fw-bold mb-4">IMEI Status Check</h2>
                        <div className="input-group mb-3">
                            <input 
                                type="text" className="form-control form-control-lg rounded-pill-start" 
                                placeholder="Enter 15 digit IMEI" 
                                onChange={(e) => setImei(e.target.value)}
                            />
                            <button className="btn btn-primary btn-lg rounded-pill-end" onClick={checkIMEI}>
                                {loading ? 'Checking...' : 'Check Status'}
                            </button>
                        </div>

                        {result && (
                            <div className={`mt-4 alert ${result.msg === 'WL' ? 'alert-success' : 'alert-danger'} rounded-4`}>
                                {result.msg === 'WL' 
                                    ? `✅ IMEI নম্বর ${result.imei} NEIR সিস্টেমে নিবন্ধিত রয়েছে।` 
                                    : `❌ IMEI নম্বর ${result.imei} নিবন্ধিত নয়।`}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

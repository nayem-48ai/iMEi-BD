"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
    const searchParams = useSearchParams();
    const [imei, setImei] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryImei = searchParams.get('imei');
        if (queryImei) {
            setImei(queryImei);
            handleCheck(queryImei);
        }
    }, [searchParams]);

    const handleCheck = async (imeiInput) => {
        const targetImei = imeiInput || imei;
        if (!targetImei) return alert("IMEI নম্বর দিন");
        
        setLoading(true);
        try {
            const res = await axios.post('/api/proxy', {
                url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/imei-status-check',
                payload: { imei: targetImei }
            });
            setResult(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card shadow-lg p-4 rounded-4 border-0">
                <h3 className="mb-4"><i className="bi bi-phone"></i> Check IMEI Status</h3>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="Enter 15 digit IMEI"
                        value={imei}
                        onChange={(e) => setImei(e.target.value)}
                    />
                    <button className="btn btn-primary px-4" onClick={() => handleCheck()}>
                        {loading ? <LoadingSpinner /> : 'Check Status'}
                    </button>
                </div>

                {result && (
                    <div className={`alert mt-4 ${result.replyMessage.msg === 'WL' ? 'alert-success' : 'alert-danger'} rounded-4`}>
                        <h5>{result.replyMessage.msg === 'WL' ? '✅ Registered' : '❌ Not Registered'}</h5>
                        <p>IMEI নম্বর {result.replyMessage.imei} {result.replyMessage.msg === 'WL' ? 'NEIR সিস্টেমে নিবন্ধিত রয়েছে।' : 'নিবন্ধিত নয়।'}</p>
                        <small className="text-muted">Verified by Tnayem48</small>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

function IMEIContent() {
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
        if (!targetImei || targetImei.length < 14) return alert("সঠিক ১৫ ডিজিট IMEI দিন");
        
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="col-md-8 mx-auto">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-primary text-white p-4 text-center">
                    <h2 className="fw-bold mb-0">Check IMEI Status</h2>
                    <p className="mb-0 opacity-75">BTRC NEIR Database Verification</p>
                </div>
                <div className="card-body p-4">
                    <div className="input-group mb-3">
                        <input 
                            type="number" 
                            className="form-control form-control-lg bg-light" 
                            placeholder="Enter 15 digit IMEI"
                            value={imei}
                            onChange={(e) => setImei(e.target.value)}
                        />
                        <button className="btn btn-primary px-4 fw-bold" onClick={() => handleCheck()} disabled={loading}>
                            {loading ? <LoadingSpinner /> : <><i className="bi bi-search me-2"></i> Check</>}
                        </button>
                    </div>

                    {result && (
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className={`alert border-0 shadow-sm mt-4 ${result.replyMessage.msg === 'WL' ? 'alert-success' : 'alert-danger'} rounded-4`}>
                            <div className="d-flex align-items-center">
                                <i className={`bi ${result.replyMessage.msg === 'WL' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} display-5 me-3`}></i>
                                <div>
                                    <h5 className="fw-bold mb-1">{result.replyMessage.msg === 'WL' ? 'নিবন্ধিত রয়েছে' : 'নিবন্ধিত নয়'}</h5>
                                    <p className="mb-0 small">IMEI: {result.replyMessage.imei}</p>
                                    <p className="mb-0">সিস্টেমে এই হ্যান্ডসেটটি {result.replyMessage.msg === 'WL' ? 'বৈধ ভাবে ব্যবহৃত হচ্ছে।' : 'পাওয়া যায়নি বা অবৈধ।'}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="text-end small">Checked by <strong>Tnayem48</strong></div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Home() {
    return <Suspense fallback={<div>Loading...</div>}><IMEIContent /></Suspense>;
}

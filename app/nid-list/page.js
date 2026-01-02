"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { motion } from 'framer-motion';

export default function NidList() {
    const { user, token, isLoggedIn } = useAuth();
    const [nid, setNid] = useState('');
    const [regList, setRegList] = useState([]);
    const [restList, setRestList] = useState(null);
    const [loading, setLoading] = useState(false);

    // লগইন থাকলে অটোমেটিক NID সেট হবে
    useEffect(() => {
        if (isLoggedIn && user?.docId) {
            setNid(user.docId);
        }
    }, [isLoggedIn, user]);

    const fetchData = async () => {
        if (!nid) return alert("NID নম্বর প্রদান করুন");
        setLoading(true);
        try {
            // API calls with authorization
            const config = {
                url: '', // Will be set in proxy
                payload: { docId: nid, docType: "SNID" },
                token: token // Passing the dynamic token
            };

            const regRes = await axios.post('/api/proxy', { ...config, url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list' });
            setRegList(regRes.data.replyMessage || []);

            const restRes = await axios.post('/api/proxy', { ...config, url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/restricted_imei_list' });
            setRestList(restRes.data.replyMessage);

        } catch (err) {
            alert("ডেটা লোড করতে সমস্যা হয়েছে। টোকেন এক্সপায়ার হতে পারে।");
        }
        setLoading(false);
    };

    const renderItem = (item) => {
        const [date, timePart] = item.createdAt.split('T');
        return (
            <div className="card mb-3 border-0 shadow-sm p-3 rounded-4 bg-body-tertiary">
                <div className="d-flex justify-content-between">
                    <span className="fw-bold text-primary">{item.imei}</span>
                    <span className="badge bg-success-subtle text-success">{item.regState}</span>
                </div>
                <div className="small text-muted mt-2 d-flex justify-content-between">
                    <span><i className="bi bi-calendar3"></i> {date}</span>
                    <span><i className="bi bi-clock"></i> {timePart.split('.')[0]}</span>
                    <span className="fw-bold">{item.tag}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="container py-2">
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                <h4 className="fw-bold"><i className="bi bi-card-checklist text-primary"></i> NID IMEI List</h4>
                <p className="text-muted small">আপনার NID দিয়ে নিবন্ধিত সকল IMEI এর তালিকা দেখুন।</p>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="NID Number" 
                        value={nid} onChange={(e) => setNid(e.target.value)} disabled={isLoggedIn} />
                    <button className="btn btn-primary px-4" onClick={fetchData} disabled={loading}>
                        {loading ? <LoadingSpinner /> : 'Check List'}
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <h5 className="mb-3 fw-bold text-success">Registered Devices</h5>
                    {regList.length > 0 ? regList.map((item, i) => renderItem(item)) : <p className="text-muted">কোনো নিবন্ধিত হ্যান্ডসেট পাওয়া যায়নি।</p>}
                </div>
                <div className="col-md-6">
                    <h5 className="mb-3 fw-bold text-danger">Restricted Devices</h5>
                    {typeof restList === 'string' ? (
                        <div className="alert alert-info border-0 rounded-4">{restList}</div>
                    ) : Array.isArray(restList) && restList.length > 0 ? (
                        restList.map((item, i) => renderItem(item))
                    ) : <div className="text-muted">রেস্ট্রিকশন লিস্ট খালি।</div>}
                </div>
            </div>
        </div>
    );
}

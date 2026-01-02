"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function NidList() {
    const { user, getValidToken } = useAuth();
    const [nid, setNid] = useState('');
    const [regList, setRegList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && user.docId) {
            setNid(user.docId);
        }
    }, [user]);

    const fetchData = async () => {
        if (!nid) return alert("NID নম্বর দিন");
        setLoading(true);
        try {
            const token = await getValidToken(); // Always get a fresh token
            
            const res = await axios.post('/api/proxy', {
                url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list',
                token: token,
                payload: { docId: nid, docType: "SNID" }
            });

            if (res.data.success) {
                setRegList(res.data.replyMessage);
            }
        } catch (err) { alert("API Connection Error"); }
        setLoading(false);
    };

    return (
        <div className="col-md-10 mx-auto py-3">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-4 shadow-lg border-0 rounded-4 mb-4">
                <h4 className="fw-bold"><i className="bi bi-list-check text-primary"></i> Registered IMEI List</h4>
                <div className="input-group mt-3">
                    <input type="text" className="form-control form-control-lg" placeholder="NID Number" value={nid} onChange={(e)=>setNid(e.target.value)} />
                    <button className="btn btn-primary px-4" onClick={fetchData} disabled={loading}>
                        {loading ? <LoadingSpinner /> : 'Get Records'}
                    </button>
                </div>
            </motion.div>

            <div className="row">
                {Array.isArray(regList) && regList.map((item, idx) => {
                    const [date, time] = item.createdAt.split('T');
                    return (
                        <div key={idx} className="col-md-6">
                            <div className="card mb-3 border-0 shadow-sm border-start border-4 border-success rounded-3">
                                <div className="card-body">
                                    <h6 className="fw-bold text-primary">IMEI: {item.imei}</h6>
                                    <div className="small text-muted">
                                        <p className="mb-1">MSISDN: {item.msisdn}</p>
                                        <p className="mb-0"><i className="bi bi-calendar"></i> {date} | <i className="bi bi-clock"></i> {time.split('.')[0]}</p>
                                    </div>
                                    <span className="badge bg-success mt-2">{item.regState}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

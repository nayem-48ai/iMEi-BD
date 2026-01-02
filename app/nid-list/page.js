"use client";
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function NidList() {
    const [nid, setNid] = useState('');
    const [regList, setRegList] = useState([]);
    const [restList, setRestList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (!nid) return alert("NID নম্বর দিন");
        setLoading(true);
        try {
            // Registered List Request
            const res1 = await axios.post('/api/proxy', {
                url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list',
                payload: { docId: nid, docType: "SNID" }
            });
            if (res1.data.success) setRegList(res1.data.replyMessage);

            // Restricted List Request
            const res2 = await axios.post('/api/proxy', {
                url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/restricted_imei_list',
                payload: { docId: nid, docType: "SNID" }
            });
            setRestList(res2.data.replyMessage);
        } catch (err) { alert("Error fetching data"); }
        setLoading(false);
    };

    const renderCard = (item, color) => {
        const [date, timePart] = item.createdAt.split('T');
        const time = timePart.split('.')[0];
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`card mb-3 shadow-sm border-0 border-start border-4 border-${color}`}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0 text-primary">IMEI: {item.imei}</h6>
                        <span className={`badge bg-${color}`}>{item.tag || item.regState}</span>
                    </div>
                    <p className="small mb-1"><i className="bi bi-phone"></i> MSISDN: {item.msisdn}</p>
                    <div className="d-flex justify-content-between small text-muted mt-2">
                        <span><i className="bi bi-calendar-event"></i> {date}</span>
                        <span><i className="bi bi-clock"></i> {time}</span>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="container py-3">
            <div className="card p-4 shadow-lg rounded-4 border-0 mb-4">
                <h4>NID-based IMEI Inquiry</h4>
                <div className="input-group mt-3">
                    <input type="text" className="form-control" placeholder="Enter NID Number" value={nid} onChange={(e)=>setNid(e.target.value)} />
                    <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
                        {loading ? <LoadingSpinner /> : 'Fetch List'}
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h5 className="mb-3">Registered List ({Array.isArray(regList) ? regList.length : 0})</h5>
                    {Array.isArray(regList) && regList.map(item => renderCard(item, 'success'))}
                </div>
                <div className="col-md-6">
                    <h5 className="mb-3">Restricted List</h5>
                    {typeof restList === 'string' ? <div className="alert alert-warning">{restList}</div> : 
                     Array.isArray(restList) && restList.map(item => renderCard(item, 'danger'))}
                </div>
            </div>
        </div>
    );
}

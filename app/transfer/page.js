"use client";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // install manually or use alert

export default function Transfer() {
    const [formData, setFormData] = useState({ imei: '', msisdn: '', docDigits: '', nextMsisdn: '' });
    const [loading, setLoading] = useState(false);

    const handleTransfer = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/proxy', {
                url: 'https://neir.btrc.gov.bd/services/NEIRPortalService/api/deregistration',
                payload: {
                    imei: formData.imei,
                    msisdn: "88" + formData.msisdn,
                    docDigits: formData.docDigits,
                    nextMsisdn: "88" + formData.nextMsisdn
                }
            });
            if (res.data.replyMessage === true) {
                Swal.fire('সফল হয়েছে!', 'আপনার রিকোয়েস্ট সফল হয়েছে। আপনি দ্রুত একটি SMS পাবেন।', 'success');
            } else {
                Swal.fire('ব্যর্থ!', 'তথ্য ভুল বা সিস্টেম সমস্যা।', 'error');
            }
        } catch (err) { alert("API Error"); }
        setLoading(false);
    };

    return (
        <div className="container max-w-500 py-4">
            <div className="card p-4 shadow border-0 rounded-4">
                <h4 className="text-center mb-4"><i className="bi bi-arrow-repeat text-primary"></i> Transfer IMEI</h4>
                <input className="form-control mb-3" placeholder="IMEI Number" onChange={e => setFormData({...formData, imei: e.target.value})} />
                <input className="form-control mb-3" placeholder="Current Phone (e.g. 017...)" onChange={e => setFormData({...formData, msisdn: e.target.value})} />
                <input className="form-control mb-3" placeholder="NID Last 4 Digits" onChange={e => setFormData({...formData, docDigits: e.target.value})} />
                <input className="form-control mb-3" placeholder="Transfer to Phone" onChange={e => setFormData({...formData, nextMsisdn: e.target.value})} />
                <button className="btn btn-primary w-100 py-2" onClick={handleTransfer} disabled={loading}>
                    {loading ? <LoadingSpinner /> : 'Request Transfer'}
                </button>
            </div>
        </div>
    );
}

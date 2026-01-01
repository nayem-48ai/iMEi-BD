import { useState } from 'react';
import Layout from '../components/Layout';

export default function NIDPage() {
  const [nid, setNid] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    const res = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: 'doc_imei_list', payload: { docId: nid, docType: "SNID" } })
    });
    const result = await res.json();
    setData(result.replyMessage);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="card glass-card p-4 border-0 shadow-lg rounded-4 animate__animated animate__fadeInDown">
          <h2 className="fw-bold text-center mb-4">NID তথ্য অনুসন্ধান</h2>
          <div className="input-group mb-3 custom-search">
            <input type="text" className="form-control p-3 border-0 bg-light" placeholder="স্মার্ট এনআইডি নম্বর দিন" onChange={e => setNid(e.target.value)} />
            <button className="btn btn-primary px-4 fw-bold" onClick={fetchList} disabled={loading}>
              {loading ? 'খোঁজা হচ্ছে...' : 'সার্চ'}
            </button>
          </div>
        </div>

        <div className="row mt-4">
          {Array.isArray(data) && data.map((item, idx) => (
            <div className="col-md-6 mb-3" key={idx}>
              <div className="card border-0 shadow-sm rounded-4 h-100 animate__animated animate__zoomIn">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3">{item.tag}</span>
                    <small className="text-muted">{item.createdAt.split('T')[0]}</small>
                  </div>
                  <h5 className="fw-bold mb-1">{item.imei}</h5>
                  <p className="text-muted small mb-0">MSISDN: {item.msisdn === "-1" ? "Not Found" : item.msisdn}</p>
                  <div className="mt-2"><span className="badge bg-success">{item.regState}</span></div>
                </div>
              </div>
            </div>
          ))}
          {data && !Array.isArray(data) && <div className="alert alert-info text-center rounded-4">{data}</div>}
        </div>
      </div>
    </Layout>
  );
}

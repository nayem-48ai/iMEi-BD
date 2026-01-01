import { useState } from 'react';
import Layout from '../components/Layout';

export default function NIDPage() {
  const [nid, setNid] = useState('');
  const [token, setToken] = useState('');
  const [registeredList, setRegisteredList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!nid || !token) return alert("NID এবং Token উভয়ই প্রদান করুন।");
    setLoading(true);
    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          endpoint: 'doc_imei_list', 
          token: token,
          payload: { docId: nid, docType: "SNID" } 
        })
      });
      const data = await res.json();
      setRegisteredList(Array.isArray(data.replyMessage) ? data.replyMessage : []);
    } catch (e) { alert("Error fetching data!"); }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card glass-card shadow-lg p-4 border-0 rounded-4">
          <h3 className="fw-bold mb-4 text-center">NID IMEI List</h3>
          <div className="mb-3">
            <label className="form-label fw-bold">Smart NID Number</label>
            <input type="text" className="form-control rounded-3 p-3" placeholder="Enter NID" onChange={e => setNid(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Security Token (Bearer)</label>
            <textarea className="form-control rounded-3 p-2" rows="3" placeholder="Paste your token here..." onChange={e => setToken(e.target.value)}></textarea>
          </div>
          <button className="btn btn-primary w-100 py-3 fw-bold" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Fetch IMEI List'}
          </button>
        </div>

        <div className="row mt-5">
          {registeredList.map((item, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card border-0 shadow-sm rounded-4 animate__animated animate__zoomIn">
                <div className="card-body">
                  <span className="badge bg-primary mb-2">{item.tag}</span>
                  <h5 className="fw-bold">{item.imei}</h5>
                  <p className="mb-1 text-muted small">MSISDN: {item.msisdn}</p>
                  <p className="mb-0 small">Registered: {item.createdAt.split('T')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

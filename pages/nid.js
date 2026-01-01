import { useState } from 'react';
import Layout from '../components/Layout';
import NIDForm from '../components/NIDForm';

export default function NIDPage() {
  const [registeredList, setRegisteredList] = useState([]);
  const [restrictedList, setRestrictedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchNIDData = async (nid) => {
    if (!nid) return alert("দয়া করে NID নম্বর দিন।");
    setLoading(true);
    setSearched(true);
    
    try {
      // 1. Fetch Registered List
      const resReg = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          endpoint: 'doc_imei_list', 
          payload: { docId: nid, docType: "SNID" } 
        })
      });
      const dataReg = await resReg.json();
      setRegisteredList(Array.isArray(dataReg.replyMessage) ? dataReg.replyMessage : []);

      // 2. Fetch Restricted List
      const resRes = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          endpoint: 'restricted_imei_list', 
          payload: { docId: nid, docType: "SNID" } 
        })
      });
      const dataRes = await resRes.json();
      setRestrictedList(dataRes.replyMessage);

    } catch (error) {
      console.error("Error fetching data:", error);
      alert("সার্ভার সমস্যা, আবার চেষ্টা করুন।");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card glass-card p-4 mb-4 animate__animated animate__fadeInDown">
              <h2 className="fw-bold text-center mb-4">NID Registered IMEI Search</h2>
              <NIDForm onSearch={fetchNIDData} loading={loading} />
            </div>

            {searched && !loading && (
              <div className="animate__animated animate__fadeIn">
                
                {/* Registered List Section */}
                <h4 className="mb-3 fw-bold text-success border-bottom pb-2">✅ Registered List</h4>
                {registeredList.length > 0 ? (
                  <div className="row">
                    {registeredList.map((item, index) => (
                      <div className="col-md-6 mb-3" key={index}>
                        <div className="card border-0 shadow-sm rounded-4 h-100 animate__animated animate__zoomIn">
                          <div className="card-body">
                            <h6 className="text-primary fw-bold">IMEI: {item.imei}</h6>
                            <p className="small mb-1"><b>MSISDN:</b> {item.msisdn === "-1" ? "Not Set" : item.msisdn}</p>
                            <p className="small mb-1"><b>Status:</b> <span className="badge bg-info">{item.regState}</span></p>
                            <p className="small mb-1"><b>Tag:</b> <span className="badge bg-secondary">{item.tag}</span></p>
                            <hr className="my-2" />
                            <small className="text-muted">
                              📅 Date: {item.createdAt.split('T')[0]} | Time: {item.createdAt.split('T')[1].split('.')[0]}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-warning rounded-4">এই NID তে কোনো নিবন্ধিত IMEI পাওয়া যায়নি।</div>
                )}

                {/* Restricted List Section */}
                <h4 className="mt-5 mb-3 fw-bold text-danger border-bottom pb-2">🚫 Restricted List</h4>
                <div className="card border-0 shadow-sm rounded-4 p-3 mb-5">
                  {typeof restrictedList === 'string' ? (
                    <p className="mb-0 text-muted">{restrictedList}</p>
                  ) : Array.isArray(restrictedList) && restrictedList.length > 0 ? (
                    restrictedList.map((item, index) => (
                        <div key={index} className="alert alert-danger mb-2">IMEI: {item.imei} - Restricted</div>
                    ))
                  ) : (
                    <p className="mb-0 text-muted">No Restricted List found.</p>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

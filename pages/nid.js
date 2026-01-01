// ... logic similar to index.js but calling doc_imei_list
{data.map((item, index) => (
    <div className="col-md-6 mb-3" key={index}>
        <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-body">
                <h5 className="text-primary">IMEI: {item.imei}</h5>
                <p className="mb-1 text-muted">MSISDN: {item.msisdn}</p>
                <p className="mb-1">Status: <span className="badge bg-success">{item.regState}</span></p>
                <small>Date: {item.createdAt.replace('T', ' ')}</small>
            </div>
        </div>
    </div>
))}

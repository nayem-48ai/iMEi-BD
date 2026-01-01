import { useState } from 'react';

export default function NIDForm({ onSearch, loading }) {
  const [nid, setNid] = useState('');

  return (
    <div className="input-group mb-0 shadow-sm rounded-pill overflow-hidden">
      <input 
        type="text" 
        className="form-control border-0 p-3 px-4" 
        placeholder="Enter Smart NID (e.g. 5574743273)" 
        value={nid}
        onChange={(e) => setNid(e.target.value)}
      />
      <button 
        className="btn btn-primary px-4 fw-bold" 
        onClick={() => onSearch(nid)}
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm" role="status"></span>
        ) : 'Search List'}
      </button>
    </div>
  );
}

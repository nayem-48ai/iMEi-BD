export default function NIDForm({ onSearch, loading }) {
  const [nid, setNid] = useState('');

  return (
    <div className="input-group mb-4 shadow-sm rounded-4 overflow-hidden">
      <input 
        type="text" className="form-control border-0 p-3" 
        placeholder="Enter Smart NID (10 Digits)" 
        onChange={(e) => setNid(e.target.value)}
      />
      <button className="btn btn-primary px-4" onClick={() => onSearch(nid)}>
        {loading ? 'Searching...' : 'Search List'}
      </button>
    </div>
  );
}

export default function IMEIForm({ onResult, loading }) {
  const [imei, setImei] = useState('');

  return (
    <div className="text-center">
      <div className="input-group mb-3 shadow-sm rounded-pill overflow-hidden">
        <input 
          type="text" className="form-control border-0 p-3 px-4" 
          placeholder="Enter 15 digit IMEI" 
          onChange={(e) => setImei(e.target.value)}
        />
        <button className="btn btn-primary px-4" onClick={() => onResult(imei)}>
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </div>
    </div>
  );
}

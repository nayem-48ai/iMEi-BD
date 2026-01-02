export default function LoadingSpinner({ size = 'md' }) {
  const dimensions = size === 'sm' ? '1rem' : '2rem';
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" 
           style={{ width: dimensions, height: dimensions }} 
           role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

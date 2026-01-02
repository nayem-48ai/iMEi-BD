"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      setUser(JSON.parse(jsonPayload));
    } catch (e) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, []);

  if (!user) return <p className="text-center">Loading Profile...</p>;

  return (
    <div className="card shadow-lg border-0 rounded-4 overflow-hidden mx-auto" style={{ maxWidth: '500px' }}>
      <div className="bg-primary p-5 text-center text-white">
        <h2 className="mb-0">{user.user_data.username}</h2>
        <span>Citizen Profile</span>
      </div>
      <div className="card-body p-4">
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <strong>NID/Doc ID:</strong> <span>{user.user_data.docId}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>Mobile:</strong> <span>{user.user_data.msisdn}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>Token Status:</strong> <span className="badge bg-success">Valid</span>
          </li>
        </ul>
        <div className="mt-4">
           <small className="text-muted text-break">Token: {localStorage.getItem('token').substring(0, 50)}...</small>
           <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => navigator.clipboard.writeText(localStorage.getItem('token'))}>Copy Key</button>
        </div>
      </div>
    </div>
  );
}

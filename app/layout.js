"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <div className="d-flex">
              <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
              <div className="flex-grow-1 min-vh-100" style={{ transition: '0.3s' }}>
                <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
                <main className="container py-4">{children}</main>
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
        <title>NEIR IMEI BD - Advanced</title>
      </head>
      <body>
        <ThemeProvider>
          <div className="d-flex overflow-hidden" style={{ minHeight: '100vh' }}>
            {/* Desktop Sidebar */}
            <Sidebar />
            
            <div className="flex-grow-1 d-flex flex-column" style={{ width: '100%', overflowY: 'auto' }}>
              <Navbar />
              <main className="container-fluid p-3 p-md-4">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

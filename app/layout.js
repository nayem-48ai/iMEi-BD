"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Bootstrap JS Loading
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 min-vh-100 d-flex flex-column bg-body">
              <Navbar />
              <main className="container-fluid p-3 p-md-5">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

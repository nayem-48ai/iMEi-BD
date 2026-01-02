"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Bootstrap JS Load
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column vh-100 overflow-auto">
              <Navbar />
              <div className="container-fluid p-3 p-md-5">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

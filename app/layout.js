"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>NEIR Advance Portal | Tnayem48</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      <body>
        <ThemeProvider>
          <div className="d-flex overflow-hidden">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-grow-1 min-vh-100 d-flex flex-column" style={{ 
              marginLeft: isOpen ? '0px' : '0', 
              transition: '0.3s' 
            }}>
              <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
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

"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>NEIR Advance Portal</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      <body>
        <ThemeProvider>
          <div className="d-flex">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="main-content w-100" style={{ marginLeft: isOpen ? '250px' : '0', transition: '0.3s' }}>
              <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
              <main className="container mt-4 p-4">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}

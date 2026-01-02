import { AuthProvider } from '@/context/AuthContext';
// ... বাকি সব একই থাকবে, শুধু কন্টেন্টকে <AuthProvider> দিয়ে মুড়িয়ে দিন
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
             {/* Navbar, Sidebar, and Main Content logic here */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

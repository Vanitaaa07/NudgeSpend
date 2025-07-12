import './globals.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export const metadata = {
  title: 'Finance Dashboard',
  description: 'A finance dashboard built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100 min-h-screen text-gray-800">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}

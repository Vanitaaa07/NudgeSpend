// /src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Nudge Spend Save",
  description: "Track and manage expenses smartly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Top Nav */}
          <header className="h-16 bg-gray-900 text-white flex items-center px-6">
            <h1 className="text-xl font-bold">Nudge Spend Save</h1>
          </header>

          <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4">
              <nav className="flex flex-col gap-4">
                <a href="/" className="hover:underline">Home</a>
                <a href="/dashboard" className="hover:underline">Dashboard</a>
                <a href="#" className="hover:underline">Budgets</a>
                <a href="#" className="hover:underline">Settings</a>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
          </div>

          <footer className="h-12 bg-gray-200 flex items-center justify-center text-sm">
            &copy; 2025 Nudge Spend Save
          </footer>
        </div>
      </body>
    </html>
  );
}

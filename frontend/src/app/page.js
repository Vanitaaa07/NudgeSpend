'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Top Nav */}
//       <header className="h-16 bg-gray-900 text-white flex items-center px-6">
//         <h1 className="text-xl font-bold">Nudge Spend Save</h1>
//       </header>

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-gray-100 p-4">
//           <nav className="flex flex-col gap-4">
//             <a href="#" className="hover:underline">Dashboard</a>
//             <a href="#" className="hover:underline">Expenses</a>
//             <a href="#" className="hover:underline">Budgets</a>
//             <a href="#" className="hover:underline">Settings</a>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
//           <p>This is your smart budget dashboard.</p>
//           {/* Add charts + expense table here later */}
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="h-12 bg-gray-200 flex items-center justify-center text-sm">
//         &copy; 2025 Nudge Spend Save
//       </footer>
//     </div>
//   );
// }
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null;
}

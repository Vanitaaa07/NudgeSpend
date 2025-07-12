'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaMoneyBill,
  FaChartBar,
  FaWallet,
  FaCalendar,
  FaBell,
  FaCog,
  FaCreditCard
} from 'react-icons/fa';
import Link from 'next/link';

const menuItems = [
  { label: 'Dashboard', icon: <FaHome />, href: '/dashboard' },
  { label: 'Transactions', icon: <FaMoneyBill />, href: '/transactions', badge: 12 },
  { label: 'Budget', icon: <FaWallet />, href: '/budget' },
  { label: 'Analytics', icon: <FaChartBar />, href: '/analytics' },
  { label: 'Cards', icon: <FaCreditCard />, href: '/cards' },
  { label: 'Calendar', icon: <FaCalendar />, href: '/calendar' },
];

const accountItems = [
  { label: 'Notifications', icon: <FaBell />, href: '/notifications', badge: 3 },
  { label: 'Settings', icon: <FaCog />, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderItem = (item) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        key={item.label}
        className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
          isActive ? 'bg-gray-100 font-semibold text-black' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
        {item.badge && (
          <span className="text-xs text-white bg-red-500 rounded-full px-2 py-0.5">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-white h-screen border-r px-4 py-6 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <h2 className="text-xs text-gray-400 font-semibold px-2 mb-2">Main Menu</h2>
          <nav className="space-y-1">
            {menuItems.map(renderItem)}
          </nav>
        </div>

        <div>
          <h2 className="text-xs text-gray-400 font-semibold px-2 mb-2">Account</h2>
          <nav className="space-y-1">
            {accountItems.map(renderItem)}
          </nav>
        </div>
      </div>

      <div className="px-2 mt-4 border-t pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div>
            <p className="text-sm font-medium text-gray-700">Alex Johnson</p>
            <p className="text-xs text-gray-500">alex@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

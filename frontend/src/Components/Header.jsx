'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaBell } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      {/* Left section - Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-2">
          <span role="img" aria-label="wallet" className="text-white text-xl">💼</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Nudge Spend Save</h1>
          <p className="text-xs text-gray-500">Personal Finance</p>
        </div>
      </div>

      {/* Right section - Search + Actions */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search transactions..."
          className="border rounded px-3 py-1 text-sm w-64"
        />

        <button className="border px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
          Filter
        </button>
        <button className="border px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
          Export
        </button>

        <button
          onClick={() => router.push('/addExpense')}
          className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded text-sm shadow"
        >
          <FaPlus className="mr-2" />
          Add Transaction
        </button>

        {/* Notification bell */}
        <div className="relative">
          <FaBell className="text-gray-600 text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </div>
      </div>
    </header>
  );
}

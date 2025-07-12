'use client';
import React, { useState } from 'react';

export default function AddExpensePage() {
  const [formData, setFormData] = useState({
    vendor: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
  });

  const [mode, setMode] = useState('scan'); // 'manual' or 'scan'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store to localStorage (or send to API/backend)
    const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const newExpense = { ...formData, id: Date.now() };
    localStorage.setItem('expenses', JSON.stringify([newExpense, ...existingExpenses]));

    alert('Expense added successfully!');
    setFormData({
      vendor: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">+ Add New Expense</h1>
      <p className="text-gray-500 mb-4">
        Track your spending manually or scan receipts with AI
      </p>

      {/* Toggle buttons */}
      <div className="flex gap-2 mb-4">
        <button
          className={`flex-1 px-4 py-2 rounded-md ${
            mode === 'manual' ? 'bg-gray-300' : 'bg-white'
          } border`}
          onClick={() => setMode('manual')}
        >
          Manual Entry
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded-md ${
            mode === 'scan' ? 'bg-blue-100 text-blue-700' : 'bg-white'
          } border`}
          onClick={() => setMode('scan')}
        >
          <span role="img" aria-label="camera" className="mr-1">📷</span> Scan Receipt
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vendor</label>
          <input
            type="text"
            name="vendor"
            placeholder="e.g., Starbucks"
            value={formData.vendor}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food & Dining</option>
            <option value="Transport">Transportation</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Housing">Housing</option>
            <option value="Other">Other</option>
          </select>
        </div>

       

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

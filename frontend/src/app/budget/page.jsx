// src/app/budget/page.jsx
'use client';

import React, { useEffect, useState } from 'react';

export default function BudgetPage() {
  const [budget, setBudget] = useState(5000); // default monthly budget
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(stored);
    const sum = stored.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    setTotalSpent(sum);
  }, []);

  const handleBudgetChange = (e) => {
    setBudget(Number(e.target.value));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Budget Overview</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Set Monthly Budget</h2>
            <input
              type="number"
              className="border border-gray-300 rounded p-2 w-full md:w-64"
              value={budget}
              onChange={handleBudgetChange}
            />
          </div>

          <div className="mt-6 md:mt-0">
            <h2 className="text-xl font-semibold">Total Spent</h2>
            <p className="text-2xl font-bold text-red-600">${totalSpent.toFixed(2)}</p>
          </div>

          <div className="mt-6 md:mt-0">
            <h2 className="text-xl font-semibold">Remaining</h2>
            <p className="text-2xl font-bold text-green-600">
              ${(budget - totalSpent).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((tx, idx) => (
              <li key={idx} className="flex justify-between border-b pb-2">
                <span>{tx.vendor || 'Unnamed'}</span>
                <span className="font-medium">${parseFloat(tx.amount).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

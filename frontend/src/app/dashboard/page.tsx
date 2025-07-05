"use client";

import React, { useState, useEffect } from "react";

interface Expense {
  id: number;
  vendor: string;
  amount: number;
  category: string;
  createdAt: string; // optional, depends on schema
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");

  // ✅ Load expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses");
      if (!res.ok) {
        console.error("API failed:", res.status);
        setExpenses([]);
        return;
      }
      const data = await res.json();
      console.log("Fetched expenses:", data);
      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error("Unexpected data:", data);
        setExpenses([]);
      }
    } catch (err) {
      console.error("Error fetching:", err);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ Add expense
  const addExpense = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor,
          amount: parseFloat(amount),
          category: "Misc",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to add:", text);
        alert("Failed to add expense: " + text);
        return;
      }

      // Refresh expenses
      await fetchExpenses();

      setVendor("");
      setAmount("");
    } catch (err) {
      console.error("Add expense failed:", err);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          placeholder="Vendor"
          className="border p-2"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2"
          type="number"
        />
        <button
          onClick={addExpense}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      <ul className="space-y-2">
        {Array.isArray(expenses) && expenses.length > 0 ? (
          expenses.map((exp) => (
            <li key={exp.id} className="p-2 border rounded">
              {exp.vendor} — ${exp.amount} — {exp.category}
            </li>
          ))
        ) : (
          <li>No expenses found.</li>
        )}
      </ul>
    </main>
  );
}

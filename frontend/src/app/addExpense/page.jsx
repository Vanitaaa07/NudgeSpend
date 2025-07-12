'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';


export default function AddExpensePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    vendor: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [mode, setMode] = useState('scan');

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Auth check result:', { session, error });
        
        if (error) {
          console.error('Auth error:', error);
        }
        
        if (session) {
          setUser(session.user);
          console.log('User logged in:', session.user);
        } else {
          console.log('No session found');
        }
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add expenses.');
      return;
    }

    try {
      const userId = user.id;

      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId }), // Send userId for now
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to add expense');
      }

      alert('✅ Expense added successfully!');

      setFormData({
        vendor: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong while adding the expense');
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">+ Add New Expense</h1>
      <p className="text-gray-500 mb-4">
        Track your spending manually or scan receipts with AI
      </p>
      
      {/* Authentication Status */}
      <div className={`mb-4 p-3 rounded-md ${user ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {user ? (
          <div>
            ✅ Logged in as: {user.email}
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
              }}
              className="ml-2 text-sm underline"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            ❌ Not logged in
            <a href="/login" className="ml-2 text-sm underline">Sign In</a>
            <button 
              onClick={async () => {
                console.log('Manual session check...');
                const { data, error } = await supabase.auth.getSession();
                console.log('Manual session result:', { data, error });
                if (data.session) {
                  setUser(data.session.user);
                }
              }}
              className="ml-2 text-sm underline"
            >
              Check Session
            </button>
          </div>
        )}
      </div>

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

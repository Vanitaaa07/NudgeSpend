import React from 'react';

const categories = [
  { name: 'Food & Dining', value: '$115', percent: 81, color: 'bg-orange-500' },
  { name: 'Transportation', value: '$80', percent: 80, color: 'bg-blue-500' },
  { name: 'Shopping', value: '$120', percent: 76, color: 'bg-purple-500' },
  { name: 'Entertainment', value: '$120', percent: 60, color: 'bg-green-500' },
  { name: 'Housing', value: '$0', percent: 100, color: 'bg-red-500' },
];

export default function CategoryOverview({ className }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-bold mb-4">Overview</h3>
      <div className="space-y-4">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{cat.name}</span>
              <span className="text-green-600 font-semibold">{cat.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2">
              <div className={`${cat.color} h-2 rounded`} style={{ width: `${cat.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import React from 'react';
import CardStats from '../../components/CardStats';
import CategoryOverview from '../../components/CategoryOverview';
import QuickActions from '../../components/QuickActions';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Summary Cards */}
      <CardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Overview */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-4">Spending Overview</h2>
          <CategoryOverview />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

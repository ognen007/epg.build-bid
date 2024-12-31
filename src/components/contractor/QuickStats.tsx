import React from 'react';
import { DollarSign, Award, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from '../stats/StatCard';

export function QuickStats() {
  const stats = [
    {
      title: 'Total Earnings',
      value: 125000,
      icon: DollarSign,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Success Rate',
      value: 85,
      icon: Award,
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Active Bids',
      value: 8,
      icon: Clock,
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Completed Projects',
      value: 32,
      icon: CheckCircle,
      trend: { value: 3, isPositive: true }
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}
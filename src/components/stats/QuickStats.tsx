import React from 'react';
import { Hammer, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { StatCard } from './StatCard';

export function QuickStats() {
  const stats = [
    {
      title: 'Active Projects',
      value: 12,
      icon: Hammer,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Pending Bids',
      value: 24,
      icon: Clock,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Completed Projects',
      value: 156,
      icon: CheckCircle,
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Total Bid Value',
      value: 2.4,
      icon: DollarSign,
      trend: { value: 5, isPositive: true }
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
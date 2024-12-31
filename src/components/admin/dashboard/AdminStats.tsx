import React from 'react';
import { Users, Briefcase, DollarSign, TrendingUp } from 'lucide-react';
import { StatCard } from '../../stats/StatCard';

export function AdminStats() {
  const stats = [
    {
      title: 'Total Users',
      value: 2458,
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Active Projects',
      value: 185,
      icon: Briefcase,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Total Revenue',
      value: 856000,
      icon: DollarSign,
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Growth Rate',
      value: 24,
      icon: TrendingUp,
      trend: { value: 3, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
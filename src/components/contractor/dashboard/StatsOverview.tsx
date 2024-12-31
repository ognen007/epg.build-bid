import React from 'react';
import { Briefcase, CheckSquare, DollarSign, Clock } from 'lucide-react';
import { StatCard } from '../../stats/StatCard';

export function StatsOverview() {
  const stats = [
    {
      title: 'Total Projects',
      value: 15,
      icon: Briefcase,
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Ongoing Tasks',
      value: 8,
      icon: CheckSquare,
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Total Earnings',
      value: 12000,
      icon: DollarSign,
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Pending Payments',
      value: 2500,
      icon: Clock,
      trend: { value: 1, isPositive: false }
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
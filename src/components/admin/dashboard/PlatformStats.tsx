import React from 'react';
import { Users, Briefcase, DollarSign, Clock } from 'lucide-react';
import { StatCard } from './StatCard';

const stats = [
  {
    title: 'Total Users',
    value: '700',
    details: '500 contractors, 200 clients',
    icon: Users
  },
  {
    title: 'Active Projects',
    value: '120',
    details: '45 in progress',
    icon: Briefcase
  },
  {
    title: 'Total Earnings',
    value: '$150,000',
    details: '+12% from last month',
    icon: DollarSign
  },
  {
    title: 'Pending Payments',
    value: '$8,000',
    details: '12 payments pending',
    icon: Clock
  }
];

export function PlatformStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
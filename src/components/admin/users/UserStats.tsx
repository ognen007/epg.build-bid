import React from 'react';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';

export function UserStats() {
  const stats = [
    {
      title: 'Total Users',
      value: 2458,
      icon: Users,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'New Users',
      value: 180,
      icon: UserPlus,
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Active Users',
      value: 1845,
      icon: UserCheck,
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Suspended Users',
      value: 23,
      icon: UserX,
      change: '-5%',
      changeType: 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full
              ${stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'}
            `}>
              <stat.icon className={`h-6 w-6
                ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}
              `} />
            </div>
          </div>
          <div className={`mt-2 text-sm
            ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}
          `}>
            {stat.change} from last month
          </div>
        </div>
      ))}
    </div>
  );
}
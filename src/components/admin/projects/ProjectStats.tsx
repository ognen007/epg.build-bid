import React from 'react';
import { Briefcase, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function ProjectStats() {
  const stats = [
    {
      title: 'Total Projects',
      value: 185,
      icon: Briefcase,
      change: '+12',
      changeType: 'increase'
    },
    {
      title: 'Active Projects',
      value: 45,
      icon: Clock,
      change: '+8',
      changeType: 'increase'
    },
    {
      title: 'Completed Projects',
      value: 125,
      icon: CheckCircle,
      change: '+15',
      changeType: 'increase'
    },
    {
      title: 'Delayed Projects',
      value: 15,
      icon: AlertTriangle,
      change: '-3',
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
            <div className={`p-3 rounded-full ${
              stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <stat.icon className={`h-6 w-6 ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`} />
            </div>
          </div>
          <div className={`mt-2 text-sm ${
            stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {stat.change} from last month
          </div>
        </div>
      ))}
    </div>
  );
}
```tsx
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, AlertOctagon } from 'lucide-react';

export function DisputeStats() {
  const stats = [
    {
      title: 'Open Disputes',
      value: 24,
      icon: AlertTriangle,
      change: '+5',
      changeType: 'increase',
      color: 'yellow'
    },
    {
      title: 'In Review',
      value: 12,
      icon: Clock,
      change: '+2',
      changeType: 'increase',
      color: 'blue'
    },
    {
      title: 'Resolved',
      value: 156,
      icon: CheckCircle,
      change: '+18',
      changeType: 'increase',
      color: 'green'
    },
    {
      title: 'Escalated',
      value: 8,
      icon: AlertOctagon,
      change: '-2',
      changeType: 'decrease',
      color: 'red'
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
            <div className={`p-3 rounded-full bg-${stat.color}-100`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
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
```
import React from 'react';
import { User, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'user_joined' | 'payment_received' | 'project_completed' | 'report';
  content: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'user_joined',
    content: 'New contractor John Smith joined the platform',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'payment_received',
    content: 'Payment of $15,000 processed for Project #1234',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'project_completed',
    content: 'Office Building Renovation project marked as completed',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    type: 'report',
    content: 'New dispute reported for Project #5678',
    timestamp: '1 day ago'
  }
];

const iconMap = {
  user_joined: User,
  payment_received: DollarSign,
  project_completed: CheckCircle,
  report: AlertCircle
};

const colorMap = {
  user_joined: 'bg-blue-100 text-blue-600',
  payment_received: 'bg-green-100 text-green-600',
  project_completed: 'bg-orange-100 text-orange-600',
  report: 'bg-red-100 text-red-600'
};

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${colorMap[activity.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-gray-900">{activity.content}</p>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
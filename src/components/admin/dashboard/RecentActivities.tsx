import React from 'react';
import { UserPlus, DollarSign, CheckCircle } from 'lucide-react';
import { ActivityItem } from './ActivityItem';

const activities = [
  {
    id: '1',
    type: 'user_signup',
    content: 'New contractor John Smith joined the platform',
    timestamp: '2 hours ago',
    icon: UserPlus
  },
  {
    id: '2',
    type: 'payment',
    content: 'Payment of $5,000 processed for Project #1234',
    timestamp: '4 hours ago',
    icon: DollarSign
  },
  {
    id: '3',
    type: 'project',
    content: 'Project "Office Renovation" marked as complete',
    timestamp: '1 day ago',
    icon: CheckCircle
  }
];

export function RecentActivities() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
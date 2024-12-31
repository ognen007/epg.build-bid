import React from 'react';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'message' | 'update' | 'deadline';
  content: string;
  timestamp: string;
  project?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'update',
    content: 'Completed phase 1 of City Center Mall renovation',
    timestamp: '2 hours ago',
    project: 'City Center Mall'
  },
  {
    id: '2',
    type: 'message',
    content: 'New message from John regarding Harbor Bridge project',
    timestamp: '4 hours ago',
    project: 'Harbor Bridge'
  },
  {
    id: '3',
    type: 'deadline',
    content: 'Upcoming deadline for Downtown Park project submission',
    timestamp: 'Tomorrow',
    project: 'Downtown Park'
  }
];

const iconMap = {
  message: MessageSquare,
  update: CheckCircle,
  deadline: Clock
};

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`
                p-2 rounded-full
                ${activity.type === 'message' ? 'bg-blue-100 text-blue-600' : ''}
                ${activity.type === 'update' ? 'bg-green-100 text-green-600' : ''}
                ${activity.type === 'deadline' ? 'bg-orange-100 text-orange-600' : ''}
              `}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-gray-800">{activity.content}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  {activity.project && (
                    <>
                      <span>{activity.project}</span>
                      <span className="mx-2">•</span>
                    </>
                  )}
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Deadline {
  id: string;
  project: string;
  task: string;
  date: string;
  daysLeft: number;
}

const deadlines: Deadline[] = [
  {
    id: '1',
    project: 'City Center Mall',
    task: 'Submit final renovation proposal',
    date: '2024-03-20',
    daysLeft: 5
  },
  {
    id: '2',
    project: 'Harbor Bridge',
    task: 'Complete safety inspection report',
    date: '2024-03-25',
    daysLeft: 10
  }
];

export function UpcomingDeadlines() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
      <div className="space-y-4">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{deadline.task}</p>
              <p className="text-sm text-gray-500">{deadline.project}</p>
              <div className="flex items-center mt-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span className={`
                  font-medium
                  ${deadline.daysLeft <= 5 ? 'text-red-600' : 'text-gray-600'}
                `}>
                  {deadline.daysLeft} days left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
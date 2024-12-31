import React from 'react';
import { Calendar as CalendarIcon, Circle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

const tasks: Task[] = [
  { id: '1', title: 'Submit Harbor Bridge proposal', deadline: 'Today', priority: 'high' },
  { id: '2', title: 'Review contractor applications', deadline: 'Tomorrow', priority: 'medium' },
  { id: '3', title: 'Update project timelines', deadline: 'Next Week', priority: 'low' },
  { id: '4', title: 'Client meeting - City Center', deadline: 'Mar 15', priority: 'high' },
];

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-blue-500',
};

export function TaskList() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Upcoming Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <Circle className={`h-4 w-4 mt-1 ${priorityColors[task.priority]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 break-words">{task.title}</p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <CalendarIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{task.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
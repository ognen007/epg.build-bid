import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  project: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Submit Harbor Bridge proposal documents',
    deadline: '2024-03-15',
    priority: 'high',
    status: 'pending',
    project: 'Harbor Bridge Maintenance'
  },
  {
    id: '2',
    title: 'Review material costs estimation',
    deadline: '2024-03-18',
    priority: 'medium',
    status: 'in_progress',
    project: 'City Center Mall Renovation'
  }
];

export function ContractorTasks() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
      
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{task.project}</p>
              </div>
              <span className={`
                px-2 py-1 text-sm font-medium rounded-full
                ${task.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${task.priority === 'low' ? 'bg-blue-100 text-blue-800' : ''}
              `}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Due {new Date(task.deadline).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <span className={`
                  flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${task.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                  ${task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : ''}
                  ${task.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                `}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {task.status.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
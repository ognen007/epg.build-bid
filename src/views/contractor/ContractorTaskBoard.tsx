import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  type: 'quote' | 'negotiation' | 'documentation';
  status: 'todo' | 'done';
  project: string;
  deadline?: string;
}

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Review quote for City Center Project',
    type: 'quote',
    status: 'todo',
    project: 'City Center Mall',
    deadline: '2024-03-20'
  },
  {
    id: '2',
    title: 'Submit insurance documentation',
    type: 'documentation',
    status: 'todo',
    project: 'Harbor Bridge',
    deadline: '2024-03-25'
  },
  {
    id: '3',
    title: 'Negotiate final price for Office Complex',
    type: 'negotiation',
    status: 'done',
    project: 'Downtown Office Complex'
  }
];

type TaskType = 'quote' | 'negotiation' | 'documentation';

export function TasksBoard() {
  const [selectedType, setSelectedType] = useState<TaskType>('quote');
  const [tasks, setTasks] = useState(sampleTasks);

  const filteredTasks = tasks.filter(task => task.type === selectedType);
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: 'todo' | 'done') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded-xl">
      {/* Task Type Selector */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-white rounded-full shadow-sm">
          <button
            onClick={() => setSelectedType('quote')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'quote' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Quote Verification
          </button>
          <button
            onClick={() => setSelectedType('negotiation')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'negotiation' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Price Negotiation
          </button>
          <button
            onClick={() => setSelectedType('documentation')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'documentation' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Required Documentation
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-2 gap-6">
        {/* To-Do Column */}
        <div
          onDrop={(e) => handleDrop(e, 'todo')}
          onDragOver={handleDragOver}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">To-Do</h3>
          <div className="space-y-3">
            {todoTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="bg-gray-50 p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow border border-gray-100"
              >
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{task.project}</p>
                {task.deadline && (
                  <p className="text-sm text-orange-600 mt-2">
                    Due: {new Date(task.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div
          onDrop={(e) => handleDrop(e, 'done')}
          onDragOver={handleDragOver}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Done</h3>
          <div className="space-y-3">
            {doneTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="bg-gray-50 p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow border border-gray-100"
              >
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{task.project}</p>
                {task.deadline && (
                  <p className="text-sm text-green-600 mt-2">
                    Completed
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
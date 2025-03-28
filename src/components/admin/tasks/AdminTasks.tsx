import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, X, UserRound, Clock, ListTodo, Play, Pause, StopCircle, Trash2 } from 'lucide-react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { User } from '../../../views/admin/UserManagement';
import { fetchUsers } from '../../../services/admin/adminInfo/adminInformationEndpoint';

export interface Task {
  id: string;
  header: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignee: string;
  description: string;
  timeSpent: number; // Changed from elapsedTime to match backend
}

interface AdminTasksProps {
  csm?: boolean;
}

export const AdminTasks: React.FC<AdminTasksProps> = ({ csm }) => {
  const [filter, setFilter] = useState({ 
    period: 'week',
    status: '',
    search: '' 
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    status: 'todo',
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timers, setTimers] = useState<{ [key: string]: NodeJS.Timer }>({});

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const [fetchedUsers, fetchedTasks] = await Promise.all([
          fetchUsers(),
          fetch('https://epg-backend.onrender.com/api/admin/adminTasks').then(res => res.json())
        ]);
        setUsers(fetchedUsers);
        setTasks(fetchedTasks);
        // Start timers for existing in-progress tasks
        fetchedTasks.forEach((task: Task) => {
          if (task.status === 'in-progress') {
            startTimer(task.id);
          }
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    // Cleanup timers on unmount
    return () => {
      Object.values(timers).forEach(clearInterval);
      setTimers({});
    };
  }, []); // Empty dependency array since timers is managed internally

  const startTimer = (taskId: string) => {
    if (timers[taskId]) return;

    const timer = setInterval(async () => {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, timeSpent: (task.timeSpent || 0) + 1000 }
            : task
        );
        
        const taskToUpdate = updatedTasks.find(t => t.id === taskId);
        if (taskToUpdate) {
          fetch(`https://epg-backend.onrender.com/api/admin/adminTasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timeSpent: taskToUpdate.timeSpent })
          }).catch(err => setError('Failed to update timeSpent'));
        }
        
        return updatedTasks;
      });
    }, 1000);

    setTimers(prev => ({ ...prev, [taskId]: timer }));
  };

  const pauseTimer = (taskId: string) => {
    if (timers[taskId]) {
      clearInterval(timers[taskId]);
      setTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[taskId];
        return newTimers;
      });
    }
  };

  const resetTimer = (taskId: string) => {
    pauseTimer(taskId);
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, timeSpent: 0 } : task
      );
      const taskToUpdate = updatedTasks.find(t => t.id === taskId);
      if (taskToUpdate) {
        fetch(`https://epg-backend.onrender.com/api/admin/adminTasks/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ timeSpent: 0 })
        }).catch(err => setError('Failed to reset timer'));
      }
      return updatedTasks;
    });
  };

  const addTask = async () => {
    if (!newTask.header) return;

    const task: Task = {
      id: Date.now().toString(), // Temporary ID
      header: newTask.header!,
      status: newTask.status as Task['status'],
      assignee: newTask.assignee || '',
      description: newTask.description || '',
      timeSpent: 0
    };

    try {
      const response = await fetch('https://epg-backend.onrender.com/api/admin/adminTasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      const createdTask = await response.json();
      
      setTasks(prev => [...prev, createdTask.adminTask]);
      if (createdTask.adminTask.status === 'in-progress') {
        startTimer(createdTask.adminTask.id);
      }
    } catch (error) {
      setError('Failed to create task');
      console.error('Error creating task:', error);
    }

    setIsAddingTask(false);
    setNewTask({ status: 'todo' });
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      await fetch(`https://epg-backend.onrender.com/api/admin/adminTasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (task.id === taskId) {
            if (newStatus === 'in-progress') {
              startTimer(taskId);
            } else if (task.status === 'in-progress') {
              pauseTimer(taskId);
            }
            return { ...task, status: newStatus };
          }
          return task;
        })
      );
    } catch (error) {
      setError('Failed to update task status');
      console.error('Error updating task status:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    pauseTimer(taskId);
    try {
      await fetch(`https://epg-backend.onrender.com/api/admin/adminTasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = !filter.search || 
      task.header.toLowerCase().includes(filter.search.toLowerCase()) ||
      task.description?.toLowerCase().includes(filter.search.toLowerCase()) ||
      task.assignee.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesSearch && task.status !== 'completed';
  });

  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-xl font-semibold">Task Management</h2>
          <button
            onClick={() => setIsAddingTask(true)}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 border-b border-red-200">
          {error}
          <button onClick={() => setError('')} className="ml-2 text-red-900">Dismiss</button>
        </div>
      )}

      {/* Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter({ ...filter, period: 'day' })}
              className={`px-3 py-1 rounded ${
                filter.period === 'day' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setFilter({ ...filter, period: 'week' })}
              className={`px-3 py-1 rounded ${
                filter.period === 'week' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setFilter({ ...filter, period: 'month' })}
              className={`px-3 py-1 rounded ${
                filter.period === 'month' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'
              }`}
            >
              Month
            </button>
            <Filter className="w-5 h-5 ml-2 cursor-pointer text-gray-500" />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-4">Tasks</h3>
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <HoverCard.Root key={task.id}>
              <HoverCard.Trigger asChild>
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{task.header}</h4>
                      <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === 'in-progress' && (
                        <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-lg">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-600">
                            {formatTime(task.timeSpent || 0)}
                          </span>
                          {timers[task.id] ? (
                            <button
                              onClick={() => pauseTimer(task.id)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => startTimer(task.id)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => resetTimer(task.id)}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <StopCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                        className="px-3 py-1 border rounded-lg text-sm bg-white"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className="w-80 bg-white p-4 rounded-lg shadow-lg border"
                  sideOffset={5}
                >
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{task.header}</h4>
                      <p className="text-sm text-gray-500">Status: {task.status}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <UserRound className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Time spent: {formatTime(task.timeSpent || 0)}
                        </span>
                      </div>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 border-t pt-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <HoverCard.Arrow className="fill-white" />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Completed Tasks</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Task</th>
                <th className="text-left py-3 px-4">Assignee</th>
                <th className="text-left py-3 px-4">Time Spent</th>
                <th className="text-left py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map(task => (
                <HoverCard.Root key={task.id}>
                  <HoverCard.Trigger asChild>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <td className="py-3 px-4 font-medium text-gray-900">{task.header}</td>
                      <td className="py-3 px-4 text-gray-600">{task.assignee}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{formatTime(task.timeSpent || 0)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{task.description}</td>
                    </tr>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content
                      className="w-80 bg-white p-4 rounded-lg shadow-lg border"
                      sideOffset={5}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{task.header}</h4>
                          <p className="text-sm text-gray-500">Status: Completed</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <UserRound className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Time spent: {formatTime(task.timeSpent || 0)}
                            </span>
                          </div>
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-600 border-t pt-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <HoverCard.Arrow className="fill-white" />
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <ListTodo className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">New Task</h3>
              </div>
              <button
                onClick={() => setIsAddingTask(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Header</label>
                <input
                  type="text"
                  placeholder="Task header"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={newTask.header || ''}
                  onChange={(e) => setNewTask({ ...newTask, header: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  value={newTask.assignee || ''}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                >
                  <option value="">Select an assignee</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.fullName}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Task description"
                  className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setIsAddingTask(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
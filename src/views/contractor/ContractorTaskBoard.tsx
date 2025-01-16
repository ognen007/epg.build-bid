import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  description: string;
  id: string;
  title: string;
  taskType: 'quote_verification' | 'price_negotiation' | 'required_documentation';
  status: 'todo' | 'done';
  project: string | null;
  deadline?: string;
  comments?: Comment[]; // Add comments to the Task interface
}

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

type TaskType = 'quote_verification' | 'price_negotiation' | 'required_documentation';

export function TasksBoard() {
  const [selectedType, setSelectedType] = useState<TaskType>('price_negotiation');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contractorId, setContractorId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Track the selected task for the modal
  const [newComment, setNewComment] = useState(''); // Track the new comment input

  // Fetch contractor ID based on user email
  useEffect(() => {
    const fetchContractorId = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setError('User not found');
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        const { email } = user;

        // Fetch all contractors from the backend
        const response = await axios.get('https://epg-backend.onrender.com/api/contractor/id');
        console.log('All Contractors:', response.data);

        // Find the logged-in contractor by email
        const loggedInContractor = response.data.find(
          (contractor: any) => contractor.email === email
        );

        if (!loggedInContractor) {
          throw new Error('Logged-in contractor not found');
        }

        // Set the contractor ID in the state
        setContractorId(loggedInContractor.id);
        console.log('Logged-in Contractor ID:', loggedInContractor.id);
      } catch (error) {
        console.error('Error fetching contractor ID:', error);
        setError('Failed to fetch contractor ID');
      } finally {
        setLoading(false);
      }
    };

    fetchContractorId();
  }, []);

  // Fetch tickets for the contractor
  useEffect(() => {
    if (!contractorId) return; // Don't fetch tickets if contractorId is not set

    const fetchTickets = async () => {
      try {
        const response = await axios.get(`https://epg-backend.onrender.com/api/tickets/${contractorId}`);
        const data = response.data;

        // Transform the data to match the Task interface
        const transformedTasks = data.map((ticket: any) => ({
          id: ticket.id,
          title: ticket.title,
          taskType: ticket.taskType,
          status: ticket.status || 'todo', // Default to 'todo' if status is not provided
          project: ticket.project,
          deadline: ticket.deadline,
          comments: ticket.comments || [], // Include comments
        }));
        setTasks(transformedTasks);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        setError('Failed to fetch tickets');
      }
    };

    fetchTickets();
  }, [contractorId]);

  // Handle adding a comment
  const handleAddComment = async () => {
    if (!selectedTask || !newComment.trim()) return;

    try {
      const response = await axios.post(`https://epg-backend.onrender.com/api/comments`, {
        content: newComment,
        author: 'Contractor', // Replace with actual author
        ticketId: selectedTask.id,
      });

      // Update the task with the new comment
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id
            ? { ...task, comments: [...(task.comments || []), response.data] }
            : task
        )
      );

      setNewComment(''); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Filter tasks based on the selected task type
  const filteredTasks = tasks.filter(task => task.taskType === selectedType);

  // Separate tasks into "To-Do" and "Done" based on their status
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

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="space-y-6 bg-gray-100 p-6 rounded-xl">
        {/* Task Type Selector Skeleton */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-white rounded-full shadow-sm animate-pulse">
            <div className="px-4 py-2 rounded-full bg-gray-200 w-24"></div>
            <div className="px-4 py-2 rounded-full bg-gray-200 w-24 mx-2"></div>
            <div className="px-4 py-2 rounded-full bg-gray-200 w-24"></div>
          </div>
        </div>

        {/* Kanban Board Skeleton */}
        <div className="grid grid-cols-2 gap-6">
          {/* To-Do Column Skeleton */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">To-Do</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column Skeleton */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Done</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-red-600 p-6">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 bg-gray-100 p-6 rounded-xl">
      {/* Task Type Selector */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-white rounded-full shadow-sm">
          <button
            onClick={() => setSelectedType('quote_verification')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'quote_verification' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Quote Verification
          </button>
          <button
            onClick={() => setSelectedType('price_negotiation')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'price_negotiation' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Price Negotiation
          </button>
          <button
            onClick={() => setSelectedType('required_documentation')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'required_documentation' 
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
                onClick={() => setSelectedTask(task)} // Open modal on task click
                className="bg-gray-50 p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow border border-gray-100"
              >
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                {task.project && (
                  <p className="text-sm text-gray-500 mt-1">{task.project}</p>
                )}
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
                onClick={() => setSelectedTask(task)} // Open modal on task click
                className="bg-gray-50 p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow border border-gray-100"
              >
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                {task.project && (
                  <p className="text-sm text-gray-500 mt-1">{task.project}</p>
                )}
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

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h2>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{selectedTask.description || 'No description available.'}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
              {selectedTask.comments && selectedTask.comments.length > 0 ? (
                <div className="space-y-4">
                  {selectedTask.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        By {comment.author} on {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddComment();
              }}
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={3}
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Add Comment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
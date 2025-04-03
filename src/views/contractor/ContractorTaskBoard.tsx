import React, { useState, useEffect, useCallback } from 'react';
import { fetchContractorId } from '../../services/contractor/contractorData/contractorIdEndpoint';
import { addComment, fetchTasks, updateTaskStatus } from '../../services/contractor/projects/contractorTask';
import { fetchContractorProfile } from '../../services/contractor/contractorData/contractorSettings';

interface Task {
  id: string;
  title: string;
  description: string;
  taskType: 'quote_verification' | 'price_negotiation' | 'required_documentation';
  status: 'todo' | 'done';
  project: string | null;
  deadline?: string;
  comments?: Comment[];
  stand?: string; // Add the stand field
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState('');
  const [contractorProfile, setContractorProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });

  useEffect(() => {
    async function loadContractorProfile() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          console.error("No user stored")
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser.email) {
          console.error("Email not found in stored user data");
          return;
        }

        const profile = await fetchContractorProfile(parsedUser.email);

        if (profile) {
          setContractorProfile(profile);
        } else {
          console.error("Failed to load profile.")
        }
      } finally {
        setLoading(false);
      }
    }

    loadContractorProfile();
  }, []);

  const loadContractorId = useCallback(async () => {
    try {
      const id = await fetchContractorId();
      setContractorId(id);
    } catch (err) {
      console.error('Error fetching contractor ID:', err);
      setError((err as Error).message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContractorId();
  }, [loadContractorId]);

  useEffect(() => {
    async function loadTasks() {
      if (!contractorId) return;

      try {
        const fetchedTasks = await fetchTasks(contractorId);
        setTasks(fetchedTasks);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    }

    loadTasks();
  }, [contractorId]);  
  
  const handleAddComment = async () => {
    if (!selectedTask || !newComment.trim()) return;

    try {
      const addedComment = await addComment(selectedTask.id, newComment, contractorProfile.fullName);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id ? { ...task, comments: [...(task.comments || []), addedComment] } : task
        )
      );
      setNewComment('');
    } catch (error: any) {
      console.error('Error adding comment:', error);
      setError(error.message || 'Error adding comment'); // Set error state
    }
  };

  const handleDrop = async (e: React.DragEvent, status: 'todo' | 'done') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');

    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status, stand: status === 'done' ? 'done' : '' } : task
    );
    setTasks(updatedTasks);

    try {
      await updateTaskStatus(taskId, status); // Call service function
      console.log('Ticket updated successfully:', { status, stand: status === 'done' ? 'done' : '' });
    } catch (error: any) {
      console.error('Error updating ticket:', error);
      setError(error.message || 'Error updating ticket'); // Set error state
      setTasks(tasks); // Revert local state on error
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Filter tasks based on the selected task type
  const filteredTasks = tasks.filter((task) => task.taskType === selectedType);

  // Separate tasks into "To-Do" and "Done" based on their stand field
  const todoTasks = filteredTasks.filter((task) => task.stand !== 'done');
  const doneTasks = filteredTasks.filter((task) => task.stand === 'done');

  // Debugging: Log tasks whenever they are updated
  useEffect(() => {
    console.log('Tasks updated:', tasks);
  }, [tasks]);

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
            {todoTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onClick={() => setSelectedTask(task)}
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
            {doneTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onClick={() => setSelectedTask(task)}
                className="bg-green-100 p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow border border-gray-100"
              >
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                {task.project && (
                  <p className="text-sm text-gray-500 mt-1">{task.project}</p>
                )}
                {task.deadline && (
                  <p className="text-sm text-green-600 mt-2">Completed</p>
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
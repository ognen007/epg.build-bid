import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, MoreVertical, MessageSquare, X, Search } from 'lucide-react';

interface Contractor {
  id: string;
  name: string;
  projects: Project[];
}

interface Project {
  id: string;
  name: string;
}

interface ClientTask {
  id: string;
  type: 'client';
  title: string;
  description: string;
  contractor: Contractor;
  project: Project;
  taskType: 'quote_verification' | 'price_negotiation' | 'required_documentation';
  comments: Comment[];
  createdAt: string;
}

interface InternalTask {
  id: string;
  type: 'internal';
  title: string;
  description: string;
  comments: Comment[];
  createdAt: string;
}

type Ticket = ClientTask | InternalTask;

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Column {
  id: string;
  title: string;
  tickets: Ticket[];
}

// Sample contractors data
const sampleContractors: Contractor[] = [
  {
    id: '1',
    name: 'ABC Construction',
    projects: [
      { id: '1', name: 'City Center Renovation' },
      { id: '2', name: 'Harbor Bridge Project' }
    ]
  },
  {
    id: '2',
    name: 'XYZ Builders',
    projects: [
      { id: '3', name: 'Shopping Mall Extension' },
      { id: '4', name: 'Office Complex' }
    ]
  }
];

const CLIENT_TASK_TYPES = [
  { value: 'quote_verification', label: 'Quote Verification' },
  { value: 'price_negotiation', label: 'Price Negotiation' },
  { value: 'required_documentation', label: 'Required Documentation' }
] as const;

interface AddClientTaskModalProps {
  onClose: () => void;
  onAdd: (task: Omit<ClientTask, 'id' | 'comments' | 'createdAt'>) => void;
}

function AddClientTaskModal({ onClose, onAdd }: AddClientTaskModalProps) {
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [taskType, setTaskType] = useState<ClientTask['taskType']>('quote_verification');
  const [description, setDescription] = useState('');
  const [contractorSearch, setContractorSearch] = useState('');

  const filteredContractors = sampleContractors.filter(c => 
    c.name.toLowerCase().includes(contractorSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContractor || !selectedProject) return;

    onAdd({
      type: 'client',
      title: `${taskType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - ${selectedProject.name}`,
      description,
      contractor: selectedContractor,
      project: selectedProject,
      taskType
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add Client Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Contractor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contractors..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={contractorSearch}
                  onChange={(e) => setContractorSearch(e.target.value)}
                />
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {filteredContractors.map(contractor => (
                    <button
                      key={contractor.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setSelectedContractor(contractor);
                        setSelectedProject(null);
                        setContractorSearch('');
                      }}
                    >
                      {contractor.name}
                    </button>
                  ))}
                </div>
              </div>
              {selectedContractor && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {selectedContractor.name}
                </div>
              )}
            </div>

            {/* Project Selection */}
            {selectedContractor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={selectedProject?.id || ''}
                  onChange={(e) => {
                    const project = selectedContractor.projects.find(p => p.id === e.target.value);
                    setSelectedProject(project || null);
                  }}
                >
                  <option value="">Select a project</option>
                  {selectedContractor.projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Task Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as ClientTask['taskType'])}
              >
                {CLIENT_TASK_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600"
                disabled={!selectedContractor || !selectedProject || !description}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface AddInternalTaskModalProps {
  onClose: () => void;
  onAdd: (task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>) => void;
}

function AddInternalTaskModal({ onClose, onAdd }: AddInternalTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      type: 'internal',
      title,
      description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add Internal Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600"
                disabled={!title || !description}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ProjectKanbanView() {
  const { id } = useParams();
  const [columns, setColumns] = useState<Column[]>([
    { id: '1', title: 'To Do', tickets: [] },
    { id: '2', title: 'In Progress', tickets: [] },
    { id: '3', title: 'Done', tickets: [] }
  ]);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isAddingClientTask, setIsAddingClientTask] = useState(false);
  const [isAddingInternalTask, setIsAddingInternalTask] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      setColumns([
        ...columns,
        { id: Date.now().toString(), title: newColumnTitle, tickets: [] }
      ]);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  const handleAddClientTask = (task: Omit<ClientTask, 'id' | 'comments' | 'createdAt'>) => {
    const newTask: ClientTask = {
      ...task,
      id: Date.now().toString(),
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    setColumns(columns.map(col => {
      if (col.id === '1') { // Add to "To Do" column
        return {
          ...col,
          tickets: [...col.tickets, newTask]
        };
      }
      return col;
    }));
  };

  const handleAddInternalTask = (task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>) => {
    const newTask: InternalTask = {
      ...task,
      id: Date.now().toString(),
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    setColumns(columns.map(col => {
      if (col.id === '1') { // Add to "To Do" column
        return {
          ...col,
          tickets: [...col.tickets, newTask]
        };
      }
      return col;
    }));
  };

  const handleAddComment = () => {
    if (!selectedTicket || !newComment.trim()) return;

    setColumns(columns.map(col => ({
      ...col,
      tickets: col.tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          return {
            ...ticket,
            comments: [...ticket.comments, {
              id: Date.now().toString(),
              content: newComment,
              author: 'Current User',
              createdAt: new Date().toISOString()
            }]
          };
        }
        return ticket;
      })
    })));
    setNewComment('');
  };

  const handleDragStart = (e: React.DragEvent, ticketId: string, sourceColumnId: string) => {
    e.dataTransfer.setData('ticketId', ticketId);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData('ticketId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

    if (sourceColumnId === targetColumnId) return;

    const sourceColumn = columns.find(col => col.id === sourceColumnId);
    const ticket = sourceColumn?.tickets.find(t => t.id === ticketId);

    if (!ticket) return;

    setColumns(columns.map(col => {
      if (col.id === sourceColumnId) {
        return {
          ...col,
          tickets: col.tickets.filter(t => t.id !== ticketId)
        };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          tickets: [...col.tickets, ticket]
        };
      }
      return col;
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Project Board</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddingInternalTask(true)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Internal Task
          </button>
          <button
            onClick={() => setIsAddingClientTask(true)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client Task
          </button>
          <button
            onClick={() => setIsAddingColumn(true)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map(column => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">{column.title}</h3>
            </div>

            <div className="space-y-3">
              {column.tickets.map(ticket => (
                <div
                  key={ticket.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, ticket.id, column.id)}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`
                    bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-md
                    ${ticket.type === 'client' ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-500'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  {ticket.type === 'client' && (
                    <div className="mt-2 text-sm text-gray-500">
                      <div>{ticket.contractor.name}</div>
                      <div>{ticket.project.name}</div>
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {ticket.description}
                  </div>
                  {ticket.comments.length > 0 && (
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {ticket.comments.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {isAddingColumn && (
          <div className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4">
            <input
              type="text"
              placeholder="Column title"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              autoFocus
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingColumn(false)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColumn}
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Task Modals */}
      {isAddingClientTask && (
        <AddClientTaskModal
          onClose={() => setIsAddingClientTask(false)}
          onAdd={handleAddClientTask}
        />
      )}

      {isAddingInternalTask && (
        <AddInternalTaskModal
          onClose={() => setIsAddingInternalTask(false)}
          onAdd={handleAddInternalTask}
        />
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedTicket(null)} />
            
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{selectedTicket.title}</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {selectedTicket.type === 'client' && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Task Details</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Contractor: {selectedTicket.contractor.name}</div>
                      <div>Project: {selectedTicket.project.name}</div>
                      <div>Task Type: {selectedTicket.taskType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedTicket.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
                  <div className="space-y-4">
                    {selectedTicket.comments.map(comment => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-600">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
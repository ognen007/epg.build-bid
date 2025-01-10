import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, MoreVertical, MessageSquare, X } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  comments: Comment[];
  createdAt: string;
  assignee?: string;
}

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

export function ProjectKanbanView() {
  const { id } = useParams();
  const [columns, setColumns] = useState<Column[]>([
    { id: '1', title: 'To Do', tickets: [] },
    { id: '2', title: 'In Progress', tickets: [] },
    { id: '3', title: 'Done', tickets: [] }
  ]);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAddingTicket, setIsAddingTicket] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
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

  const handleAddTicket = (columnId: string) => {
    if (newTicket.title.trim()) {
      setColumns(columns.map(col => {
        if (col.id === columnId) {
          return {
            ...col,
            tickets: [...col.tickets, {
              id: Date.now().toString(),
              title: newTicket.title,
              description: newTicket.description,
              comments: [],
              createdAt: new Date().toISOString()
            }]
          };
        }
        return col;
      }));
      setNewTicket({ title: '', description: '' });
      setIsAddingTicket(null);
    }
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
        <button
          onClick={() => setIsAddingColumn(true)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </button>
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
              <button
                onClick={() => setIsAddingTicket(column.id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Plus className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {isAddingTicket === column.id && (
              <div className="mb-4 p-3 bg-white rounded-lg shadow">
                <input
                  type="text"
                  placeholder="Ticket title"
                  className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingTicket(null)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddTicket(column.id)}
                    className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {column.tickets.map(ticket => (
                <div
                  key={ticket.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, ticket.id, column.id)}
                  onClick={() => setSelectedTicket(ticket)}
                  className="bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  {ticket.description && (
                    <p className="mt-2 text-sm text-gray-600">{ticket.description}</p>
                  )}
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
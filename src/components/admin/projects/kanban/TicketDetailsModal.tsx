import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  comments?: Comment[];
}

interface TicketDetailsModalProps {
  ticket: Ticket;
  onClose: () => void;
  onAddComment: (content: string) => void;
}

export const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ ticket, onClose, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{ticket.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{ticket.description}</p>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Comments</h3>
              {ticket.comments && ticket.comments.length > 0 ? (
                <div className="space-y-4">
                  {ticket.comments.map((comment) => (
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

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="mt-6">
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
      </div>
    </div>
  );
};
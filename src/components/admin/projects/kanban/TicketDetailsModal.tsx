import React from 'react';
import { X } from 'lucide-react';
import { CommentSection } from './CommentSection';
import { Ticket } from './types';

interface TicketDetailsModalProps {
  ticket: Ticket;
  onClose: () => void;
  onAddComment: (content: string) => void;
}

export const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ ticket, onClose, onAddComment }) => {
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
            {ticket.type === 'client' && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Task Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Contractor: {ticket.contractor}</div>
                  <div>Project: {ticket.project}</div>
                  <div>Task Type: {ticket.taskType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</div>
                </div>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{ticket.description}</p>
            </div>
            <CommentSection comments={ticket.comments} onAddComment={onAddComment} />
          </div>
        </div>
      </div>
    </div>
  );
};
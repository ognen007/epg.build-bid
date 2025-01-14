import React from 'react';
import { MessageSquare, MoreVertical } from 'lucide-react';
import { Ticket } from './types';

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  // Ensure comments is always an array
  const comments = ticket.comments || [];

  return (
    <div
      draggable
      onClick={onClick}
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
          <div>{ticket.contractor}</div>
          <div>{ticket.project}</div>
        </div>
      )}
      <div className="mt-2 text-sm text-gray-600 line-clamp-2">
        {ticket.description}
      </div>
      {comments.length > 0 && ( // Use the safe comments array
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MessageSquare className="h-4 w-4 mr-1" />
          {comments.length}
        </div>
      )}
    </div>
  );
};
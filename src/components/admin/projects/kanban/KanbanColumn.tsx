import React from 'react';
import { TicketCard } from './TicketCard';
import { Column, Ticket } from './types';

interface KanbanColumnProps {
  column: Column;
  onTicketClick: (ticket: Ticket) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, onTicketClick, onDrop }) => {
  // Ensure tickets is always an array
  const tickets = column.tickets || [];

  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">{column.title}</h3>
      </div>
      <div className="space-y-3">
        {tickets.map((ticket) => ( // Use the safe tickets array
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => onTicketClick(ticket)}
          />
        ))}
      </div>
    </div>
  );
};
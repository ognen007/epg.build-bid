import React from 'react';
import { TicketCard } from './TicketCard';
import { Column, Ticket } from './types';

interface KanbanColumnProps {
  column: Column;
  onTicketClick: (ticket: Ticket) => void;
  onDragStart: (e: React.DragEvent, ticketId: string, sourceColumnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetColumnId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onTicketClick,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h2>
      <div className="space-y-3">
        {column.tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-md"
            onClick={() => onTicketClick(ticket)}
            draggable
            onDragStart={(e) => onDragStart(e, ticket.id, column.id)}
          >
            <h3 className="font-medium text-gray-900">{ticket.title}</h3>
            <p className="text-sm text-gray-500">{ticket.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
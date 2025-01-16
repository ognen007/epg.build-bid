import React from 'react';
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
      {/* Column Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h2>

      {/* Tickets in the Column */}
      <div className="space-y-3">
        {column.tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-md"
            onClick={() => onTicketClick(ticket)}
            draggable
            onDragStart={(e) => onDragStart(e, ticket.id, column.id)}
          >
            {/* Project Name in Large Font */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {ticket.name}
            </h3>

            {/* Contractor and Scope in Small Text */}
            <p className="text-sm text-gray-600">
              {ticket.contractor} | {ticket.scope}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
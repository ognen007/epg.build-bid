import React from 'react';

interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
    tickets: any[];
  };
  onTicketClick: (ticket: any) => void;
  onDragStart: (e: React.DragEvent, ticketId: string) => void;
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
      className="flex-1 bg-gray-100 rounded-lg p-4"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h2>
      <div className="space-y-3">
        {column.tickets.map((ticket) => (
          <div
            key={ticket.id}
            draggable
            onDragStart={(e) => onDragStart(e, ticket.id)}
            onClick={() => onTicketClick(ticket)}
            className={`p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md ${
              ticket.highIntent ? 'border-l-[5px] border-red-500' : ''
            }`}
          >
            <div className="font-medium text-gray-900">{ticket.name}</div>
            <div className="text-sm text-gray-500 mt-1">
              Valuation: ${ticket.valuation?.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Deadline: {new Date(ticket.deadline).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { KanbanColumn } from './KanbanColumn';
import { TicketDetailsModal } from './TicketDetailsModal';
import { AddInternalTaskModal } from './AddInternalTaskModal';
import { AddContractorTaskModal } from './AddContractorTaskModal';
import { ContractorTask, Column, InternalTask, Ticket } from './types';

interface ProjectKanbanProps {
  contractorId: string;
}

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export const ProjectKanbanView: React.FC<ProjectKanbanProps> = ({ contractorId }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isAddingContractorTask, setIsAddingContractorTask] = useState(false);
  const [isAddingInternalTask, setIsAddingInternalTask] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Fetch columns and tickets
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/columns/${contractorId}`);
        setColumns(response.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching columns:', error);
        setIsLoading(false);
      }
    };
    fetchColumns();
  }, [contractorId]);

  // Add a new column
  const handleAddColumn = async () => {
    if (!newColumnTitle.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/columns`, {
        title: newColumnTitle,
        contractorId,
      });
      setColumns([...columns, response.data]);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  // Add a new contractor task
  const handleAddContractorTask = async (task: Omit<ContractorTask, 'id' | 'comments' | 'createdAt'>) => {
    if (!columns[0]) {
      alert('Please add a column first.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/tickets`, {
        ...task,
        type: 'contractor',
        columnId: columns[0].id,
        contractorId,
      });

      setColumns((prev) =>
        prev.map((col) =>
          col.id === columns[0].id
            ? { ...col, tickets: [...(col.tickets || []), response.data] }
            : col
        )
      );
      setIsAddingContractorTask(false);
    } catch (error) {
      console.error('Error creating contractor task:', error);
    }
  };

  // Add a new internal task
  const handleAddInternalTask = async (task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>) => {
    if (!columns[0]) {
      alert('Please add a column first.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/tickets`, {
        ...task,
        type: 'internal',
        columnId: columns[0].id,
        contractorId,
      });

      setColumns((prev) =>
        prev.map((col) =>
          col.id === columns[0].id
            ? { ...col, tickets: [...(col.tickets || []), response.data] }
            : col
        )
      );
      setIsAddingInternalTask(false);
    } catch (error) {
      console.error('Error creating internal task:', error);
    }
  };

  // Drag and drop functionality
  const handleDrop = async (e: React.DragEvent, targetColumnId: string) => {
    const ticketId = e.dataTransfer.getData('ticketId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

    if (sourceColumnId === targetColumnId) return;

    try {
      await axios.put(`${API_BASE_URL}/tickets/${ticketId}/column`, { columnId: targetColumnId });

      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === sourceColumnId) {
            return { ...col, tickets: col.tickets.filter((t) => t.id !== ticketId) };
          }
          if (col.id === targetColumnId) {
            const ticket = prev.find((c) => c.id === sourceColumnId)?.tickets.find((t) => t.id === ticketId);
            return ticket ? { ...col, tickets: [...(col.tickets || []), ticket] } : col;
          }
          return col;
        })
      );
    } catch (error) {
      console.error('Error updating ticket column:', error);
    }
  };

  // Add a comment to a ticket
  const handleAddComment = async (content: string) => {
    if (!selectedTicket) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/tickets/${selectedTicket.id}/comments`, {
        content,
        author: 'Current User', // Replace with actual author
      });

      setColumns((prev) =>
        prev.map((col) =>
          col.id === selectedTicket.columnId
            ? {
                ...col,
                tickets: col.tickets.map((t) =>
                  t.id === selectedTicket.id
                    ? { ...t, comments: [...(t.comments || []), response.data] }
                    : t
                ),
              }
            : col
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Header and buttons */}
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
            onClick={() => setIsAddingContractorTask(true)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contractor Task
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

      {/* Columns and tickets */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onTicketClick={setSelectedTicket}
              onDrop={handleDrop}
            />
          ))
        )}

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

      {/* Modals */}
      {isAddingContractorTask && (
        <AddContractorTaskModal
          onClose={() => setIsAddingContractorTask(false)}
          onAdd={handleAddContractorTask}
        />
      )}

      {isAddingInternalTask && (
        <AddInternalTaskModal
          onClose={() => setIsAddingInternalTask(false)}
          onAdd={handleAddInternalTask}
          contractorId={contractorId}
        />
      )}

      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};
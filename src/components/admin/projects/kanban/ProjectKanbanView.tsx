import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { KanbanColumn } from './KanbanColumn';
import { TicketDetailsModal } from './TicketDetailsModal';
import { AddClientTaskModal } from './AddClientTaskModal';
import { AddInternalTaskModal } from './AddInternalTaskModal';
import { ClientTask, Column, InternalTask, Ticket } from './types';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export const ProjectKanbanView: React.FC = () => {
  const { id } = useParams();
  const [columns, setColumns] = useState<Column[]>([]); // Initialize as an empty array
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isAddingClientTask, setIsAddingClientTask] = useState(false);
  const [isAddingInternalTask, setIsAddingInternalTask] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState('');

  // Fetch columns and tickets from the backend
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/columns`);
        console.log('API Response:', response.data); // Debug: Check the API response
        setColumns(response.data || []); // Fallback to an empty array if response.data is undefined
      } catch (error) {
        console.error('Failed to fetch columns:', error);
        setColumns([]); // Fallback to an empty array on error
      }
    };
    fetchColumns();
  }, []);

  console.log('Columns:', columns); // Debug: Check the state of columns

  // Add a new column
  const handleAddColumn = async () => {
    if (newColumnTitle.trim()) {
      try {
        const response = await axios.post(`${API_BASE_URL}/columns`, {
          title: newColumnTitle,
        });
        setColumns([...columns, response.data]);
        setNewColumnTitle('');
        setIsAddingColumn(false);
      } catch (error) {
        console.error('Failed to create column:', error);
      }
    }
  };

  // Add a new client task
  const handleAddClientTask = async (task: Omit<ClientTask, 'id' | 'comments' | 'createdAt'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tickets`, {
        type: 'client',
        title: task.title,
        description: task.description,
        columnId: columns[0]?.id, // Safely access columns[0].id
        contractor: task.contractor,
        project: task.project,
        taskType: task.taskType,
      });

      console.log('API Response:', response.data); // Debug: Check the API response
      console.log('Columns:', columns); // Debug: Check the state of columns

      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          console.log('Column:', col); // Debug: Check each column
          console.log('Column Tickets:', col.tickets); // Debug: Check tickets in each column

          return col.id === columns[0]?.id
            ? { ...col, tickets: [...(col.tickets || []), response.data] } // Fallback to an empty array if col.tickets is undefined
            : col;
        })
      );

      setIsAddingClientTask(false);
    } catch (error) {
      console.error('Failed to create client task:', error);
    }
  };

  // Add a new internal task
  const handleAddInternalTask = async (task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tickets`, {
        type: 'internal',
        title: task.title,
        description: task.description,
        columnId: columns[0]?.id, // Safely access columns[0].id
      });
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === columns[0]?.id
            ? { ...col, tickets: [...(col.tickets || []), response.data] } // Fallback to an empty array if col.tickets is undefined
            : col
        )
      );
      setIsAddingInternalTask(false);
    } catch (error) {
      console.error('Failed to create internal task:', error);
    }
  };

  // Update ticket column (drag-and-drop)
  const handleDrop = async (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData('ticketId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

    if (sourceColumnId === targetColumnId) return;

    try {
      await axios.put(`${API_BASE_URL}/tickets/${ticketId}/column`, {
        columnId: targetColumnId,
      });

      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              tickets: col.tickets.filter((t) => t.id !== ticketId),
            };
          }
          if (col.id === targetColumnId) {
            const ticket = prevColumns
              .find((c) => c.id === sourceColumnId)
              ?.tickets.find((t) => t.id === ticketId);
            if (ticket) {
              return {
                ...col,
                tickets: [...(col.tickets || []), ticket], // Fallback to an empty array if col.tickets is undefined
              };
            }
          }
          return col;
        })
      );
    } catch (error) {
      console.error('Failed to update ticket column:', error);
    }
  };

  // Add a comment to a ticket
  const handleAddComment = async (content: string) => {
    if (!selectedTicket) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/tickets/${selectedTicket.id}/comments`,
        {
          content,
          author: 'Current User', // Replace with actual user name
        }
      );

      setColumns((prevColumns) =>
        prevColumns.map((col) => ({
          ...col,
          tickets: col.tickets.map((ticket) =>
            ticket.id === selectedTicket.id
              ? { ...ticket, comments: [...(ticket.comments || []), response.data] } // Fallback to an empty array if ticket.comments is undefined
              : ticket
          ),
        }))
      );
    } catch (error) {
      console.error('Failed to add comment:', error);
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

      {/* Columns and tickets */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns?.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onTicketClick={setSelectedTicket}
            onDrop={handleDrop}
          />
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

      {/* Modals */}
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
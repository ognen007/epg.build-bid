import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { TicketDetailsModal } from './TicketDetailsModal';
import { AddInternalTaskModal } from './AddInternalTaskModal';
import axios from 'axios';

interface ProjectKanbanProps {}

export const EstimatorKanban: React.FC<ProjectKanbanProps> = () => {
  const [columns, setColumns] = useState([
    {
      id: 'assigned',
      title: 'Assigned',
      tickets: [], // All tasks start here
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tickets: [], // Tasks moved here manually
    },
    {
      id: 'completed',
      title: 'Completed',
      tickets: [], // Tasks with status = awaiting_bid and hold = ready_for_proposal
    },
  ]);

  const [isAddingInternalTask, setIsAddingInternalTask] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          'https://epg-backend.onrender.com/api/projects/hold/'
        );
        const projects = response.data;

        // Separate tasks into columns
        const assignedTickets = projects.filter(
          (project: any) =>
            project.status !== 'awaiting_bid' || project.hold !== 'ready_for_proposal'
        );

        const completedTickets = projects.filter(
          (project: any) =>
            project.status === 'awaiting_bid' &&
            project.hold === 'ready_for_proposal'
        );

        setColumns([
          { id: 'assigned', title: 'Assigned', tickets: assignedTickets },
          { id: 'in-progress', title: 'In Progress', tickets: [] }, // Initially empty
          { id: 'completed', title: 'Completed', tickets: completedTickets },
        ]);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Update task status and hold when a ticket is moved
  const updateTaskStatus = async (taskId: string, newColumnId: string) => {
    try {
      let newStatus = 'takeoff_in_progress'; // Default status
      let newHold = 'takeoff_in_progress'; // Default hold

      // Only update status and hold if the task is moved to the "completed" column
      if (newColumnId === 'completed') {
        newStatus = 'awaiting_bid';
        newHold = 'ready_for_proposal';
      }

      // Log the payload for debugging
      console.log('Updating task:', {
        taskId,
        newStatus,
        newHold,
      });

      // Send the updated status and hold to the backend
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/projects/hold/${taskId}`,
        {
          status: newStatus,
          hold: newHold,
        }
      );

      console.log('Update successful:', response.data);

      // Update the columns state with the updated task
      setColumns((prevColumns:any) =>
        prevColumns.map((col:any) => {
          if (col.tickets.some((ticket:any) => ticket.id === taskId)) {
            // Remove the ticket from the current column
            return {
              ...col,
              tickets: col.tickets.filter((ticket:any) => ticket.id !== taskId),
            };
          }
          if (col.id === newColumnId) {
            // Add the updated ticket to the target column
            return {
              ...col,
              tickets: [...col.tickets, response.data],
            };
          }
          return col;
        })
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    e.dataTransfer.setData('ticketId', ticketId);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow dropping
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();

    const ticketId = e.dataTransfer.getData('ticketId');

    // Update the task status and hold
    updateTaskStatus(ticketId, targetColumnId);
  };

  // Add a comment to a ticket
  const handleAddComment = async (content: string) => {
    if (!selectedTicket) return;

    try {
      // Send the comment to the backend
      const response = await axios.post(
        `https://epg-backend.onrender.com/api/projects/comment/pipeline/${selectedTicket.id}/comments`,
        { content, author: 'Current User' } // Replace with actual author
      );

      // Update the columns state with the new comment
      setColumns((prev) =>
        prev.map((col: any) => ({
          ...col,
          tickets: col.tickets.map((ticket: any) =>
            ticket.id === selectedTicket.id
              ? { ...ticket, comments: [...ticket.comments, response.data] }
              : ticket
          ),
        }))
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
      </div>

      {/* Columns and tickets */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onTicketClick={setSelectedTicket}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};
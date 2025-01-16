import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { TicketDetailsModal } from './TicketDetailsModal';
import { AddInternalTaskModal } from './AddInternalTaskModal';
import axios from 'axios';
import { ProjectCard } from '../../../projects/ProjectCard';

interface ProjectKanbanProps {}

export const EstimatorKanban: React.FC<ProjectKanbanProps> = () => {
  const [columns, setColumns] = useState([
    {
      id: 'assigned',
      title: 'Assigned',
      tickets: [], // Projects with status = takeoff_in_progress and hold = takeoff_in_progress
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tickets: [], // Projects with status = takeoff_complete and hold = ready_for_proposal
    },
    {
      id: 'completed',
      title: 'Completed',
      tickets: [], // Projects with status = bid_recieved and hold = negotiating
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

        // Map projects to tickets and categorize them into columns
        const assignedTickets = projects.filter(
          (project: any) =>
            project.status === 'takeoff_in_progress' &&
            project.hold === 'takeoff_in_progress'
        );
        const inProgressTickets = projects.filter(
          (project: any) =>
            project.status === 'takeoff_complete' &&
            project.hold === 'ready_for_proposal'
        );
        const completedTickets = projects.filter(
          (project: any) =>
            project.status === 'bid_recieved' && project.hold === 'negotiating'
        );

        setColumns([
          { id: 'assigned', title: 'Assigned', tickets: assignedTickets },
          { id: 'in-progress', title: 'In Progress', tickets: inProgressTickets },
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
      let newStatus, newHold;

      // Determine the new status and hold based on the target column
      switch (newColumnId) {
        case 'assigned':
          newStatus = 'takeoff_in_progress';
          newHold = 'takeoff_in_progress';
          break;
        case 'in-progress':
          newStatus = 'takeoff_complete';
          newHold = 'ready_for_proposal';
          break;
        case 'completed':
          newStatus = 'bid_recieved';
          newHold = 'negotiating';
          break;
        default:
          return; // Invalid column
      }

      // Send the updated status and hold to the backend
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/projects/pipeline/${taskId}`,
        {
          status: newStatus,
          hold: newHold,
        }
      );

      // Update the columns state with the updated task
      setColumns((prevColumns: any) =>
        prevColumns.map((col: any) => {
          if (col.tickets.some((ticket: any) => ticket.id === taskId)) {
            // Remove the ticket from the current column
            return {
              ...col,
              tickets: col.tickets.filter((ticket: any) => ticket.id !== taskId),
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
  const handleAddComment = (content: string) => {
    if (!selectedTicket) return;

    const newComment = {
      id: String(selectedTicket.comments.length + 1),
      content,
      author: 'Current User', // Replace with actual author
      createdAt: new Date().toISOString(),
    };

    setColumns((prev) =>
      prev.map((col: any) => ({
        ...col,
        tickets: col.tickets.map((ticket: any) =>
          ticket.id === selectedTicket.id
            ? { ...ticket, comments: [...ticket.comments, newComment] }
            : ticket
        ),
      }))
    );
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
        </div>
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

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <TicketDetailsModal
          projectId={selectedTicket.id} // Pass the project ID
          onClose={() => setSelectedTicket(null)}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { TicketDetailsModal } from './TicketDetailsModal';
import { AddInternalTaskModal } from './AddInternalTaskModal';
import { ContractorTask, Column, InternalTask, Ticket } from './types';

interface ProjectKanbanProps {}

export const EstimatorKanban: React.FC<ProjectKanbanProps> = () => {
  // Hardcoded initial data for "In Progress" and "Completed" columns
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'assigned',
      title: 'Assigned',
      tickets: [], // Initially empty, will be populated with fetched projects
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tickets: [
        {
          id: '2',
          type: 'contractor',
          title: 'Task 2',
          description: 'This is a contractor task.',
          contractorId: 'contractor-1',
          taskType: 'quote_verification',
          comments: [],
          createdAt: '2023-10-02',
        },
      ],
    },
    {
      id: 'completed',
      title: 'Completed',
      tickets: [
        {
          id: '3',
          type: 'internal',
          title: 'Task 3',
          description: 'This is a completed task.',
          comments: [],
          createdAt: '2023-10-03',
        },
      ],
    },
  ]);

  const [isAddingInternalTask, setIsAddingInternalTask] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Fetch projects for the "Assigned" column
  useEffect(() => {
    const fetchAssignedProjects = async () => {
      // Simulate fetching projects from an API
      const projects = [
        {
          id: '1',
          name: 'Project Alpha',
          status: 'awaiting_takeoff',
          contractor: { name: 'Contractor A' },
          scope: 'Residential Building',
        },
        {
          id: '2',
          name: 'Project Beta',
          status: 'awaiting_takeoff',
          contractor: { name: 'Contractor B' },
          scope: 'Commercial Complex',
        },
      ];

      // Map projects to tickets for the "Assigned" column
      const assignedTickets = projects.map((project) => ({
        id: project.id,
        type: 'project',
        title: project.name,
        description: `${project.contractor.name} | ${project.scope}`,
        comments: [],
        createdAt: new Date().toISOString(),
      }));

      setColumns((prev) =>
        prev.map((col:any) =>
          col.id === 'assigned' ? { ...col, tickets: assignedTickets } : col
        )
      );
    };

    fetchAssignedProjects();
  }, []);

  // Add a new internal task
  const handleAddInternalTask = (task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>) => {
    const newTask: InternalTask = {
      ...task,
      id: String(columns[0].tickets.length + 1), // Generate a unique ID
      comments: [],
      createdAt: new Date().toISOString(),
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === 'assigned'
          ? { ...col, tickets: [...col.tickets, newTask] }
          : col
      )
    );
    setIsAddingInternalTask(false);
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, ticketId: string, sourceColumnId: string) => {
    e.dataTransfer.setData('ticketId', ticketId);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow dropping
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();

    const ticketId = e.dataTransfer.getData('ticketId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

    if (sourceColumnId === targetColumnId) return; // No change if dropped in the same column

    // Find the ticket being moved
    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    const ticket = sourceColumn?.tickets.find((t) => t.id === ticketId);

    if (!ticket) return;

    // Update columns state
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceColumnId) {
          // Remove the ticket from the source column
          return { ...col, tickets: col.tickets.filter((t) => t.id !== ticketId) };
        }
        if (col.id === targetColumnId) {
          // Add the ticket to the target column
          return { ...col, tickets: [...col.tickets, ticket] };
        }
        return col;
      })
    );
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
      prev.map((col) => ({
        ...col,
        tickets: col.tickets.map((ticket) =>
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

      {/* Modals */}
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
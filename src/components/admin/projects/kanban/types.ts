export interface Contractor {
    id: string;
    name: string;
    projects: Project[];
  }
  
  export interface Project {
    id: string;
    name: string;
  }
  
  export interface ContractorTask {
    id: string;
    type: 'client';
    title: string;
    description: string;
    contractor: string; // Updated to match backend
    project: string;    // Updated to match backend
    taskType: 'quote_verification' | 'price_negotiation' | 'required_documentation';
    comments: Comment[];
    createdAt: string;
  }
  
  export interface InternalTask {
    id: string;
    type: 'internal';
    title: string;
    description: string;
    comments: Comment[];
    createdAt: string;
  }
  
  export type Ticket = ContractorTask | InternalTask;
  
  export interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    tickets: Ticket[];
  }
  
  export interface AddClientTaskModalProps {
    onClose: () => void;
    onAdd: (task: Omit<ContractorTask, 'id' | 'comments' | 'createdAt'>) => void;
  }
  
  export interface AddInternalTaskModalProps {
    onClose: () => void;
    onAdd: (task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>) => void;
  }
  
  export interface TicketCardProps {
    ticket: Ticket;
    onClick: () => void;
  }
  
  export interface KanbanColumnProps {
    column: Column;
    onTicketClick: (ticket: Ticket) => void;
    onDrop: (e: React.DragEvent, columnId: string) => void;
  }
  
  export interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (content: string) => void;
  }
  
  export interface TicketDetailsModalProps {
    ticket: Ticket;
    onClose: () => void;
    onAddComment: (content: string) => void;
  }
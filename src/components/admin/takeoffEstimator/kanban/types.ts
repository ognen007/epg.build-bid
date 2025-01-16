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
    type: 'contractor';
    title: string;
    description: string;
    contractorId : string;
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

export interface Ticket {
  title: string;
  type: string;
  project: string;
  taskType: any;
  id: string;
  name: string; // Add this
  contractor: string; // Add this
  scope: string; // Add this
  status?: string; // Optional, depending on your data
  hold?: string; // Optional, depending on your data
  description?: string; // Optional
  comments?: any[]; // Optional
  createdAt?: string; // Optional
}
  
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
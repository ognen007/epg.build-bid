import axios from 'axios';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

interface Contractor {
  id: string;
  name: string;
  projects: Project[];
}

interface Project {
  id: string;
  name: string;
}

interface ClientTask {
  id: string;
  type: 'client';
  title: string;
  description: string;
  contractor: string;
  project: string;
  taskType: 'quote_verification' | 'price_negotiation' | 'required_documentation';
  comments: Comment[];
  createdAt: string;
}

interface InternalTask {
  id: string;
  type: 'internal';
  title: string;
  description: string;
  comments: Comment[];
  createdAt: string;
}

type Ticket = ClientTask | InternalTask;

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Column {
  id: string;
  title: string;
  tickets: Ticket[];
}

export async function fetchColumns(): Promise<Column[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/columns`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch columns:', error);
    throw error;
  }
}

export async function createColumn(title: string): Promise<Column> {
  try {
    const response = await axios.post(`${API_BASE_URL}/columns`, { title });
    return response.data;
  } catch (error) {
    console.error('Failed to create column:', error);
    throw error;
  }
}

export async function createClientTask(task: Omit<ClientTask, 'id' | 'comments' | 'createdAt'>, columnId: string): Promise<Ticket> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets`, {
      type: 'client',
      title: task.title,
      description: task.description,
      columnId,
      contractor: task.contractor,
      project: task.project,
      taskType: task.taskType,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create client task:', error);
    throw error;
  }
}

export async function createInternalTask(task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>, columnId: string): Promise<Ticket> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets`, {
      type: 'internal',
      title: task.title,
      description: task.description,
      columnId,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create internal task:', error);
    throw error;
  }
}

export async function updateTicketColumn(ticketId: string, columnId: string): Promise<void> {
  try {
    await axios.put(`${API_BASE_URL}/tickets/${ticketId}/column`, { columnId });
  } catch (error) {
    console.error('Failed to update ticket column:', error);
    throw error;
  }
}

export async function addCommentToTicket(ticketId: string, content: string, author: string): Promise<Comment> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
      content,
      author,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add comment:', error);
    throw error;
  }
}

export async function fetchContractors(): Promise<Contractor[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractors/name`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contractors:", error);
    throw error;
  }
}

export async function fetchProjects(contractorId: string): Promise<Project[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractors/${contractorId}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
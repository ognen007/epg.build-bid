import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description: string;
  taskType: 'quote_verification' | 'price_negotiation' | 'required_documentation';
  status: 'todo' | 'done';
  project: string | null;
  deadline?: string;
  comments?: Comment[];
  stand?: string;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchTasks(contractorId: string): Promise<Task[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets/${contractorId}`);
    const data = response.data;

    const transformedTasks = data.map((ticket: any) => ({ // Type 'any' should be replaced with the actual type from the backend
      id: ticket.id,
      title: ticket.title,
      taskType: ticket.taskType,
      status: ticket.stand === 'done' ? 'done' : 'todo',
      project: ticket.project,
      deadline: ticket.deadline,
      comments: ticket.comments || [],
      stand: ticket.stand || '',
    }));
    return transformedTasks;
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    throw new Error('Failed to fetch tickets'); // Re-throw the error
  }
}

export async function addComment(ticketId: string, content: string, author: string): Promise<Comment> {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments`, {
      content,
      author,
      ticketId,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Error adding comment'); // Re-throw the error
  }
}

export async function updateTaskStatus(taskId: string, status: 'todo' | 'done'): Promise<any> { // Type 'any' should be replaced with the actual type from the backend
  try {
    const response = await axios.put(`${API_BASE_URL}/tickets/${taskId}`, {
      status,
      stand: status === 'done' ? 'done' : '',
    });
    return response.data;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw new Error('Error updating ticket'); // Re-throw the error
  }
}

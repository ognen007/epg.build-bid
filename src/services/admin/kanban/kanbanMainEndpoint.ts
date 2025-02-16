import axios from 'axios';
import { ContractorTask, Column, InternalTask, Ticket } from '../../../components/admin/projects/kanban/types';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchColumns(contractorId: string): Promise<Column[]> {
  try {
    const response = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/columns/</span>{contractorId}`);
    return response.data || []; // Handle potential null response
  } catch (error) {
    console.error('Error fetching columns:', error);
    throw error; // Re-throw for component handling
  }
}

export async function createColumn(title: string, contractorId: string): Promise<Column> {
  try {
    const response = await axios.post(`${API_BASE_URL}/columns`, { title, contractorId });
    return response.data;
  } catch (error) {
    console.error('Error creating column:', error);
    throw error;
  }
}

export async function createContractorTask(task: Omit<ContractorTask, 'id' | 'comments' | 'createdAt'>, columnId: string): Promise<Ticket> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets`, {
      ...task,
      type: 'contractor',
      columnId,
      contractor: task.contractorId, // Assuming task.contractorId holds the contractor ID
    });
    return response.data;
  } catch (error) {
    console.error('Error creating contractor task:', error);
    throw error;
  }
}

export async function createInternalTask(task: Omit<InternalTask, 'id' | 'comments' | 'createdAt'>, columnId: string, contractorId: string): Promise<Ticket> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets`, {
      ...task,
      type: 'internal',
      columnId,
      contractorId, // Include contractorId for internal tasks as well (if needed)
    });
    return response.data;
  } catch (error) {
    console.error('Error creating internal task:', error);
    throw error;
  }
}

export async function updateTicketColumn(ticketId: string, columnId: string): Promise<void> {
  try {
    await axios.put(`<span class="math-inline">\{API\_BASE\_URL\}/tickets/</span>{ticketId}/column`, { columnId });
  } catch (error) {
    console.error('Error updating ticket column:', error);
    throw error;
  }
}

export async function addComment(content: string, author: string, ticketId: string): Promise<Comment> {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments`, { content, author, ticketId });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}
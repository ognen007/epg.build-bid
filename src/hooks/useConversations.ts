import { useState, useEffect } from 'react';
import { Conversation } from '../types/message';

// Sample data - replace with actual API calls
const sampleConversations: Conversation[] = [
  {
    id: '1',
    contractor: {
      id: '1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      expertise: ['Electrical', 'HVAC'],
    },
    messages: [
      {
        id: '1',
        content: 'Hi, I saw your project posting. When would you like to discuss the details?',
        timestamp: new Date(Date.now() - 3600000),
        senderId: 'contractor1',
      }
    ],
    lastMessage: {
      id: '1',
      content: 'Hi, I saw your project posting. When would you like to discuss the details?',
      timestamp: new Date(Date.now() - 3600000),
      senderId: 'contractor1',
    },
    unreadCount: 2,
  },
  // Add more sample conversations as needed
];

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);

  // Add real-time updates logic here if needed

  return { conversations, setConversations };
}
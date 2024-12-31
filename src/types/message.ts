export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  attachments?: {
    url: string;
    type: 'image' | 'file';
    name: string;
  }[];
}

export interface Conversation {
  id: string;
  contractor: {
    id: string;
    name: string;
    avatar: string;
    expertise: string[];
  };
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}
import React, { useRef, useEffect } from 'react';
import { Phone, UserCircle, Paperclip, Send } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Conversation } from '../../types/message';

interface ChatWindowProps {
  conversation: Conversation;
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={conversation.contractor.avatar}
            alt={conversation.contractor.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <h2 className="text-lg font-medium text-gray-900 truncate">
              {conversation.contractor.name}
            </h2>
            <span className="text-sm text-gray-500 block truncate">
              {conversation.contractor.expertise.join(', ')}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <Phone className="h-5 w-5" />
          </button>
          <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <UserCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === 'user'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput conversationId={conversation.id} />
    </div>
  );
}
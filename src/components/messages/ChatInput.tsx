import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

interface ChatInputProps {
  conversationId: string;
}

export function ChatInput({ conversationId }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Handle message sending here
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="hidden sm:block p-2 text-gray-500 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 text-white bg-orange-500 rounded-full hover:bg-orange-600"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
import React from 'react';
import { formatTime } from '../../utils/dateUtils';
import { Message } from '../../types/message';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[85%] sm:max-w-[70%] 
          rounded-lg px-4 py-2 
          ${isOwn
            ? 'bg-orange-500 text-white'
            : 'bg-gray-100 text-gray-900'
          }
        `}
      >
        <p className="text-sm break-words">{message.content}</p>
        <span className={`text-xs ${isOwn ? 'text-orange-100' : 'text-gray-500'}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
import React from 'react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Conversation } from '../../types/message';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  const { contractor, lastMessage, unreadCount } = conversation;

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 ${
        isSelected ? 'bg-orange-50' : ''
      }`}
    >
      <img
        src={contractor.avatar}
        alt={contractor.name}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {contractor.name}
          </h3>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(lastMessage.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage.content}</p>
      </div>
      {unreadCount > 0 && (
        <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-orange-500 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
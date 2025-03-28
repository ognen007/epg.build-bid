import React, { useState } from 'react';
import { MessagesList } from '../components/messages/MessagesList';
import { ChatWindow } from '../components/messages/ChatWindow';
import { Conversation } from '../types/message';
import { ArrowLeft } from 'lucide-react';

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showMobileList, setShowMobileList] = useState(true);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowMobileList(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Messages List - Hidden on mobile when chat is open */}
      <div className={`
        ${showMobileList ? 'flex' : 'hidden'}
        md:flex
        w-full md:w-96 border-r border-gray-200
      `}>
        <MessagesList
          onSelectConversation={handleSelectConversation}
          selectedId={selectedConversation?.id}
        />
      </div>

      {/* Chat Window - Full width on mobile when open */}
      <div className={`
        ${!showMobileList ? 'flex' : 'hidden'}
        md:flex
        flex-1 flex-col
      `}>
        {selectedConversation ? (
          <>
            {/* Mobile back button */}
            <button
              onClick={() => setShowMobileList(true)}
              className="md:hidden p-4 flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Messages
            </button>
            <ChatWindow conversation={selectedConversation} />
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
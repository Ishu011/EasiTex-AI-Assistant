import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-sm ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
        }`}>
          {isBot ? <Bot size={16} /> : <User size={16} />}
        </div>
        <div className={`rounded-lg p-3 ${
          isBot 
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          <p className={`text-xs mt-1 ${
            isBot ? 'text-gray-500 dark:text-gray-400' : 'text-yellow-100'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
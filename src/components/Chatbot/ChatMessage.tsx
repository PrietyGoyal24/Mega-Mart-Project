import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface ChatMessageProps {
  message: Message;
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-primary/10' : 'bg-secondary'
      }`}>
        {isBot ? (
          <Bot className="h-4 w-4 text-primary" />
        ) : (
          <User className="h-4 w-4 text-secondary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-xs ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div className={`px-3 py-2 rounded-lg text-sm ${
          isBot
            ? 'bg-muted text-muted-foreground'
            : 'bg-primary text-primary-foreground'
        }`}>
          {message.text}
        </div>

        {/* Suggestions */}
        {isBot && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionClick?.(suggestion)}
                className="text-xs h-auto py-1 px-2 w-full justify-start"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className={`text-xs text-muted-foreground mt-1 ${
          isBot ? 'text-left' : 'text-right'
        }`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
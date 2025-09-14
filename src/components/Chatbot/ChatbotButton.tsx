import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ isOpen, onClick, hasUnread }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </motion.div>
      
      {hasUnread && !isOpen && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-white text-xs font-bold">!</span>
        </motion.div>
      )}
      
      {/* Pulse animation */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      )}
    </motion.button>
  );
};

export default ChatbotButton;
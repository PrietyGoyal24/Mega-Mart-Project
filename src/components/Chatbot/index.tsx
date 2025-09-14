import React, { useState } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatWindow from './ChatWindow';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatbotButton isOpen={isOpen} onClick={toggleChat} />
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Chatbot;
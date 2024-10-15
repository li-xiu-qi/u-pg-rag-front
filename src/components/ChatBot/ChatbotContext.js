import React, { createContext, useContext } from 'react';
import useChatbot from '../../hooks/useChatbot';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children, userProfile }) => {
    const chatbot = useChatbot(userProfile);
    return (
        <ChatbotContext.Provider value={chatbot}>
            {children}
        </ChatbotContext.Provider>
    );
};

export const useChatbotContext = () => useContext(ChatbotContext);
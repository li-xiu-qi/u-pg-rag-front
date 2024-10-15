import React, { useState } from 'react';
import LeftSidebarButtons from './LeftSidebarButtons';
import LeftChatHistory from './LeftChatHistory';
import MiddleContainer from './MiddleContainer';
import RightSidebar from './RightSidebar';
import { ChatbotProvider } from './ChatbotContext';
import '../../styles/chat-bot/chat-bot.css';

const Chatbot = ({ userProfile }) => {
    const [isChatHistoryVisible, setIsChatHistoryVisible] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleChatHistory = () => {
        setIsChatHistoryVisible(!isChatHistoryVisible);
    };

    const handleCollapseToggle = () => { 
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="app-container">
            <LeftSidebarButtons 
                isCollapsed={isCollapsed} 
                handleCollapseToggle={handleCollapseToggle} 
                toggleChatHistory={toggleChatHistory} 
            />

            <ChatbotProvider userProfile={userProfile}>
                {isChatHistoryVisible && (
                    <LeftChatHistory 
                        toggleChatHistory={toggleChatHistory} 
                    />
                )}
                <MiddleContainer />
                <RightSidebar />
            </ChatbotProvider>
        </div>
    );
};

export default Chatbot;
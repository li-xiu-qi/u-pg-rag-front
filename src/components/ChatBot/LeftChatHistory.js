import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/chat-bot/left-chat-history.css';
import { useChatbotContext } from './ChatbotContext';

const LeftChatHistory = ({ toggleChatHistory }) => {
    const { chatHistory, fetchChatData } = useChatbotContext();
    const [defaultChatHistory, setDefaultChatHistory] = useState([]);

    useEffect(() => {
        const defaultData = [
            { session_id: '1', title: '你好呀' },
            { session_id: '2', title: 'GPA计算公式是什么' },
            { session_id: '3', title: '国家奖学金评选条件是什么' },
        ];
        setDefaultChatHistory(defaultData);
    }, []);

    const historyToDisplay = chatHistory.length > 0 ? chatHistory : defaultChatHistory;

    return (
        <div className="left-sidebar-chat-history-container">
            <button className="left-sidebar-close-chat-history-button" onClick={toggleChatHistory}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="left-sidebar-chat-history-list">
                {historyToDisplay.map((record, index) => (
                    <div key={index} className="left-sidebar-chat-history-item">
                        <button className="left-sidebar-chat-record" onClick={() => fetchChatData(record.session_id)}>
                            {record.title}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftChatHistory;
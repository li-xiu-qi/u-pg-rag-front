import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * @typedef {Object} Message
 * @property {string} role - The role of the message sender (e.g., 'user', 'assistant').
 * @property {string} content - The content of the message.
 * @property {string} avatar - The URL of the avatar image.
 * @property {number} round - The round number of the message.
 * @property {string} sessionId - The session ID.
 */

/**
 * @typedef {Object} RightSidebarData
 * @property {number} round - The round number.
 * @property {string} type - The type of data.
 * @property {any} [type] - The result data.
 */

const useChatbot = (userProfile) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [round, setRound] = useState(1);
    const [rightSidebarData, setRightSidebarData] = useState([]);
    const [warning, setWarning] = useState('');
    const [isOutputting, setIsOutputting] = useState(false);
    const MAX_LENGTH = 4000;
    const [activateRound, setActivateRound] = useState(1);
    const [sessionId, setSessionId] = useState('');
    const [title, setTitle] = useState('');
    let [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const backendUrl = 'http://127.0.0.1:8000';

    useEffect(() => {
        setSessionId(uuidv4());
        fetchChatHistory();
    }, []);

    const fetchChatHistory = async () => {
        try {
            const response = await fetch(`${backendUrl}/get_chat_history?limit=20`);
            if (!response.ok) throw new Error('Failed to fetch chat history');
            const data = await response.json();
            setChatHistory(data);
            console.log('Chat History:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const initializeNewChat = () => {
        setMessages([]);
        setInputValue('');
        setRound(1);
        setRightSidebarData([]);
        setWarning('');
        setIsOutputting(true);
        setActivateRound(1);
        setSessionId(uuidv4());
        setCurrentAssistantMessage('');
        setTitle('');
    };

    const updateRightSidebarData = (type, result) => {
        if (!result) return;
        setRightSidebarData(prevData => [...prevData, { round, type, [type]: result }]);
    };

    const dataTypeHandlers = {
        'assistant': (jsonData) => {
            setCurrentAssistantMessage(prev => prev + jsonData.result);
            const answerMessage = {
                role: 'assistant',
                content: currentAssistantMessage += jsonData.result,
                avatar: '/assistant-avatar-url.png',
                round,
                sessionId
            };
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                if (lastMessage && lastMessage.role === 'assistant' && lastMessage.round === round) {
                    lastMessage.content = answerMessage.content;
                } else {
                    updatedMessages.push(answerMessage);
                }
                return updatedMessages;
            });
            setIsOutputting(false);
        },
        'link_resource': (jsonData) => updateRightSidebarData('link_resource', jsonData.result),
        'retrieval': (jsonData) => updateRightSidebarData('retrieval', jsonData.result),
        'web_search': (jsonData) => updateRightSidebarData("web_search", jsonData.result),
    };

    const fetchData = async (data) => {
        try {
            const response = await fetch(`${backendUrl}/rag_chat/stream-chat-web_search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                },
                body: JSON.stringify(data)
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                for (let line of lines) {
                    if (line.startsWith('data: ')) {
                        line = line.slice(5).trim();
                        if (line) {
                            try {
                                const jsonData = JSON.parse(line);
                                const handler = dataTypeHandlers[jsonData.data_type];
                                if (handler) {
                                    handler(jsonData);
                                } else {
                                    console.warn('Unknown data type:', jsonData.data_type);
                                }
                                buffer = '';
                            } catch (e) {
                                continue;
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sendChatDataToBackend = async () => {
        try {
            const response = await fetch(`${backendUrl}/save_chat_data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: userProfile.userId, session_id: sessionId, title, messages, rightSidebarData })
            });

            if (!response.ok) throw new Error('Failed to send chat data to backend');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchChatData = async (sessionId) => {
        try {
            const response = await fetch(`${backendUrl}/get_chat_data?session_id=${sessionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to fetch chat data from backend');

            const data = await response.json();
            setTitle(data.title);
            setMessages(data.messages);
            setRightSidebarData(data.rightSidebarData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSendMessage = async () => {
        if (inputValue.length > MAX_LENGTH) {
            setWarning('输入内容不能超过4000字，请精简输入内容。');
            return;
        }

        if (inputValue.trim()) {
            if (round === 1) setTitle(inputValue.slice(0, 10));

            setActivateRound(round);
            const userMessage = {
                role: 'user',
                content: inputValue,
                avatar: '/user-avatar-url.jpg',
                round,
                sessionId
            };
            const placeholderMessage = {
                role: 'assistant',
                content: '获取数据中……',
                avatar: '/assistant-avatar-url.png',
                round,
                sessionId
            };
            setMessages(prevMessages => [...prevMessages, userMessage, placeholderMessage]);
            setInputValue('');
            setIsOutputting(true);

            const data = {
                query: inputValue,
                limit: 30,
                use_vector_search: true,
                use_keyword_search: true,
                rerank: true,
                keyword_weight: 7,
                vector_weight: 3,
                recursive_query: false,
                paragraph_number_ranking: true,
                filter_count: 5,
                sessionId
            };

            await fetchData(data);

            setRound(prevRound => prevRound + 1);
            setCurrentAssistantMessage('');

            await sendChatDataToBackend();
        }
    };

    return {
        messages,
        setMessages,
        inputValue,
        setInputValue,
        handleSendMessage,
        rightSidebarData,
        setRightSidebarData,
        warning,
        setWarning,
        activateRound,
        setActivateRound,
        sessionId,
        setIsOutputting,
        isOutputting,
        initializeNewChat,
        fetchChatData,
        title, 
        setTitle, 
        chatHistory
    };
};

export default useChatbot;
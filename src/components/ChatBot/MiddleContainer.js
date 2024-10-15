import React, {useRef, useEffect, useState} from 'react';
import '../../styles/chat-bot/middle-container.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import MiddleDisplayMessage from "./MiddleDisplayMessage";
import {useChatbotContext} from './ChatbotContext';
import ModeToggle from './ModeToggle';

const MiddleContainer = () => {
    const {
        messages,
        inputValue,
        setInputValue,
        handleSendMessage,
        warning,
        setWarning,
        rightSidebarData,
        initializeNewChat,
        isOutputting
    } = useChatbotContext();
    const textareaRef = useRef(null);
    const [mode, setMode] = useState('web_search');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleNewChat = () => {
        initializeNewChat();
    };

    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => setWarning(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [warning, setWarning]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [inputValue]);

    const webSearchData = rightSidebarData.filter(data => data.type === "web_search");

    return (
        <div className="middle-container">
            <div className="middle-container-title">机器人聊天</div>
            <div className="middle-container-chat-record-container">
                {
                    messages.map((message, index) => (
                        <MiddleDisplayMessage key={index} message={message} currentRoundWebSearchData={webSearchData}/>
                    ))
                }
            </div>
            <div className="middle-container-input-container">
                <button className="middle-container-new-chat-button" onClick={handleNewChat}>新建对话</button>
                <div className="middle-container-input-wrap">
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="你想知道些什么呢？"
                        className="middle-container-text-editor"
                        style={{overflowY: 'auto', maxHeight: '150px'}}
                    />
                    <div className="middle-container-buttons">
                        <div className="middle-container-enter">
                            <button
                                className={`middle-container-send-button ${isOutputting || !inputValue ? 'disabled' : ''}`}
                                onClick={handleSendMessage}
                                disabled={isOutputting || !inputValue}
                            >
                                <FontAwesomeIcon icon={faPaperPlane}/>
                            </button>
                        </div>
                        <ModeToggle mode={mode} setMode={setMode} />
                    </div>
                </div>
                {warning && <div className="middle-container-warning">{warning}</div>}
            </div>
            <div className="middle-container-footer-text">
                <span>以上内容均由AI生成, 仅供参考和借鉴</span>
            </div>
        </div>
    );
};

export default MiddleContainer;
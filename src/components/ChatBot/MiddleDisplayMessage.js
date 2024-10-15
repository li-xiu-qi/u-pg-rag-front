import React, {useEffect, useRef} from 'react';
import '../../styles/chat-bot/middle-display-message.css';

import MiddleWebSearchData from './MiddleWebSearchData';
import ReactMarkdown from 'react-markdown';

function UserMessage({message}) {
    return (
        <div className="user-message">
            <p>{message.content}</p>
        </div>
    );
}


function AssistantMessage({message, currentRoundWebSearchData}) {

    return (
        <div className="assistant-message">
            {currentRoundWebSearchData.length > 0 && (
                <MiddleWebSearchData currentRoundWebSearchData={currentRoundWebSearchData.filter(
                    (data) => data.round === message.round
                )}/>
            )}
            <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
    );
}

function MiddleDisplayMessage({message, currentRoundWebSearchData}) {
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [message]);

    return (
        <div className="middle-display-message">
            <img src={message.avatar} alt="avatar" className="avatar"/>
            <div className="middle-message-content">
                {message.role === 'assistant' ? (
                    <AssistantMessage message={message} currentRoundWebSearchData={currentRoundWebSearchData}/>
                ) : (
                    <UserMessage message={message}/>
                )}
                <div ref={messageEndRef}/>
            </div>
        </div>
    );
}

export default MiddleDisplayMessage;
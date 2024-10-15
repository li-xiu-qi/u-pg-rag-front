import React from 'react';
import '../../styles/chat-bot/mode-toggle.css';

const ModeToggle = ({ mode, setMode }) => {
    const handleToggle = () => {
        setMode(mode === 'web_search' ? 'database_search' : 'web_search');
    };

    return (
        <div className="mode-toggle" onClick={handleToggle} title={`当前模式: ${mode === 'web_search' ? '网络检索' : '数据库检索'}`}>
            <div className={`mode-toggle-circle ${mode}`}></div>
        </div>
    );
};

export default ModeToggle;
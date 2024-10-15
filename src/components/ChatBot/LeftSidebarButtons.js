import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faChevronRight, faChevronLeft, faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate
import '../../styles/chat-bot/left-sidebar-buttons.css';
const LeftSidebarButtons = ({ isCollapsed, handleCollapseToggle, toggleChatHistory }) => {
    const navigate = useNavigate(); 
    const handleProfileClick = () => {
        navigate('/profile'); 
    };

    return (
        <div className={`left-sidebar-button-container ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="left-sidebar-circle-button" onClick={toggleChatHistory}>
                <FontAwesomeIcon icon={faClock}/>
                {!isCollapsed && <span>History</span>}
            </button>
         
            <button className="left-sidebar-circle-button" onClick={handleProfileClick}> 
                <FontAwesomeIcon icon={faUser}/>
                {!isCollapsed && <span>Profile</span>}
            </button>
            <button className="left-sidebar-circle-button">
                <FontAwesomeIcon icon={faSearch}/>
                {!isCollapsed && <span>Explore</span>}
            </button>
            <button className="left-sidebar-collapse-button" onClick={handleCollapseToggle}>
                <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft}/>
            </button>
        </div>
    );
};

export default LeftSidebarButtons;
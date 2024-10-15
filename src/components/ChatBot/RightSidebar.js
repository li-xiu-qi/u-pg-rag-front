import React, {useState} from 'react';
import {faGlobe, faFile, faBook} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useChatbotContext} from './ChatbotContext';
import RightWebSearchData from './RightWebSearchData';
import RightImageResource from './RightImageResource';
import RightFileResource from './RightFileResource';
import '../../styles/chat-bot/right-sidebar.css';

const RightSidebar = () => {
    const [isOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const {activateRound, rightSidebarData} = useChatbotContext();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isOpen);
    };

    const filterRightSidebarData = rightSidebarData.filter(data => data.round === activateRound);
    const webSearchData = filterRightSidebarData.filter(data => data.type === 'web_search');


    const groupedLinkResource = webSearchData.reduce((acc, resource) => {
        const url = resource.url;
        if (!acc[url]) {
            acc[url] = [];
        }
        acc[url].push(resource);
        return acc;
    }, {});

    const tabs = [
        {
            label: '网络检索引用内容',
            icon: faGlobe,
            content: webSearchData.map((resource, index) => (
                <RightWebSearchData key={index} resource={resource}/>
            ))
        },
        {
            label: '网页资源',
            icon: faBook,
            content: <RightImageResource groupedLinkResource={groupedLinkResource}/>
        },
        {
            label: '文件资源',
            icon: faFile,
            content: <RightFileResource groupedLinkResource={groupedLinkResource}/>
        }
    ];

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (
        <div className={`right-sidebar ${isOpen ? 'right-sidebar-open' : 'right-sidebar-closed'}`}>
            <div className="right-sidebar-header">
                <button onClick={toggleSidebar}>
                    <span role="img" aria-label="book">📖</span>
                </button>
            </div>
            <div className={`right-sidebar-content ${isOpen ? '' : 'right-sidebar-transparent'}`}>
                <div className="right-sidebar-icons">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`right-sidebar-icon ${activeTab === index ? 'right-sidebar-icon-active' : ''}`}
                            onClick={() => handleTabChange(index)}
                            title={tab.label}
                        >
                            <FontAwesomeIcon icon={tab.icon} title={tab.label}/>
                        </div>
                    ))}
                </div>
                <div className="right-sidebar-tab-content">
                    {tabs[activeTab].content}
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
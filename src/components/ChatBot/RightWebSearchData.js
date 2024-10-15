import React from 'react';
import '../../styles/chat-bot/right-web-search-data.css';

const RightWebSearchData = ({resource}) => {
    return (
        <div className="web-search-data-item">
            <img src={resource.web_search.favicon} alt="favicon" className="web-search-data-favicon"/>
            <div className="web-search-data-title">{resource.web_search.title}</div>
            <div className="web-search-data-date">{resource.web_search.publish_date}</div>
            <div className="web-search-data-body">{resource.web_search.description}</div>
            <a href={resource.web_search.url} target="_blank" rel="noopener noreferrer"
               className="web-search-data-button">
                查看详情
            </a>
        </div>
    );
};

export default RightWebSearchData;

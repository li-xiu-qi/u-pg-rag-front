import React, {useState} from 'react';
import '../../styles/chat-bot/middle-webSearchData.css';

import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {useChatbotContext} from "./ChatbotContext";

function MiddleWebSearchData({currentRoundWebSearchData}) {
    const [expanded, setExpanded] = useState(false);
    const {setActivateRound} = useChatbotContext();

    const toggleExpanded = () => {
        setExpanded(!expanded);
        if (currentRoundWebSearchData && currentRoundWebSearchData.length > 0) {
            setActivateRound(currentRoundWebSearchData[0].round);
        }
    };

    const lis = currentRoundWebSearchData.map((data, index) => {
        const webSearch = data.web_search;
        return (
            <li key={index} className="web-search-item">
                <img src={webSearch.favicon} alt={webSearch.title}/>
                <a href={webSearch.url} target="_blank" rel="noreferrer">{webSearch.title}</a>[{webSearch.publish_date}]
            </li>
        );
    });

    return (
        <div className={`web-search-data ${expanded ? 'expanded' : ''}`}>
            <div className="web-search-data-header" onClick={toggleExpanded}>
                <h3>网络搜索结果</h3>
                <button>
                    {expanded ? <FaChevronUp/> : <FaChevronDown/>}
                </button>
            </div>
            {expanded && <ul>{lis}</ul>}
        </div>
    );
}

export default MiddleWebSearchData;
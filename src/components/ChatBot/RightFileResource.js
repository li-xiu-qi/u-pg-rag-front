import React from 'react';
import '../../styles/chat-bot/right-sidebar-file.css';

const RightFileResource = ({groupedLinkResource}) => {
    return (
        <div></div>
        // <div>
        //     {Object.keys(groupedLinkResource).map((url, index) => (
        //         <div key={index} className="right-sidebar-file">
        //             <h3>{url}</h3>
        //             {groupedLinkResource[url].map((resource, resIndex) => (
        //                 <div key={resIndex}>
        //                     {resource.web_search.url_resource.image_urls.map((link, linkIndex) => (
        //                         <div key={linkIndex}>
        //                             <a href={link.url} target="_blank" rel="noopener noreferrer">
        //                                 {link.title || link.url}
        //                             </a>
        //                         </div>
        //                     ))}
        //                 </div>
        //             ))}
        //         </div>
        //     ))}
        // </div>
    );
};

export default RightFileResource;
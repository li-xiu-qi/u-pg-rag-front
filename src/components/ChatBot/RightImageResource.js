import React, { useState, useEffect } from 'react';
import '../../styles/chat-bot/right-image-resource-group.css';

const isImage = (url) => /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url) && !url.includes('favicon');

const RightImageResource = ({ groupedLinkResource }) => {
    const [filteredImages, setFilteredImages] = useState({});

    useEffect(() => {
        const filterImages = async () => {
            const newFilteredImages = {};
            const processedUrls = new Set();

            for (const url of Object.keys(groupedLinkResource)) {
                const highQualityImages = [];
                for (const resource of groupedLinkResource[url]) {
                    for (const link of resource.web_search.url_resource.image_urls) {
                        if (isImage(link.url) && !processedUrls.has(link.url)) {
                            processedUrls.add(link.url);
                            highQualityImages.push(link);
                        }
                    }
                }
                newFilteredImages[url] = highQualityImages;
            }
            setFilteredImages(newFilteredImages);
        };

        filterImages();
    }, [groupedLinkResource]);

    const handleImageLoad = (event) => {
        const img = event.target;
        console.log(`Image loaded: ${img.src}, natural size: ${img.naturalWidth}x${img.naturalHeight}`);
        if (img.naturalWidth < 100 || img.naturalHeight < 150) {
            console.log(`Image filtered out: ${img.src}`);
            img.classList.add('right-sidebar-image-hidden');
        }
    };

    return (
        <>
            {Object.keys(filteredImages).map((url, index) => (
                <div key={`${url}-${index}`} className="link-resource-group">
                    <div className="right-sidebar-image-flex-container">
                        {filteredImages[url].map((link, linkIndex) => (
                            <div key={`${link.url}-${linkIndex}`} className="right-sidebar-image-display">
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <img src={link.url} alt={link.title || link.url}
                                         className="right-sidebar-image-display-img" loading="lazy"
                                         onLoad={handleImageLoad} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default RightImageResource;
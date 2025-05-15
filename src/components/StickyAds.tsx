import React, { useState } from 'react';
import styles from './StickyAds.module.css';

const StickyAds: React.FC = () => {
    const [showLeftAd, setShowLeftAd] = useState(true);
    const [showRightAd, setShowRightAd] = useState(true);

    const handleLeftAdClose = () => {
        setShowLeftAd(false);
    };

    const handleRightAdClose = () => {
        setShowRightAd(false);
    };

    const handleAdClick = (side: string) => {
        window.open('https://example.com', '_blank');
    };

    return (
        <div className={styles.stickyAdsContainer}>
            {showLeftAd && (
                <div className={`${styles.stickyAd} ${styles.leftAd}`}>
                    <div className={styles.adCloseButton} onClick={handleLeftAdClose}>
                        &times;
                    </div>
                    <div className={styles.adContent} onClick={() => handleAdClick('left')}>
                        <img src="https://via.placeholder.com/160x600?text=Advertisement" alt="Left Advertisement" />
                    </div>
                </div>
            )}

            {showRightAd && (
                <div className={`${styles.stickyAd} ${styles.rightAd}`}>
                    <div className={styles.adCloseButton} onClick={handleRightAdClose}>
                        &times;
                    </div>
                    <div className={styles.adContent} onClick={() => handleAdClick('right')}>
                        <img src="https://via.placeholder.com/160x600?text=Advertisement" alt="Right Advertisement" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StickyAds;
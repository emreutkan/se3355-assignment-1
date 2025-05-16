import React, { useState, useEffect } from 'react';
import styles from './StickyAds.module.css';

interface StickyAdsProps {
    position?: 'left' | 'right';
}

const StickyAds: React.FC<StickyAdsProps> = ({ position }) => {
    const [showLeftAd, setShowLeftAd] = useState(true);
    const [showRightAd, setShowRightAd] = useState(true);
    const [adPrices, setAdPrices] = useState<number[]>([]);

    const adLinks = [
        "https://www.lacoste.com.tr/urun/erkek-siyah-ayakkabi-742sma0048t-012/",
        "https://www.lacoste.com.tr/urun/kadin-beyaz-ayakkabi-749sfa0025-004-2/",
        "https://www.lacoste.com.tr/urun/erkek-siyah-ayakkabi-749sma0108-012-2/",
        "https://www.lacoste.com.tr/urun/erkek-gri-ayakkabi-749sma0002-005-2/",
        "https://www.lacoste.com.tr/urun/erkek-siyah-ayakkabi-749sma0043-012-1/",
        "https://www.lacoste.com.tr/urun/kadin-krem-ayakkabi-749sfa0007-033/"
    ];

    useEffect(() => {
        const prices = Array.from({ length: 6 }, () =>
            Math.floor(Math.random() * (6000 - 4000 + 1) + 4000)
        );
        setAdPrices(prices);
    }, []);

    const handleLeftAdClose = () => {
        setShowLeftAd(false);
    };

    const handleRightAdClose = () => {
        setShowRightAd(false);
    };

    const handleAdClick = (index: number) => {
        window.open(adLinks[index], '_blank');
    };

    // If position is specified, render inline ads
    if (position) {
        if (position === 'left') {
            return (
                <div className={styles.inlineAdsContainer}>
                    <div className={styles.adContent}>
                        <div className={styles.adItemsContainer}>
                            {[1, 2, 3].map((num, index) => (
                                <div key={num} className={styles.adItem} onClick={() => handleAdClick(index)}>
                                    <img
                                        src={require(`../../ads/ad${num}.jpg`)}
                                        alt={`Advertisement ${num}`}
                                    />
                                    <div className={styles.adPrice}>
                                        {adPrices[index]} TL
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.inlineAdsContainer}>
                    <div className={styles.adContent}>
                        <div className={styles.adItemsContainer}>
                            {[4, 5, 6].map((num, index) => (
                                <div key={num} className={styles.adItem} onClick={() => handleAdClick(index + 3)}>
                                    <img
                                        src={require(`../../ads/ad${num}.jpg`)}
                                        alt={`Advertisement ${num}`}
                                    />
                                    <div className={styles.adPrice}>
                                        {adPrices[index + 3]} TL
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Otherwise render sticky ads (original implementation)
    return (
        <div className={styles.stickyAdsContainer}>
            {showLeftAd && (
                <div className={`${styles.stickyAd} ${styles.leftAd}`}>
                    <div className={styles.adCloseButton} onClick={handleLeftAdClose}>
                        &times;
                    </div>
                    <div className={styles.adContent}>
                        <div className={styles.adItemsContainer}>
                            {[1, 2, 3].map((num, index) => (
                                <div key={num} className={styles.adItem} onClick={() => handleAdClick(index)}>
                                    <img
                                        src={require(`../../ads/ad${num}.jpg`)}
                                        alt={`Advertisement ${num}`}
                                    />
                                    <div className={styles.adPrice}>
                                        {adPrices[index]} TL
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showRightAd && (
                <div className={`${styles.stickyAd} ${styles.rightAd}`}>
                    <div className={styles.adCloseButton} onClick={handleRightAdClose}>
                        &times;
                    </div>
                    <div className={styles.adContent}>
                        <div className={styles.adItemsContainer}>
                            {[4, 5, 6].map((num, index) => (
                                <div key={num} className={styles.adItem} onClick={() => handleAdClick(index + 3)}>
                                    <img
                                        src={require(`../../ads/ad${num}.jpg`)}
                                        alt={`Advertisement ${num}`}
                                    />
                                    <div className={styles.adPrice}>
                                        {adPrices[index + 3]} TL
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StickyAds;
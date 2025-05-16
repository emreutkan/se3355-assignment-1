import React from 'react';
import StickyAds from '../components/StickyAds';
import TopMenu from '../components/TopMenu';
import Finance from '../components/Finance';
import MainSlider from '../components/MainSlider';
import WeatherData from '../components/WeatherData';
import RandomNews from '../components/RandomNews';
import GecmisModal from '../components/GecmisModal';
import styles from './MainPage.module.css';

const MainPage: React.FC = () => {
    return (
        <div className={styles.mainPage}>
            <TopMenu />
            <Finance />

            <div className={styles.mainContent}>
                <div className={styles.contentLayout}>
                    <div className={styles.contentLeft}>
                        <div className={styles.leftAdsContainer}>
                            <StickyAds position="left" />
                        </div>
                        <div className={styles.contentMain}>
                            <MainSlider />
                        </div>
                    </div>
                    <div className={styles.contentRight}>
                        <div className={styles.contentSidebar}>
                            <RandomNews />
                            <WeatherData />
                        </div>
                        <div className={styles.rightAdsContainer}>
                            <StickyAds position="right" />
                        </div>
                    </div>
                </div>
            </div>

            <GecmisModal />
        </div>
    );
};

export default MainPage;
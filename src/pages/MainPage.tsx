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
            <StickyAds />
            <TopMenu />
            <Finance />

            <div className={styles.mainContent}>
                <div className={styles.contentLayout}>
                    <div className={styles.contentMain}>
                        <MainSlider />
                    </div>
                    <div className={styles.contentSidebar}>
                        <RandomNews />
                        <WeatherData />
                    </div>
                </div>
            </div>

            <GecmisModal />
        </div>
    );
};

export default MainPage;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainSlider.module.css';
import {api, NewsItem} from "../services/api";

const MainSlider: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getNews();
                setNews(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();

        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % (news.length || 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading news...</div>;
    }

    return (
        <div className={styles.sliderContainer}>
            {news.map((item, index) => (
                <Link
                    key={item.id}
                    to={item.link}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                >
                    <img src={item.imageUrl} alt={item.title} className={styles.slideImage} />
                    <div className={styles.slideContent}>
                        <h2 className={styles.slideTitle}>{item.title}</h2>
                    </div>
                </Link>
            ))}
            <div className={styles.sliderNav}>
                {news.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.navDot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainSlider;
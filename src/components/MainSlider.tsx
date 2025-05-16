import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainSlider.module.css';
import {api, NewsItem} from "../services/api";
import { useDispatch } from 'react-redux';
import { addVisitedNews } from '../redux/actions';

const MainSlider: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();

    const startAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % (news.length || 1));
        }, 5000);
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getNews();
                console.log("DEBUG - Fetched news data:", data);
                setNews(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
        startAutoSlide();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (news.length > 0) {
            startAutoSlide();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [news]);

    const handlePrevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + news.length) % news.length);
        startAutoSlide();
    };

    const handleNextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % news.length);
        startAutoSlide();
    };

    if (loading) {
        return <div className={styles.loading}>Loading news...</div>;
    }

    return (
        <div className={styles.sliderContainer}>
            {news.map((item, index) => {
                console.log("DEBUG - Rendering news item:", item);
                return (
                    <div
                        key={item.id}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                    >
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                console.log("DEBUG - Clicked news item:", item);
                                dispatch(addVisitedNews({
                                    id: item.id,
                                    title: item.title,
                                    imageUrl: item.imageUrl,
                                    link: item.link
                                }));
                            }}
                        >
                            <img src={item.imageUrl} alt={item.title} className={styles.slideImage} />
                            <div className={styles.slideContent}>
                                <h2 className={styles.slideTitle}>{item.title}</h2>
                            </div>
                        </a>
                    </div>
                );
            })}

            <div className={styles.sliderControls}>
                <button className={`${styles.sliderArrow} ${styles.arrowLeft}`} onClick={handlePrevSlide}>{'<'}</button>
                <button className={`${styles.sliderArrow} ${styles.arrowRight}`} onClick={handleNextSlide}>{'>'}</button>
            </div>

            <div className={styles.sliderNav}>
                {news.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.navDot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => {
                            setCurrentSlide(index);
                            startAutoSlide();
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainSlider;
import React, { useEffect, useState } from 'react';
import styles from './RandomNews.module.css';
import { NewsItem, api } from '../services/api';
import { useDispatch } from 'react-redux';
import { addVisitedNews } from '../redux/actions';

const RandomNews: React.FC = () => {
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRandomNews = async () => {
            try {
                const newsData = await api.getNews();
                if (newsData.length > 0) {
                    // Select a random news item
                    const randomIndex = Math.floor(Math.random() * newsData.length);
                    setNews(newsData[randomIndex]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news data:', error);
                setLoading(false);
            }
        };

        fetchRandomNews();
    }, []);

    const handleNewsClick = () => {
        if (news) {
            dispatch(addVisitedNews(news));
        }
    };

    if (loading) {
        return <div className={styles.loading}>Yükleniyor...</div>;
    }

    if (!news) {
        return null;
    }

    return (
        <div className={styles.newsContainer}>
            <div className={styles.newsContent}>
                <div className={styles.newsImage}>
                    <img src={news.imageUrl} alt={news.title} />
                </div>
                <div className={styles.newsTitle}>
                    <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleNewsClick}
                    >
                        {news.title}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomNews;
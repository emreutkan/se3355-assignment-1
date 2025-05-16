import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGecmisVisible } from '../redux/actions';
import { RootState } from '../redux/reducers';
import styles from './GecmisModal.module.css';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

const GecmisModal: React.FC = () => {
    const { visitedNews, gecmisVisible } = useSelector((state: RootState) => state.news);
    const dispatch = useDispatch();

    if (!gecmisVisible) {
        return null;
    }

    const handleClose = () => {
        dispatch(setGecmisVisible(false));
    };

    return (
        <div className={styles.gecmisModalOverlay}>
            <div className={styles.gecmisModal}>
                <div className={styles.gecmisHeader}>
                    <h2>Geçmiş</h2>
                    <button className={styles.closeButton} onClick={handleClose}>&times;</button>
                </div>
                <div className={styles.gecmisContent}>
                    {visitedNews.length === 0 ? (
                        <p className={styles.noNews}>Henüz haber ziyaret etmediniz.</p>
                    ) : (
                        <ul className={styles.visitedNewsList}>
                            {visitedNews.map((news: NewsItem) => (
                                <li key={news.id}>
                                    <a href={news.link} target="_blank" rel="noopener noreferrer" onClick={handleClose}>
                                        <div className={styles.visitedNewsItem}>
                                            <img src={news.imageUrl} alt={news.title} />
                                            <div className={styles.visitedNewsInfo}>
                                                <h3>{news.title}</h3>
                                                <p>{news.description}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GecmisModal;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addVisitedNews } from '../redux/actions';
import styles from './MainSlider.module.css';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

const MainSlider: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const mockNews: NewsItem[] = [
                    {
                        id: 1,
                        title: 'Pazartesi-Salı-Çarşamba 0\'ın altında KAR İSTANBUL\'A BU GECE SOKULACAK',
                        description: 'İstanbul\'da kar yağışı bekleniyor, sıcaklıklar düşecek.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Kar+Istanbul',
                        link: '/haber/istanbul-kar-yagisi-1'
                    },
                    {
                        id: 2,
                        title: 'Dünyanın en zengin kadınları ve servetleri açıklandı',
                        description: 'Forbes dergisi dünyanın en zengin kadınlarını açıkladı.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Zengin+Kadinlar',
                        link: '/haber/dunyanin-en-zengin-kadinlari-2'
                    },
                    {
                        id: 3,
                        title: 'Yeni ekonomi paketi açıklandı, piyasalar hareketlendi',
                        description: 'Hükümetin açıkladığı yeni ekonomi paketi piyasalarda olumlu karşılandı.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Ekonomi+Paketi',
                        link: '/haber/ekonomi-paketi-aciklandi-3'
                    },
                    {
                        id: 4,
                        title: 'Milli takım kadrosu açıklandı, sürpriz isimler var',
                        description: 'A Milli Futbol Takımı\'nın kadrosunda sürpriz isimler yer aldı.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Milli+Takim',
                        link: '/haber/milli-takim-kadrosu-4'
                    },
                    {
                        id: 5,
                        title: 'Ünlü şarkıcıdan yeni albüm müjdesi',
                        description: 'Ünlü şarkıcı, yeni albümünü önümüzdeki ay çıkaracağını duyurdu.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Yeni+Album',
                        link: '/haber/yeni-album-mujdesi-5'
                    },
                    {
                        id: 6,
                        title: 'Büyük teknoloji şirketinde istifa depremi',
                        description: 'Dünyanın önde gelen teknoloji şirketinde üst düzey yöneticiler istifa etti.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Teknoloji+Istifa',
                        link: '/haber/teknoloji-sirketi-istifa-6'
                    },
                    {
                        id: 7,
                        title: 'Turizm sektörü 2025\'te rekor bekliyor',
                        description: 'Turizm sektörü temsilcileri 2025 yılında rekor sayıda turist bekliyor.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Turizm+Rekor',
                        link: '/haber/turizm-rekor-bekliyor-7'
                    },
                    {
                        id: 8,
                        title: 'Yeni nesil elektrikli arabalar yollara çıkıyor',
                        description: 'Çevre dostu yeni elektrikli otomobiller yakında Türkiye\'de satışa sunulacak.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Elektrikli+Arabalar',
                        link: '/haber/elektrikli-arabalar-8'
                    },
                    {
                        id: 9,
                        title: 'Sağlık Bakanlığı\'ndan önemli aşı açıklaması',
                        description: 'Sağlık Bakanlığı yeni aşı programını duyurdu.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Asi+Aciklamasi',
                        link: '/haber/asi-aciklamasi-9'
                    },
                    {
                        id: 10,
                        title: 'Son dakika: Büyük deprem tatbikatı başlıyor',
                        description: 'Yarın tüm ülkede büyük deprem tatbikatı gerçekleştirilecek.',
                        imageUrl: 'https://via.placeholder.com/800x400?text=Deprem+Tatbikati',
                        link: '/haber/deprem-tatbikati-10'
                    }
                ];

                // In real implementation, you would fetch from an actual API
                // const response = await fetch('https://api.example.com/news');
                // const data = await response.json();

                setNews(mockNews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();

        // Auto slide every 5 seconds
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % 10);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    const handleNewsClick = (newsItem: NewsItem) => {
        dispatch(addVisitedNews(newsItem));
    };

    const handlePrevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide === 0 ? news.length - 1 : prevSlide - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % news.length);
    };

    if (loading) {
        return <div className={styles.sliderLoading}>Loading news slider...</div>;
    }

    return (
        <div className={styles.mainSlider}>
            <button className={`${styles.sliderArrow} ${styles.prev}`} onClick={handlePrevSlide}>&#10094;</button>

            <div className={styles.sliderContainer}>
                {news.map((item, index) => (
                    <div
                        key={item.id}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                        style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
                    >
                        <Link to={item.link} onClick={() => handleNewsClick(item)}>
                            <div className={styles.slideContent}>
                                <img src={item.imageUrl} alt={item.title} />
                                <div className={styles.slideCaption}>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <button className={`${styles.sliderArrow} ${styles.next}`} onClick={handleNextSlide}>&#10095;</button>

            <div className={styles.sliderDots}>
                {news.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default MainSlider;
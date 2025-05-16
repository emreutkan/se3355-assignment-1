import React, { useEffect, useState } from 'react';
import styles from './WeatherData.module.css';
import { WeatherDay, api } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faEllipsisH, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

const WeatherData: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentCity] = useState('İzmir');
    const [currentTemp] = useState(16);
    const [forecast] = useState('artacak: gelecek Cuma');

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const data = await api.getWeatherData();
                setWeatherData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    const getDayName = (dateStr: string) => {
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        const dayAbbreviations = ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

        const date = new Date(dateStr);
        const dayIndex = date.getDay();

        // First day is "Bugün" (Today)
        if (dateStr === weatherData[0]?.date) {
            return 'Bugün';
        }

        return dayAbbreviations[dayIndex];
    };

    return (
        <div className={styles.weatherContainer}>
            {loading ? (
                <div className={styles.loading}>Yükleniyor...</div>
            ) : (
                <>
                    <div className={styles.weatherHeader}>
                        <div className={styles.weatherLocation}>
                            <FontAwesomeIcon icon={faLocationArrow} className={styles.locationIcon} />
                            <span className={styles.cityName}>{currentCity}</span>
                        </div>
                        <div className={styles.moreOptions}>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </div>
                    </div>

                    <div className={styles.weatherMain}>
                        <div className={styles.currentTempContainer}>
                            <span className={styles.temperatureValue}>{currentTemp}</span>
                            <span className={styles.temperatureUnit}>°C</span>
                        </div>
                        {weatherData.length > 0 && (
                            <img
                                src={weatherData[0].icon}
                                alt={weatherData[0].condition}
                                className={styles.weatherIcon}
                            />
                        )}
                    </div>

                    <div className={styles.weatherDetails}>
                        <div className={styles.temperatureIndicator}>
                            <FontAwesomeIcon icon={faTemperatureHigh} />
                            <span className={styles.forecastText}>{forecast}</span>
                        </div>
                    </div>

                    <div className={styles.weatherContent}>
                        {weatherData.map((day, index) => (
                            <div key={index} className={styles.weatherDay}>
                                <div className={styles.dayName}>{getDayName(day.date)}</div>
                                <img src={day.icon} alt={day.condition} className={styles.dayIcon} />
                                <div className={styles.dayTemp}>
                                    <span className={styles.dayTempHigh}>{day.temp_high}°</span>
                                    <span className={styles.dayTempLow}>{day.temp_low}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherData;
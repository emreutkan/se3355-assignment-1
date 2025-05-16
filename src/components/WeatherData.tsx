import React, { useEffect, useState } from 'react';
import styles from './WeatherData.module.css';
import { WeatherDay, api } from '../services/api';

const WeatherData: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <div className={styles.weatherContainer}>
            {loading ? (
                <div className={styles.loading}>Loading weather data...</div>
            ) : (
                <div className={styles.weatherContent}>
                    {weatherData.map((day, index) => (
                        <div key={index} className={styles.weatherDay}>
                            <div className={styles.date}>{day.date}</div>
                            <img src={day.icon} alt={day.condition} className={styles.weatherIcon} />
                            <div className={styles.condition}>{day.condition}</div>
                            <div className={styles.temperature}>
                                <span className={styles.high}>{day.temp_high}°</span>
                                <span className={styles.low}>{day.temp_low}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherData;
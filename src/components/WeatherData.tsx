import React, { useEffect, useState } from 'react';
import styles from './WeatherData.module.css';

interface WeatherDay {
    day: string;
    date: string;
    icon: string;
    highTemp: number;
    lowTemp: number;
    condition: string;
}

const WeatherData: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('İzmir');
    const [currentTemp, setCurrentTemp] = useState<number>(0);
    const [currentCondition, setCurrentCondition] = useState<string>('');

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const mockWeather: WeatherDay[] = [
                    { day: 'Bugün', date: '15 May', icon: '☀️', highTemp: 18, lowTemp: 12, condition: 'Parçalı Bulutlu' },
                    { day: 'Pzt', date: '16 May', icon: '🌤️', highTemp: 15, lowTemp: 8, condition: 'Parçalı Bulutlu' },
                    { day: 'Sal', date: '17 May', icon: '🌧️', highTemp: 15, lowTemp: 5, condition: 'Yağmurlu' },
                    { day: 'Çar', date: '18 May', icon: '🌧️', highTemp: 13, lowTemp: 4, condition: 'Yağmurlu' },
                    { day: 'Per', date: '19 May', icon: '☀️', highTemp: 14, lowTemp: 8, condition: 'Güneşli' },
                ];


                setWeatherData(mockWeather);
                setCurrentTemp(16);
                setCurrentCondition('Sıcaklık aşırı düşecek: gelecek Cuma');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    const handleCityChange = (newCity: string) => {
        setCity(newCity);
        setLoading(true);
    };

    if (loading) {
        return <div className={styles.weatherLoading}>Loading weather data...</div>;
    }

    return (
        <div className={styles.weatherContainer}>
            <div className={styles.weatherCurrent}>
                <div className={styles.weatherHeader}>
                    <div className={styles.weatherLocation}>
                        <span className={styles.locationIcon}>📍</span>
                        <span className={styles.cityName}>{city}</span>
                        <span className={styles.locationDropdown}>▼</span>
                    </div>
                    <div className={styles.weatherOptions}>⋯</div>
                </div>
                <div className={styles.weatherMain}>
                    <div className={styles.weatherIcon}>🌤️</div>
                    <div className={styles.weatherTemp}>
                        {currentTemp}
                        <sup>°C</sup>
                    </div>
                    <div className={styles.weatherCondition}>{currentCondition}</div>
                </div>
            </div>
            <div className={styles.weatherForecast}>
                {weatherData.map((day, index) => (
                    <div key={index} className={styles.forecastDay}>
                        <div className={styles.dayName}>{day.day}</div>
                        <div className={styles.dayIcon}>{day.icon}</div>
                        <div className={styles.dayTemps}>
                            <span className={styles.highTemp}>{day.highTemp}°</span>
                            <span className={styles.lowTemp}>{day.lowTemp}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherData;
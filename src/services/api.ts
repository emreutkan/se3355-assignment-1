import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://se3355a1b-dpd2gycrcegubjaz.polandcentral-01.azurewebsites.net/api'; // Replace with your production URL

export interface Currency {
    id: number;
    name: string;
    code: string;
    value: number;
    change: number;
    last_updated: string;
}

export interface WeatherDay {
    id: number;
    date: string;
    temp_high: number;
    temp_low: number;
    condition: string;
    icon: string;
}

export interface NewsItem {
    id: number;
    title: string;
    imageUrl: string;
    link: string;
}

export const api = {
    getFinanceData: async (): Promise<Currency[]> => {
        const response = await axios.get(`${BASE_URL}/currencies`);
        return response.data;
    },

    getWeatherData: async (): Promise<WeatherDay[]> => {
        const response = await axios.get(`${BASE_URL}/weather`);
        return response.data;
    },

    getNews: async (): Promise<NewsItem[]> => {
        const response = await axios.get(`${BASE_URL}/news`);
        return response.data;
    }
};
import { ADD_VISITED_NEWS, SET_GECMIS_VISIBLE } from './actionTypes';

interface NewsItem {
    id: number;
    title: string;
    imageUrl: string;
    link: string;
}

export const addVisitedNews = (news: NewsItem) => ({
    type: ADD_VISITED_NEWS,
    payload: news,
});

export const setGecmisVisible = (isVisible: boolean) => ({
    type: SET_GECMIS_VISIBLE,
    payload: isVisible,
});
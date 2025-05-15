import { combineReducers } from 'redux';
import { ADD_VISITED_NEWS, SET_GECMIS_VISIBLE } from './actionTypes';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

interface NewsState {
    visitedNews: NewsItem[];
    gecmisVisible: boolean;
}

const initialState: NewsState = {
    visitedNews: [],
    gecmisVisible: false,
};

const newsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_VISITED_NEWS:
            // Check if news already exists to avoid duplicates
            const exists = state.visitedNews.some(news => news.id === action.payload.id);
            if (exists) {
                return state;
            }

            // Keep only the last 10 visited news
            const updatedNews = [action.payload, ...state.visitedNews].slice(0, 10);
            return {
                ...state,
                visitedNews: updatedNews,
            };

        case SET_GECMIS_VISIBLE:
            return {
                ...state,
                gecmisVisible: action.payload,
            };

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    news: newsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
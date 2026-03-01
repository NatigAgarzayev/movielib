import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import genresReducer from './slices/genresSlice'
import { timeMiddleware } from './middleware/timeMiddleware';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        genres: genresReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(timeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
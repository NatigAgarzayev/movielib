import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import genresReducer from './genresSlice'
import { timeMiddleware } from './timeMiddleware';

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
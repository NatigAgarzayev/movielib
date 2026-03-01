import GenreFilter from "./components/genres/GenreFilter";
import Header from "./components/layout/Header";
import styles from './App.module.css'
import MovieMain from "./components/movie/MovieMain";
import RecentHistory from "./components/sidebar/RecentHistory";
import { useRecentHistory } from "./hooks/useRecentHistory";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { loadMovies } from "./store/slices/moviesSlice";
import { useEffect } from "react";

function App() {
    const dispatch = useAppDispatch()
    const { searchQuery, selectedGenre, currentPage } = useAppSelector((state) => state.movies)
    const { searches, addSearch, removeSearch, clearSearches } = useRecentHistory()

    useEffect(() => {
        dispatch(loadMovies())
    }, [dispatch, searchQuery, selectedGenre, currentPage])
    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'var(--color-dark-gray)',
                        color: 'var(--color-white)',
                        border: '1px solid var(--color-gray)',
                    },
                    error: {
                        style: {
                            border: '1px solid var(--color-red)',
                        },
                    },
                }}
            />
            <Header addSearch={addSearch} />
            <RecentHistory
                searches={searches}
                removeSearch={removeSearch}
                clearSearches={clearSearches}
            />
            <div className={styles.main}>
                <GenreFilter />
                <MovieMain />
            </div>
        </>
    )
}

export default App;
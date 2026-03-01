import GenreFilter from "./components/genres/GenreFilter";
import Header from "./components/layout/Header";
import styles from './App.module.css'
import MovieMain from "./components/movie/MovieMain";
import RecentHistory from "./components/sidebar/RecentHistory";
import { useRecentHistory } from "./hooks/useRecentHistory";

function App() {
    const { searches, addSearch, removeSearch, clearSearches } = useRecentHistory()



    return (
        <>
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
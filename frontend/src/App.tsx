import GenreFilter from "./components/genres/GenreFilter";
import Header from "./components/layout/Header";
import styles from './App.module.css'
import MovieMain from "./components/movie/MovieMain";

function App() {
    return (
        <>
            <Header />
            <div className={styles.main}>
                <GenreFilter />
                <MovieMain />
            </div>
        </>
    )
}

export default App;
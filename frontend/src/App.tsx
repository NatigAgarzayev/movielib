import GenreFilter from "./components/genres/GenreFilter";
import Header from "./components/layout/Header";
import styles from './App.module.css'

function App() {
    return (
        <>
            <Header />
            <div className={styles.main}>
                <GenreFilter />
            </div>
        </>
    )
}

export default App;
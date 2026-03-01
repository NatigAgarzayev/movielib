import styles from './MovieMain.module.css'
import { useMovies } from '../../hooks/useMovies'
import MovieCard from './MovieCard'

export default function MovieMain() {
    const { items, loading, error } = useMovies()

    if (error) return null

    return (
        <div className='wrapper'>
            <div className={styles.grid}>
                {loading
                    ? Array.from({ length: 20 }).map((_, i) => (
                        // <MovieSkeleton key={i} />
                        <div></div>
                    ))
                    : items.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

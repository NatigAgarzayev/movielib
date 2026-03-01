import { useEffect, useRef } from 'react'
import styles from './MovieMain.module.css'
import { useMovies } from '../../hooks/useMovies'
import MovieCard from './MovieCard'
import MovieSkeleton from './MovieSkeleton'
import { toast } from 'react-hot-toast'

const MovieMain = () => {
    const { items, loading, error, hasMore, handleLoadMore } = useMovies()
    const observerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    handleLoadMore()
                }
            },
            { threshold: 0.1 }
        )

        if (observerRef.current) {
            observer.observe(observerRef.current)
        }

        return () => observer.disconnect()
    }, [hasMore, loading, handleLoadMore])

    return (
        <div className='wrapper'>
            <div className={styles.grid}>
                {items.map((movie, i) => (
                    <MovieCard key={movie.id + i} movie={movie} />
                ))}
                {loading && Array.from({ length: 20 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                ))}
            </div>

            <div ref={observerRef} className={styles.trigger} />
        </div>
    )
}

export default MovieMain
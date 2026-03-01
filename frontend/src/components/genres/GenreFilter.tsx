import styles from './GenreFilter.module.css'
import { useGenres } from '../../hooks/useGenres'
import { useMovies } from '../../hooks/useMovies'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast/headless'

const GenreFilter = () => {
    const { items: genres, loading, error } = useGenres()
    const { selectedGenre, handleGenreSelect } = useMovies()

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            el.scrollLeft += e.deltaY
        }

        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (scrollRef.current) {
            e.preventDefault()
            scrollRef.current.scrollLeft += e.deltaY
        }
    }

    if (loading) return (
        <div className="wrapper">
            <div className={styles.genreContent}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={styles.skeletonPill} />
                ))}
            </div>
        </div>
    )

    if (error) return null

    return (
        <div className='wrapper'>
            <div
                className={styles.genreContent}
                ref={scrollRef}
                onWheel={handleWheel}
            >
                <button
                    className={`${styles.pill} ${selectedGenre === null ? styles.active : ''}`}
                    onClick={() => handleGenreSelect(null)}
                >
                    All
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        className={`${styles.pill} ${selectedGenre === genre.id ? styles.active : ''}`}
                        onClick={() => handleGenreSelect(genre.id)}
                    >
                        {genre.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default GenreFilter
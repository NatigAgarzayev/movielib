import styles from './MovieCard.module.css'
import type { Movie } from '../../types/movie.types'
import { useAppSelector } from '../../hooks/useAppSelector'
import Rating from '../ui/rating/Rating'

interface Props {
    movie: Movie
}

export default function MovieCard({ movie }: Props) {
    const genres = useAppSelector((state) => state.genres.items)
    const movieGenres = genres.filter((g) => movie.genreIds.includes(g.id))

    return (
        <div className={styles.card}>
            {movie.posterUrl
                ? <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className={styles.poster}
                />
                : <div className={styles.noPoster}>No Image</div>
            }

            {
                movie.isAdult && <div className={styles.adult}>18+</div>
            }
            <div className={styles.staticInfo}>
                <div className={styles.titleRow}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    <Rating point={movie.rating} />
                </div>
                <span className={styles.year}>{movie.releaseYear ?? 'N/A'}</span>
            </div>

            <div className={styles.overlay}>
                <Rating point={movie.rating} />
                <h3 className={styles.title}>{movie.title}</h3>
                <span className={styles.year}>{movie.releaseYear ?? 'N/A'}</span>
                <p className={styles.description}>{movie.description}</p>
                <div className={styles.genres}>
                    {movieGenres.map((genre) => (
                        <span key={genre.id} className={styles.genre}>
                            {genre.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

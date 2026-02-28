import { TmdbMovie, Movie } from './movie.types';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export function transformMovie(raw: TmdbMovie): Movie {
    return {
        id: raw.id,
        title: raw.title,
        description: raw.overview,
        posterUrl: raw.poster_path
            ? `${TMDB_IMAGE_BASE}${raw.poster_path}`
            : null,
        backdropUrl: raw.backdrop_path
            ? `${TMDB_IMAGE_BASE}${raw.backdrop_path}`
            : null,
        releaseYear: raw.release_date
            ? new Date(raw.release_date).getFullYear()
            : null,
        releaseDate: raw.release_date
            ? new Date(raw.release_date).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
            })
            : 'Unknown',
        rating: Math.round(raw.vote_average * 10) / 10,
        voteCount: raw.vote_count,
        genreIds: raw.genre_ids,
        popularity: raw.popularity,
        isAdult: raw.adult,
    };
}
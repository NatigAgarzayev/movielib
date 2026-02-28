export interface TmdbMovie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
    popularity: number
    adult: boolean
}

export interface Movie {
    id: number
    title: string
    description: string
    posterUrl: string | null
    backdropUrl: string | null
    releaseYear: number
    releaseDate: string
    rating: number
    voteCount: number
    genreIds: number[]
    popularity: number
    isAdult: boolean
}

export interface MovieListResponse {
    results: Movie[]
    totalResults: number
    totalPages: number
    currentPage: number
}
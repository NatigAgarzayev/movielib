export interface Movie {
    id: number
    title: string
    description: string
    posterUrl: string | null
    backdropUrl: string | null
    releaseYear: number | null
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

export interface Genre {
    id: number
    label: string
}
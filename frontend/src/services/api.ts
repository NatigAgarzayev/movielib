import axios from 'axios'
import type { Genre, MovieListResponse } from '../types/movie.types'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
})

export const fetchMovies = (params: {
    search?: string
    genre?: number
    page?: number
}): Promise<MovieListResponse> => {
    return api.get('/movies', { params }).then((res) => res.data)
}

export const fetchGenres = (): Promise<Genre[]> => {
    return api.get('/genres').then((res) => res.data)
}
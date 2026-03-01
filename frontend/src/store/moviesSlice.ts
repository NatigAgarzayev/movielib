import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchMovies } from '../services/api'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../types/movie.types'
import axios, { AxiosError } from 'axios'

interface MoviesState {
    items: Movie[]
    totalPages: number
    currentPage: number
    totalResults: number
    loading: boolean
    error: string | null
    searchQuery: string
    selectedGenre: number | null
}

const initialState: MoviesState = {
    items: [],
    totalPages: 0,
    currentPage: 1,
    totalResults: 0,
    loading: false,
    error: null,
    searchQuery: '',
    selectedGenre: null,
}

export const loadMovies = createAsyncThunk('movies/load', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { movies: MoviesState }
    const { searchQuery, selectedGenre, currentPage } = state.movies

    try {
        const response = await fetchMovies({
            search: searchQuery || undefined,
            genre: selectedGenre ?? undefined,
            page: currentPage,
        })
        return response
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>

        const message =
            axiosError.response?.data?.message
            ?? axiosError.message
            ?? 'Failed to fetch movies'

        return thunkAPI.rejectWithValue(message)
    }
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload
            state.currentPage = 1
            state.selectedGenre = null
        },
        setSelectedGenre(state, action: PayloadAction<number | null>) {
            state.selectedGenre = action.payload
            state.currentPage = 1
            state.searchQuery = ''
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMovies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadMovies.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.results
                state.totalPages = action.payload.totalPages
                state.currentPage = action.payload.currentPage
                state.totalResults = action.payload.totalResults
            })
            .addCase(loadMovies.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setSearchQuery, setSelectedGenre, setCurrentPage } = moviesSlice.actions
export default moviesSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { fetchGenres } from '../../services/api'
import type { Genre } from '../../types/movie.types'

interface GenresState {
    items: Genre[]
    loading: boolean
    error: string | null
}

const initialState: GenresState = {
    items: [],
    loading: false,
    error: null,
}

export const loadGenres = createAsyncThunk('genres/load', async (_, thunkAPI) => {
    try {
        return await fetchGenres()
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>

        const message =
            axiosError.response?.data?.message
            ?? axiosError.message
            ?? 'Failed to fetch genres'

        return thunkAPI.rejectWithValue(message)
    }
})

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadGenres.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadGenres.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(loadGenres.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default genresSlice.reducer
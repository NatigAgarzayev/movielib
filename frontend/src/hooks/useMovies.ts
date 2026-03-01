import { useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { loadMovies, setCurrentPage, setSearchQuery, setSelectedGenre } from '../store/slices/moviesSlice'

export const useMovies = () => {
    const dispatch = useAppDispatch()
    const { items, loading, error, totalPages, currentPage, searchQuery, selectedGenre } = useAppSelector((state) => state.movies)

    useEffect(() => {
        dispatch(loadMovies())
    }, [dispatch, searchQuery, selectedGenre, currentPage])

    const handleSearch = (query: string) => {
        dispatch(setSearchQuery(query))
    }

    const handleGenreSelect = (genreId: number | null) => {
        dispatch(setSelectedGenre(genreId))
    }

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    return {
        items,
        loading,
        error,
        totalPages,
        currentPage,
        searchQuery,
        selectedGenre,
        handleSearch,
        handleGenreSelect,
        handlePageChange,
    }
}
import { useCallback } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { setCurrentPage, setSearchQuery, setSelectedGenre } from '../store/slices/moviesSlice'
import { useRecentHistory } from './useRecentHistory'

export const useMovies = () => {
    const dispatch = useAppDispatch()
    const { addSearch } = useRecentHistory()
    const { items, loading, error, totalPages, currentPage, searchQuery, selectedGenre } = useAppSelector((state) => state.movies)

    const handleSearch = useCallback((query: string) => {
        dispatch(setSearchQuery(query))
        if (query.trim()) addSearch(query)
    }, [dispatch, addSearch])

    const handleGenreSelect = useCallback((genreId: number | null) => {
        dispatch(setSelectedGenre(genreId))
    }, [dispatch])

    const handleLoadMore = useCallback(() => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1))
        }
    }, [dispatch, currentPage, totalPages])

    const handlePageChange = useCallback((page: number) => {
        dispatch(setCurrentPage(page))
    }, [dispatch])

    const hasMore = currentPage < totalPages

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
        hasMore,
        handleLoadMore,
    }
}
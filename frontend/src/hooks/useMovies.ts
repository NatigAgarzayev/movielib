import { useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { loadMovies, setCurrentPage, setSearchQuery, setSelectedGenre } from '../store/slices/moviesSlice'
import { useRecentHistory } from './useRecentHistory'

export const useMovies = () => {
    const dispatch = useAppDispatch()
    const { addSearch } = useRecentHistory()
    const { items, loading, error, totalPages, currentPage, searchQuery, selectedGenre } = useAppSelector((state) => state.movies)

    useEffect(() => {
        dispatch(loadMovies())
    }, [dispatch, searchQuery, selectedGenre, currentPage])

    const handleSearch = (query: string) => {
        dispatch(setSearchQuery(query))
        if (query.trim()) addSearch(query)
    }

    const handleGenreSelect = (genreId: number | null) => {
        dispatch(setSelectedGenre(genreId))
    }

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1))
        }
    }

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
import { useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { loadGenres } from '../store/slices/genresSlice'

export const useGenres = () => {
    const dispatch = useAppDispatch()
    const { items, loading, error } = useAppSelector((state) => state.genres)

    useEffect(() => {
        if (items.length === 0) {
            dispatch(loadGenres())
        }
    }, [dispatch])

    return { items, loading, error }
}
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'recentSearchHistory'
const MAX_ITEMS = 5

const loadFromStorage = (): string[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const saveToStorage = (searches: string[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches))
}

export const useRecentHistory = () => {
    const [searches, setSearches] = useState<string[]>(loadFromStorage)

    useEffect(() => {
        saveToStorage(searches)
    }, [searches])

    const addSearch = (query: string) => {
        const trimmed = query.trim()
        if (!trimmed) return

        setSearches((prev) => {
            const filtered = prev.filter((s) => s !== trimmed)
            const updated = [trimmed, ...filtered]
            return updated.slice(0, MAX_ITEMS)
        })
    }

    const removeSearch = (query: string) => {
        setSearches((prev) => prev.filter((s) => s !== query))
    }

    const clearSearches = () => {
        setSearches([])
    }

    return { searches, addSearch, removeSearch, clearSearches }
}
import { useState } from 'react'
import { History, X, Search, ChevronRight } from 'lucide-react'
import styles from './RecentHistory.module.css'
import { useRecentHistory } from '../../hooks/useRecentHistory'
import { useMovies } from '../../hooks/useMovies'

export default function RecentHistory() {
    const [isOpen, setIsOpen] = useState(false)
    const { searches, removeSearch, clearSearches } = useRecentHistory()
    const { handleSearch } = useMovies()

    const handleSearchClick = (query: string) => {
        handleSearch(query)
        setIsOpen(false)
    }

    return (
        <>
            <button
                className={styles.toggleButton}
                onClick={() => setIsOpen(true)}
            >
                <History size={20} />
            </button>

            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Recent Searches</h2>
                    <button
                        className={styles.closeButton}
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {searches.length === 0
                    ? (
                        <div className={styles.empty}>
                            <Search size={32} className={styles.emptyIcon} />
                            <p>No recent searches yet</p>
                        </div>
                    )
                    : (
                        <>
                            <ul className={styles.list}>
                                {searches.map((query) => (
                                    <li key={query} className={styles.item}>
                                        <button
                                            className={styles.searchButton}
                                            onClick={() => handleSearchClick(query)}
                                        >
                                            <Search size={14} className={styles.searchIcon} />
                                            <span>{query}</span>
                                        </button>
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeSearch(query)}
                                        >
                                            <X size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={styles.clearButton}
                                onClick={clearSearches}
                            >
                                Clear all
                            </button>
                        </>
                    )
                }

                <div className={styles.footer}>
                    <ChevronRight size={16} />
                    <span>Click a search to apply it</span>
                </div>
            </div>
        </>
    )
}
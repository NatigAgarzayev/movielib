import styles from './Header.module.css'
import { Clapperboard } from 'lucide-react'
import SearchBar from '../ui/search/SearchBar'
import { useMovies } from '../../hooks/useMovies'

interface Props {
    addSearch: (query: string) => void
}

export default function Header({ addSearch }: Props) {

    const { searchQuery, handleSearch } = useMovies()

    const handleSubmit = (query: string) => {
        handleSearch(query)
        if (query.trim()) addSearch(query)
    }


    return (
        <header className={styles.header}>
            <div className="wrapper">
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <div className={styles.icon}>
                            <Clapperboard color="white" size={24} />
                        </div>
                        <h1 className={styles.title}>MovieLib</h1>
                    </div>
                    <div className={styles.search}>
                        <SearchBar value={searchQuery} onChange={handleSubmit} />
                    </div>
                </div>
            </div>
        </header >
    )
}

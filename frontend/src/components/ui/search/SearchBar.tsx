import { Search } from 'lucide-react'
import styles from './SearchBar.module.css'

interface Props {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Search for movies...' }: Props) {
    return (
        <div className={styles.container}>
            <Search size={18} className={styles.icon} />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    )
}

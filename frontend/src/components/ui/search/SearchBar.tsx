import { Search } from 'lucide-react'
import styles from './SearchBar.module.css'
import { useEffect, useState } from 'react'

interface Props {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Search for movies...' }: Props) {
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localValue)
        }, 750)

        return () => clearTimeout(timer)
    }, [localValue])

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    return (
        <div className={styles.container}>
            <Search size={18} className={styles.icon} />
            <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    )
}

import React from 'react'
import styles from './Header.module.css'
import { Clapperboard, Search } from 'lucide-react'

export default function Header() {
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
                        <Search size={18} />
                        <input type="text" placeholder="Search for movies..." className={styles.searchInput} />
                    </div>
                </div>
            </div>
        </header >
    )
}

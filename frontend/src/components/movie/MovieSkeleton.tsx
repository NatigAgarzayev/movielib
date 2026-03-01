import styles from './MovieSkeleton.module.css'

export default function MovieSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.staticInfo}>
                <div className={styles.titleRow}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonRating} />
                </div>
                <div className={styles.skeletonYear} />
            </div>
        </div>
    )
}
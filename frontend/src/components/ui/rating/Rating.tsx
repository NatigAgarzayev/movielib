import styles from './Rating.module.css'
import { Star } from 'lucide-react'

interface Props {
    point: number
}

export default function Rating({ point }: Props) {
    return (
        <div className={styles.rating}>
            <Star className={styles.star} fill='white' />
            <span>{point.toFixed(1)}</span>
        </div>
    )
}

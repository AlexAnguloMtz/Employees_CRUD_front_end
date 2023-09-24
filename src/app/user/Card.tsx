import styles from './styles.module.css';
import { Paper } from '@mui/material';

export function Card({ text }: {
    text: string,
}): JSX.Element {
    return (
        <li className={styles.cardContainer}>
            <Paper className={styles.card} elevation={2}>
                <h4 className={styles.cardName}>
                    {text}
                </h4>
            </Paper>
        </li>
    );
}
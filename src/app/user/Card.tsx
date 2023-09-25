import styles from './styles.module.css';
import icon from '../../../public/secret.png';
import Image from 'next/image';
import { Paper } from '@mui/material';

export function Card({ text }: {
    text: string,
}): JSX.Element {
    return (
        <li className={styles.cardContainer}>
            <Paper className={styles.card} elevation={2}>
                <div className={styles.cardContent}>
                    <Icon />
                    <h4 className={styles.cardName}>
                        {text}
                    </h4>
                </div>
            </Paper>
        </li>
    );
}

function Icon(): JSX.Element {
    return (
        <Image
            className={styles.cardIcon}
            src={icon}
            alt='secreto' />
    );
}
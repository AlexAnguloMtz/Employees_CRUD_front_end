import styles from './styles.module.css';

export function Card({ text }: {
    text: string,
}): JSX.Element {
    return (
        <li className={styles.card}>
            <h2>
                {text}
            </h2>
        </li>
    );
}
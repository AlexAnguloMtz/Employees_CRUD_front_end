import styles from './styles.module.css';

export default function CloseButton({ onClick, className }: {
    onClick: () => void,
    className?: string,
}): JSX.Element {
    return (
        <button className={`${styles.closeButton} ${className}`} onClick={onClick}>
            <div className={styles.firstLine}></div>
            <div className={styles.secondLine}></div>
        </button>
    );
}
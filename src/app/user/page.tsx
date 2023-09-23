import { Card } from './Card';
import styles from './styles.module.css';

export default function User(): JSX.Element {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <h1 className={styles.header}>Tus secretos, alex_angulo</h1>
                <ul className={styles.cards}>
                    <Card text='Receta de pay de limón' />
                    <Card text='Receta de pay de queso con fresa y limon' />
                </ul>
            </div>
        </main>
    );
}
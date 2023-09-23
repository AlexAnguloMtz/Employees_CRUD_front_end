'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../client/components/Button';
import styles from './styles.module.css';

export default function Home(): JSX.Element {

    const router = useRouter();

    return (
        <div className={styles.page}>
            <h1 className={styles.header}>
                Encriptador de <span>secretos</span>
            </h1>
            <div className={styles.buttons}>
                <Button onClick={() => router.push('/register')}>
                    <>Registrarse</>
                </Button>
                <Button onClick={() => { }} colorStyle='secondary'>
                    <>Iniciar sesión</>
                </Button>
            </div>
        </div>
    );
} 
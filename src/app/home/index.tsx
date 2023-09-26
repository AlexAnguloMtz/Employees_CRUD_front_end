'use client';

import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { Button } from '../client/components/Button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import HeroImage from './HeroImage';

export default function Home(): JSX.Element {

    const router = useRouter();

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.desktopContent}>
                    <Header />
                    <Buttons router={router} />
                </div>
                <Header className={styles.mobileContent} />
                <HeroImage />
                <Buttons className={styles.mobileContent} router={router} />
            </div>
        </div>
    );
}

function Header({ className }: {
    className?: string,
}): JSX.Element {
    return (
        <h1 className={`${styles.header} ${className}`}>
            Sistema administrador
            <br />
            de <span>personal</span>
        </h1>
    );
}

function Buttons({
    router,
    className
}: {
    router: AppRouterInstance,
    className?: string,
}): JSX.Element {
    return (
        <div className={`${styles.buttons} ${className}`}>
            <Button onClick={() => router.push('/register')}>
                <>Registrar mi negocio</>
            </Button>
            <Button onClick={() => router.push('/login')} colorStyle='secondary'>
                <>Iniciar sesión</>
            </Button>
        </div>
    );
}


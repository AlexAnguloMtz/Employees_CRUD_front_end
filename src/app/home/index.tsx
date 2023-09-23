'use client';

import styles from './styles.module.css';
import animation from '../../../public/data-center.json'
import { useRouter } from 'next/navigation';
import { Button } from '../client/components/Button';
import Lottie from "lottie-react";
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Home(): JSX.Element {

    const router = useRouter();

    const [animationReady, setAnimationReady] = useState<boolean>(false);

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.desktopContent}>
                    {(animationReady) && <Header />}
                    {(animationReady) && <Buttons router={router} />}
                </div>
                {(animationReady) && <Header className={styles.mobileContent} />}
                {(!animationReady) && <CircularProgress />}
                <Animation onDOMLoaded={() => setAnimationReady(true)} />
                {(animationReady) && <Buttons className={styles.mobileContent} router={router} />}
            </div>
        </div>
    );
}

function Header({ className }: {
    className?: string,
}): JSX.Element {
    return (
        <h1 className={`${styles.header} ${className}`}>
            Encriptador de <span>secretos</span>
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
                <>Registrarse</>
            </Button>
            <Button onClick={() => router.push('/login')} colorStyle='secondary'>
                <>Iniciar sesión</>
            </Button>
        </div>
    );
}

function Animation({ onDOMLoaded }: {
    onDOMLoaded: () => void,
}): JSX.Element {
    return (
        <Lottie
            className={styles.animation}
            animationData={animation}
            loop={true}
            onDOMLoaded={onDOMLoaded} />
    );
}
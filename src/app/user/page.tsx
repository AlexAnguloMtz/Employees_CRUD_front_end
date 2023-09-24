'use client';

import { Paper } from '@mui/material';
import { Card } from './Card';
import styles from './styles.module.css';
import { FloatingActionButton } from './FloatingActionButton';
import { useState } from 'react';

export default function User(): JSX.Element {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <Paper className={styles.userCard} elevation={3}>
                    alex_angulo
                </Paper>
                <p className={styles.amountLabel}>Tienes 2 secretos</p>
                <ul className={styles.cards}>
                    <Card text='Receta de pay de limón' />
                    <Card text='Receta de pay de queso con fresa y limon' />
                </ul>
            </div>
            <FloatingActionButton
                open={dialogOpen}
                onFabClick={() => setDialogOpen(true)}
                onOverlayClick={() => setDialogOpen(false)} />
        </main>
    );
}
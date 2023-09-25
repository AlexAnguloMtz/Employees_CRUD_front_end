'use client';

import { Paper } from '@mui/material';
import { Card } from './Card';
import styles from './styles.module.css';
import { FloatingActionButton } from './FloatingActionButton';
import { useState } from 'react';
import { UserPage } from '../common/models/UserPage';
import { Secret } from '../common/models/Secret';

export default function User(): JSX.Element {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [user, setUser] = useState<UserPage>({ username: 'nice', secrets: [{ id: 0, name: 'Receta de tacos', body: 'Tortillas y queso' }] });

    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <Paper className={styles.userCard} elevation={3}>
                    {user.username}
                </Paper>
                <p className={styles.amountLabel}>Tienes {user.secrets.length} {amountUnit(user.secrets.length)}</p>
                <ul className={styles.cards}>
                    {
                        user.secrets.map((model: Secret) =>
                            <Card text={model.name} />)
                    }
                </ul>
            </div>
            <FloatingActionButton
                open={dialogOpen}
                onFabClick={() => setDialogOpen(true)}
                onClose={() => setDialogOpen(false)}
                onUpdate={setUser} />
        </main>
    );
}

const amountUnit = (secretsAmount: number): string =>
    `secreto${(secretsAmount === 1) ? '' : 's'}`;
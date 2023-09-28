'use client';

import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { SaveEmployeeRequest } from '../common/models/SaveEmployeeRequest';
import { createEmployee } from './lib/dataFetching';
import LoadingScreen from '../client/components/LoadingScreen';
import ErrorScreen from '../client/components/ErrorScreen';
import Image from 'next/image';
import successIcon from '../../../public/check.png';
import { useRouter } from 'next/navigation';
import EmployeeForm from '../client/components/EmployeeForm';

type FetchResult = '' | 'success' | 'error';

const CreateEmployee: React.FC = () => {

    const router = useRouter();

    const [posting, setPosting] = useState<boolean>(false);

    const [result, setResult] = useState<FetchResult>('');

    useEffect(() => {
        if (result === 'success' || result === 'error') {
            setPosting(false);
        }
    }, [result]);

    const handleSubmit = (request: SaveEmployeeRequest): void => {
        setPosting(true);
        createEmployee(request)
            .then(() => setResult('success'))
            .catch(() => setResult('error'));
    }

    if (posting) {
        return <LoadingScreen />
    }

    if (result === 'error') {
        return <ErrorScreen />
    }

    if (result === 'success') {
        return <SuccessScreen onDismiss={() => router.push('/')} />
    }

    return (
        <Container className={styles.page} maxWidth="sm">
            <Typography className={styles.mainHeader}>
                Encriptar y Guardar Empleado
            </Typography>
            <EmployeeForm
                onSubmit={handleSubmit}
                submitButtonText={'Encriptar y Guardar Empleado'} />
        </Container>
    );
};

function SuccessScreen({ onDismiss }: {
    onDismiss: () => void
}): JSX.Element {
    return (
        <div className={styles.successScreen}>
            <SuccessIcon />
            <p className={styles.successMessage}>
                El empleado fue creado y encriptado con éxito.
                <br />
                <br />
                Serás redirigido a la página de empleados.
            </p>
            <Button variant='contained' onClick={onDismiss}>
                Ok
            </Button>
        </div>
    );
}

function SuccessIcon(): JSX.Element {
    return (
        <Image
            className={styles.successIcon}
            src={successIcon}
            alt='éxito' />
    );
}

export default CreateEmployee;

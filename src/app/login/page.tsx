'use client';

import styles from './styles.module.css';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '../client/components/Button';
import Link from 'next/link';
import { loginUser } from './lib/data-fetching';
import { DialogType, ResultDialog } from './ResultDialog';
import { loginRequestValidator } from './lib/validations';
import { LoginError } from './LoginError';
import { useRouter } from 'next/navigation';
import { DefaultTextField } from '../client/components/DefaultTextField';
import { DefaultPasswordField } from '../client/components/DefaultPasswordField';

const initialValues: RegistrationRequest = {
    username: '',
    password: '',
}

export default function Register(): JSX.Element {

    const router = useRouter();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<LoginError | undefined>();

    const [success, setSuccess] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginRequestValidator(),
        onSubmit: (request) => {
            setLoading(true);
            setDialogOpen(true);
            loginUser({
                request,
                onSuccess: handleSuccess,
                onError: handleError,
            });
        },
    });

    const handleSuccess = (): void => {
        handleResult(() => {
            setSuccess(true);
        });
    }

    const handleError = (error: LoginError): void => {
        handleResult(() => {
            setError(error);
        });
    }

    const handleResult = (callback: () => void): void => {
        setLoading(false);
        callback();
    }


    const dialogType = (): DialogType => {
        if (isLoading) return DialogType.LOADING;
        if (error !== undefined) return DialogType.ERROR;
        if (success) return DialogType.SUCCESS;
        return DialogType.BASAL;
    }

    const handleDialogClose = (): void => {
        if (success) {
            router.push('/login');
        } else {
            resetState();
        }
    }

    const resetState = (): void => {
        setDialogOpen(false);
    }

    return (
        <main className={styles.page}>
            <ResultDialog
                type={dialogType()}
                open={dialogOpen}
                onClose={handleDialogClose}
                error={error} />
            <form
                className={styles.form}
                onSubmit={formik.handleSubmit}>
                <DefaultTextField
                    id="username"
                    name="username"
                    label="Nombre de usuario"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <DefaultPasswordField
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password} />
                <Button colorStyle="primary" className={styles.submitButton}>
                    <>Iniciar sesión</>
                </Button>
                <AlreadyMember />
            </form>
        </main>
    );
}

function AlreadyMember(): JSX.Element {
    return (
        <div className={styles.dontHaveAccount}>
            <p>
                No tienes una cuenta?
            </p>
            <Link href='/register'>
                Regístrate
            </Link>
        </div>
    );
}
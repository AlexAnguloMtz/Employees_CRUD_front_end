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

const initialValues: BusinessRegistrationRequest = {
    adminUsername: '',
    adminPassword: '',
}

export default function Register(): JSX.Element {

    const router = useRouter();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<LoginError | undefined>();

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

    const handleSuccess = (): void => router.push('/user');

    const handleError = (error: LoginError): void => {
        setLoading(false);
        setError(error);
    }

    const dialogType = (): DialogType => {
        if (isLoading) return DialogType.LOADING;
        if (error !== undefined) return DialogType.ERROR;
        return DialogType.BASAL;
    }

    return (
        <main className={styles.page}>
            <ResultDialog
                type={dialogType()}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                error={error} />
            <form
                className={styles.form}
                onSubmit={formik.handleSubmit}>
                <DefaultTextField
                    id="username"
                    name="username"
                    label="Nombre de usuario"
                    value={formik.values.adminUsername}
                    onChange={formik.handleChange}
                    error={formik.touched.adminUsername && Boolean(formik.errors.adminUsername)}
                    helperText={formik.touched.adminUsername && formik.errors.adminUsername}
                />
                <DefaultPasswordField
                    value={formik.values.adminPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.adminPassword && Boolean(formik.errors.adminPassword)}
                    helperText={formik.touched.adminPassword && formik.errors.adminPassword} />
                <Button colorStyle="primary" className={styles.submitButton}>
                    <>Iniciar sesión</>
                </Button>
                <DontHaveAccount />
            </form>
        </main>
    );
}

function DontHaveAccount(): JSX.Element {
    return (
        <div className={styles.dontHaveAccount}>
            <p>
                ¿No tienes una cuenta?
            </p>
            <Link href='/register'>
                Regístrate
            </Link>
        </div>
    );
}
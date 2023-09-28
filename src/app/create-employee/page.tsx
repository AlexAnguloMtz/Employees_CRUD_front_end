'use client';

import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import schema from './lib/employeeValidations';
import { EmployeeCreationRequest } from '../common/models/EmployeeCreationRequest';
import { createEmployee } from './lib/dataFetching';
import LoadingScreen from '../client/components/LoadingScreen';
import ErrorScreen from '../client/components/ErrorScreen';
import Image from 'next/image';
import successIcon from '../../../public/check.png';
import { useRouter } from 'next/navigation';

const initialValues: EmployeeCreationRequest = {
    fullName: '',
    email: '',
    phone: '',
    monthlySalaryUSD: '',
    address: {
        city: '',
        streetName: '',
        streetNumber: ''
    }
};

const CreateEmployee: React.FC = () => {

    const router = useRouter();

    const [posting, setPosting] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (error || success) {
            setPosting(false);
        }
    }, [error, success]);

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (request: EmployeeCreationRequest) => {
            setPosting(true);
            createEmployee(request)
                .then(() => setSuccess(true))
                .catch(() => setError(true));
        },
    });

    if (posting) {
        return <LoadingScreen />
    }

    if (error) {
        return <ErrorScreen />
    }

    if (success) {
        return <SuccessScreen onDismiss={() => router.push('/')} />
    }

    return (
        <Container className={styles.page} maxWidth="sm">
            <Typography className={styles.mainHeader}>
                Encriptar y Guardar Empleado
            </Typography>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Nombre completo"
                    variant="outlined"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Correo electrónico"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Teléfono"
                    variant="outlined"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                    fullWidth
                    id="monthlySalaryUSD"
                    name="monthlySalaryUSD"
                    label="Salario USD / mes"
                    variant="outlined"
                    value={formik.values.monthlySalaryUSD}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.monthlySalaryUSD && Boolean(formik.errors.monthlySalaryUSD)}
                    helperText={formik.touched.monthlySalaryUSD && formik.errors.monthlySalaryUSD}
                />
                <TextField
                    fullWidth
                    id="address.city"
                    name="address.city"
                    label="Ciudad"
                    variant="outlined"
                    value={formik.values.address.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                    helperText={formik.touched.address?.city && formik.errors.address?.city}
                />
                <TextField
                    fullWidth
                    id="address.streetName"
                    name="address.streetName"
                    label="Calle"
                    variant="outlined"
                    value={formik.values.address.streetName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address?.streetName && Boolean(formik.errors.address?.streetName)}
                    helperText={formik.touched.address?.streetName && formik.errors.address?.streetName}
                />
                <TextField
                    fullWidth
                    id="address.streetNumber"
                    name="address.streetNumber"
                    label="Número de calle"
                    variant="outlined"
                    value={formik.values.address.streetNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address?.streetNumber && Boolean(formik.errors.address?.streetNumber)}
                    helperText={formik.touched.address?.streetNumber && formik.errors.address?.streetNumber}
                />
                <Button className={styles.submitButton} type="submit" variant="contained" color="primary">
                    Encriptar y guardar empleado
                </Button>
            </form>
        </Container>
    );
};

export default CreateEmployee;

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
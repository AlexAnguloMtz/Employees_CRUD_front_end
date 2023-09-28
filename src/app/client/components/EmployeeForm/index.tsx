'use client';

import styles from './styles.module.css';
import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import schema from './lib/employeeValidations';
import { SaveEmployeeRequest } from '@/app/common/models/SaveEmployeeRequest';

type Props = {
    initialValues?: SaveEmployeeRequest,
    onSubmit: (request: SaveEmployeeRequest) => void,
    submitButtonText: string
}

const defaultValues: SaveEmployeeRequest = {
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

function EmployeeForm({
    onSubmit,
    initialValues = defaultValues,
    submitButtonText
}: Props): JSX.Element {

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: onSubmit,
    });

    return (
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
                {submitButtonText}
            </Button>
        </form>
    );
};

export default EmployeeForm;
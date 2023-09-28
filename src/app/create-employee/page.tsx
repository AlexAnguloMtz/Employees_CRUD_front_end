'use client';

import styles from './styles.module.css';
import React from 'react';
import { useFormik } from 'formik';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { employeeValidationSchema } from './employeeValidations';
import { Address } from '../common/models/Address';

const initialValues: EmployeeCreationRequest = {
    name: '',
    email: '',
    phone: '',
    monthlySalaryUSD: '',
    address: {
        municipality: '',
        streetName: '',
        streetNumber: '',
    },
};

type EmployeeCreationRequest = {
    name: string,
    email: string,
    phone: string,
    monthlySalaryUSD: string,
    address: Address,
}

const CreateEmployee: React.FC = () => {

    const handleSubmit = (request: EmployeeCreationRequest) => {
        alert(JSON.stringify((request)));
    };

    const formik = useFormik({
        initialValues,
        validationSchema: employeeValidationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Container className={styles.page} maxWidth="sm">
            <Typography className={styles.mainHeader} variant="h4" gutterBottom>
                Guardar Nuevo Empleado
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Nombre completo"
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="address.municipality"
                            name="address.municipality"
                            label="Ciudad"
                            variant="outlined"
                            value={formik.values.address.municipality}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address?.municipality && Boolean(formik.errors.address?.municipality)}
                            helperText={formik.touched.address?.municipality && formik.errors.address?.municipality}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="monthlySalaryUSD"
                            name="monthlySalaryUSD"
                            label="Salario USD / Mes"
                            variant="outlined"
                            value={formik.values.monthlySalaryUSD}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.monthlySalaryUSD && Boolean(formik.errors.monthlySalaryUSD)}
                            helperText={formik.touched.monthlySalaryUSD && formik.errors.monthlySalaryUSD}
                        />
                    </Grid>
                </Grid>
                <Button className={styles.submitButton} type="submit" variant="contained" color="primary">
                    Guardar Emplado con datos Encriptados
                </Button>
            </form>
        </Container>
    );
};

export default CreateEmployee;

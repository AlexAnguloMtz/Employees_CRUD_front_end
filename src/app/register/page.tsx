'use client';

import styles from './styles.module.css';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '../client/components/Button';
import Link from 'next/link';
import { DialogType, ResultDialog } from './ResultDialog';
import { registrationRequestValidator } from './lib/validations';
import { RegistrationError } from './RegistrationError';
import { useRouter } from 'next/navigation';
import { DefaultTextField } from '../client/components/DefaultTextField';
import { BusinessRegistrationRequest } from '../common/models/BusinessRegistrationRequest';
import { DefaultPasswordField } from '../client/components/DefaultPasswordField';
import { DefaultSelect } from '../client/components/DefaultSelect/DefaultSelect';

const initialValues: BusinessRegistrationRequest = {
    businessName: '',
    businessTypeId: '',
    adminUsername: '',
    adminPassword: '',
    address: {
        stateId: '',
        streetName: '',
        streetNumber: '',
        districtName: '',
        zipCode: '',
    }
}

export default function Register(): JSX.Element {

    const router = useRouter();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<RegistrationError | undefined>();

    const [success, setSuccess] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: registrationRequestValidator(),
        onSubmit: (request) => {
            alert('submitting...');
        },
    });

    const handleSuccess = (): void => {
        handleResult(() => {
            setSuccess(true);
        });
    }

    const handleError = (error: RegistrationError): void => {
        handleResult(() => {
            setError(error);
        });
    }

    const handleResult = (callback: () => void): void => {
        setLoading(false);
        callback();
    }


    const dialogType = (): DialogType => {
        if (isLoading) {
            return DialogType.LOADING;
        }
        if (error !== undefined) {
            return DialogType.ERROR;
        }
        if (success) {
            return DialogType.SUCCESS;
        }
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
                <h1 className={styles.mainHeader}>Registrar negocio</h1>
                <DefaultTextField
                    id="businessName"
                    name="businessName"
                    label="Nombre del negocio"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                    helperText={formik.touched.businessName && formik.errors.businessName}
                />
                <DefaultSelect
                    id='business-type-select'
                    name='businessTypeId'
                    onChange={formik.handleChange}
                    labelId='business-type-select-label'
                    labelText='Giro del negocio'
                    error={formik.touched.businessTypeId && Boolean(formik.errors.businessTypeId)}
                    helperText={formik.touched.businessTypeId && formik.errors.businessTypeId}
                    value={String(formik.values.businessTypeId)}
                    items={[
                        { text: 'Pastelería', value: '10' },
                        { text: 'Renta de vehículos', value: '11' },
                    ]} />
                <DefaultSelect
                    id='state-select'
                    name='address.stateId'
                    onChange={formik.handleChange}
                    labelId='state-select-label'
                    labelText='Estado de la República'
                    error={formik.touched.address?.stateId && Boolean(formik.errors.address?.stateId)}
                    helperText={formik.touched.address?.stateId && formik.errors.address?.stateId}
                    value={String(formik.values.address.stateId)}
                    items={[
                        { text: 'Sonora', value: '10' },
                        { text: 'Chihuahua', value: '11' },
                        { text: 'Sinaloa', value: '12' },
                        { text: 'Yucatán', value: '13' },
                    ]} />
                <DefaultTextField
                    id="streetName"
                    name="address.streetName"
                    label="Calle"
                    value={formik.values.address.streetName}
                    onChange={formik.handleChange}
                    error={formik.touched.address?.streetName && Boolean(formik.errors.address?.streetName)}
                    helperText={formik.touched.address?.streetName && formik.errors.address?.streetName}
                />
                <DefaultTextField
                    id="districtName"
                    name="address.districtName"
                    label="Colonia"
                    value={formik.values.address.districtName}
                    onChange={formik.handleChange}
                    error={formik.touched.address?.districtName && Boolean(formik.errors.address?.districtName)}
                    helperText={formik.touched.address?.districtName && formik.errors.address?.districtName}
                />
                <div className={styles.inputRow}>
                    <DefaultTextField
                        id="streetNumber"
                        name="address.streetNumber"
                        label="Número"
                        value={String(formik.values.address.streetNumber)}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.streetNumber && Boolean(formik.errors.address?.streetNumber)}
                        helperText={formik.touched.address?.streetNumber && formik.errors.address?.streetNumber}
                    />
                    <DefaultTextField
                        id="zipCode"
                        name="address.zipCode"
                        label="Código Postal"
                        value={String(formik.values.address.zipCode)}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.zipCode && Boolean(formik.errors.address?.zipCode)}
                        helperText={formik.touched.address?.zipCode && formik.errors.address?.zipCode}
                    />
                </div>
                <DefaultTextField
                    id="adminUsername"
                    name="adminUsername"
                    label="Nombre de usuario del administrador"
                    value={formik.values.adminUsername}
                    onChange={formik.handleChange}
                    error={formik.touched.adminUsername && Boolean(formik.errors.adminUsername)}
                    helperText={formik.touched.adminUsername && formik.errors.adminUsername}
                />
                <DefaultPasswordField
                    id='adminPassword'
                    name='adminPassword'
                    labelText='Contraseña del administrador'
                    value={formik.values.adminPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.adminPassword && Boolean(formik.errors.adminPassword)}
                    helperText={formik.touched.adminPassword && formik.errors.adminPassword} />
                <Button
                    colorStyle="primary"
                    className={styles.submitButton}>
                    <>Registrar negocio</>
                </Button>
                <AlreadyMember />
            </form>
        </main>
    );
}

function AlreadyMember(): JSX.Element {
    return (
        <div className={styles.alreadyMember}>
            <p>
                ¿Tu negocio ya está registrado?
            </p>
            <Link href='/login'>
                Inicia sesión
            </Link>
        </div>
    );
}
import styles from './styles.module.css';
import success from '../../../public/check.png';
import errorIcon from '../../../public/error.png';
import { SecretCreationRequest } from '../common/models/SecretCreationRequest';
import { validateBody, validateName } from './lib/validations';
import { Button } from '../client/components/Button';
import { ChangeEvent, useState } from 'react';
import { CircularProgress, fabClasses } from '@mui/material';
import { createSecret } from './lib/data-fetching';
import Image from 'next/image';
import { UserPage } from '../common/models/UserPage';

const initialValues: SecretCreationRequest = {
    name: '',
    body: '',
}

export function FloatingActionButton({
    open,
    onFabClick,
    onClose,
    onUpdate,
}: {
    open: boolean,
    onFabClick: () => void,
    onClose: () => void,
    onUpdate: (page: UserPage) => void,
}): JSX.Element {

    const [nameError, setNameError] = useState<string>('');

    const [bodyError, setBodyError] = useState<string>('');

    const [request, setRequest] = useState<SecretCreationRequest>(initialValues);

    const [loading, setLoading] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false);

    const [creationError, setCreationError] = useState<boolean>(false);

    function handleSubmit(): void {
        setErrors();
        if (!hasErrors()) {
            setLoading(true);
            createSecret({
                request,
                onSuccess: handleSuccess,
                onError: handleError
            });
        }
    }

    const handleSuccess = (page: UserPage): void => {
        setLoading(false);
        setSuccess(true);
        onUpdate(page);
    }

    const handleError = (error: Error): void => {
        setLoading(false);
        setCreationError(true);
    }

    const hasErrors = (): boolean => {
        return validateName(request.name) !== '' || validateBody(request.body) !== '';
    }

    const setErrors = (): void => {
        setNameError(validateName(request.name));
        setBodyError(validateBody(request.body));
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setRequest({ ...request, name: e.currentTarget.value });
        setNameError(validateName(e.currentTarget.value));
    }

    const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setRequest({ ...request, body: e.currentTarget.value });
        setBodyError(validateBody(e.currentTarget.value));
    }

    const reset = (): void => {
        setNameError('');
        setBodyError('');
        setLoading(false);
        setSuccess(false);
        setCreationError(false);
        onClose();
        setRequest(initialValues);
    }

    return (
        <>
            <div className={open ? styles.overlayOpen : styles.overlay}>
            </div>
            <div
                className={containerClassName(open, loading, success, creationError)}
                onClick={(open) ? () => { } : onFabClick}>
                <p className={styles.plus}>+</p>
                <form className={styles.fabForm} onSubmit={(e) => e.preventDefault()}>
                    <h3 className={styles.fabHeader}>
                        Nuevo secreto
                    </h3>
                    <div className={`${styles.inputContainer} ${styles.nameInputContainer}`}>
                        <label htmlFor="name" className={styles.formLabel}>Nombre de tu secreto</label>
                        <input className={`${styles.input} ${nameError && styles.error}`} type="text" name='name' onChange={handleNameChange} value={request.name} />
                        <p className={styles.formErrorMessage}>{nameError}</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="body" className={styles.formLabel}>Contenido de tu secreto</label>
                        <textarea className={`${styles.textArea} ${bodyError && styles.error}`} name="body" id="" onChange={handleBodyChange} value={request.body}></textarea>
                        <p className={styles.formErrorMessage}>{bodyError}</p>
                    </div>
                    <Button
                        colorStyle='primary'
                        className={styles.submitButton}
                        onClick={() => handleSubmit()}>
                        <>Encriptar y guardar secreto</>
                    </Button>
                </form>
                <div className={styles.loadingContainer}>
                    <CircularProgress />
                    <p>Encriptando y guardando tu secreto...</p>
                </div>
                <div className={styles.successContainer}>
                    <SuccessIcon />
                    <p>Secreto encriptado y guardado</p>
                    <Button
                        onClick={reset}
                        className={styles.discloseButton}>
                        <>Cerrar</>
                    </Button>
                </div>
                <div className={styles.errorContainer}>
                    <ErrorIcon />
                    <p>No se pudo crear tu secreto. Intenta de nuevo más tarde.</p>
                    <Button
                        onClick={reset}
                        className={styles.discloseButton}>
                        <>Cerrar</>
                    </Button>
                </div>
            </div>
        </>
    );
}

function containerClassName(
    open: boolean,
    loading: boolean,
    success: boolean,
    creationError: boolean,
): string {
    if (!open) {
        return styles.fab;
    }
    if (open && loading) {
        return styles.fabLoading;
    }
    if (open && success) {
        return styles.fabSuccess;
    }
    if (open && creationError) {
        return styles.fabCreationError;
    }
    return styles.fabOpen;
}

function SuccessIcon(): JSX.Element {
    return (
        <Image
            className={styles.successIcon}
            src={success}
            alt='éxito' />
    );
}

function ErrorIcon(): JSX.Element {
    return (
        <Image
            className={styles.successIcon}
            src={errorIcon}
            alt='error' />
    );
}
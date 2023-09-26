import styles from './styles.module.css';
import checkIcon from '../../../public/check.png';
import errorIcon from '../../../public/error.png';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import { BusinessRegistrationError, errorDescription, errorName } from './RegistrationError';

export enum DialogType {
    LOADING,
    SUCCESS,
    ERROR,
    BASAL,
}

export function ResultDialog({
    type,
    open,
    onClose,
    error,
}: {
    type: DialogType,
    open: boolean,
    onClose: () => void,
    error?: BusinessRegistrationError,
}): JSX.Element {

    function body(): JSX.Element {
        if (type === DialogType.LOADING) {
            return <LoadingDialogContent />
        }
        if (type === DialogType.ERROR && error !== undefined) {
            return <ErrorDialogContent onClose={onClose} error={error} />
        }
        if (type === DialogType.BASAL) {
            return <></>;
        }
        return <SuccessDialogContent onClose={onClose} />;
    }

    return (
        <Dialog
            className={styles.dialog}
            fullWidth
            open={open}
            onClose={onClose}>
            <DialogContent>
                {body()}
            </DialogContent>
        </Dialog>
    );
}

function LoadingDialogContent(): JSX.Element {
    return (
        <div className={styles.loadingDialogContent}>
            <CircularProgress />
        </div>
    );
}

function SuccessDialogContent({ onClose }: {
    onClose: () => void
}): JSX.Element {
    return (
        <>
            <Image
                className={styles.dialogIcon}
                src={checkIcon}
                alt='success' />
            <DialogTitle className={styles.dialogTitle}>
                Registro exitoso
            </DialogTitle>
            <p className={styles.dialogText}>
                Se ha creado tu cuenta correctamente.
                Serás redirigido a la página de login.
            </p>
            <DialogActions>
                <button className={styles.dialogButton} onClick={onClose}>
                    Aceptar
                </button>
            </DialogActions>
        </>
    );
}

function ErrorDialogContent({ onClose, error }: {
    onClose: () => void,
    error: BusinessRegistrationError,
}): JSX.Element {
    return (
        <>
            <Image
                className={styles.dialogIcon}
                src={errorIcon}
                alt='error' />
            <DialogTitle className={styles.dialogTitle}>
                {errorName(error)}
            </DialogTitle>
            <p className={styles.dialogText}>
                {errorDescription(error)}
            </p>
            <DialogActions>
                <button className={styles.dialogButton} onClick={onClose}>
                    Aceptar
                </button>
            </DialogActions>
        </>
    );
}
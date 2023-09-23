import styles from './styles.module.css';
import errorIcon from '../../../public/error.png';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import { LoginError, errorDescription, errorName } from './LoginError';

export enum DialogType {
    LOADING,
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
    error?: LoginError,
}): JSX.Element {

    function body(): JSX.Element {
        if (type === DialogType.LOADING) {
            return <LoadingDialogContent />
        }
        if (type === DialogType.ERROR && error !== undefined) {
            return <ErrorDialogContent onClose={onClose} error={error} />
        }
        return <></>;
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

function ErrorDialogContent({ onClose, error }: {
    onClose: () => void,
    error: LoginError,
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
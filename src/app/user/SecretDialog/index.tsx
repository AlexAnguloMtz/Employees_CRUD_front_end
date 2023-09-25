import { CircularProgress } from '@mui/material';
import styles from './styles.module.css';
import { Secret } from '@/app/common/models/Secret';
import { useEffect, useState } from 'react';
import { deleteSecretById, findSecretById } from '../lib/data-fetching';
import Image from 'next/image';
import successIcon from '../../../../public/check.png';
import errorIcon from '../../../../public/error.png';
import { Button } from '@/app/client/components/Button';
import { UserPage } from '@/app/common/models/UserPage';

export function SecretDialog({
    secretId,
    onClose,
    onUpdate,
}: {
    secretId: number,
    onClose: () => void,
    onUpdate: (page: UserPage) => void,
}): JSX.Element {

    const [loading, setLoading] = useState<boolean>(true);

    const [deleting, setDeleting] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    const [secret, setSecret] = useState<Secret | undefined>(undefined);

    const [deleteError, setDeleteError] = useState<boolean>(false);

    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

    useEffect(() => {
        findSecretById({
            id: secretId,
            onError: handleError,
            onSuccess: handleSuccess,
        })
    }, []);

    useEffect(() => {
        if (deleting) {
            deleteSecretById({
                id: secretId,
                onError: handleDeleteError,
                onSuccess: handleDeleteSuccess,
            })
        }
    }, [deleting]);

    const handleError = (e: Error): void => {
        setLoading(false);
        setError(true);
    }

    const handleSuccess = (secret: Secret): void => {
        setLoading(false);
        setSecret(secret);
    }

    const handleDeleteError = (e: Error): void => {
        setDeleting(false);
        setDeleteError(true);
    }

    const handleDeleteSuccess = (page: UserPage): void => {
        setDeleting(false);
        setDeleteSuccess(true);
        onUpdate(page);
    }

    return (
        <div className={secretId !== undefined ? styles.overlayActive : styles.overlay}>
            <div className={dialogClassName({ loading, error, secret, deleting, deleteError, deleteSuccess })}>
                <LoadingContent />
                <ErrorContent onClose={onClose} />
                <SecretContent secret={secret} onClose={onClose} onDelete={() => setDeleting(true)} />
                <DeleteContent />
                <DeleteError onClose={onClose} />
                <DeleteSuccess onClose={onClose} />
            </div>
        </div>
    );
}

function LoadingContent(): JSX.Element {
    return (
        <div className={styles.loadingContent}>
            <CircularProgress />
            <p className={styles.message}>Desencriptando tu secreto...</p>
        </div>
    );
}

function DeleteContent(): JSX.Element {
    return (
        <div className={styles.deletingContent}>
            <CircularProgress />
            <p className={styles.message}>Eliminando tu secreto...</p>
        </div>
    );
}

function ErrorContent({ onClose }: {
    onClose: () => void,
}): JSX.Element {
    return (
        <div className={styles.errorContent}>
            <ErrorIcon />
            <p className={styles.message}>No pudimos abrir tu secreto. Intenta de nuevo más tarde.</p>
            <Button onClick={onClose} className={styles.closeButton}>
                <>Cerrar</>
            </Button>
        </div>
    );
}

function SecretContent({ secret, onClose, onDelete }: {
    secret: Secret | undefined,
    onClose: () => void,
    onDelete: () => void,
}): JSX.Element {
    return (
        <div className={styles.secretContent}>
            <h2 className={styles.secretName}>{secret?.name}</h2>
            <p className={styles.secretBody}>{secret?.body}</p>
            <Button className={styles.secretCloseButton} onClick={onClose}>
                <>Cerrar</>
            </Button>
            <Button colorStyle='destructive' className={styles.secretDeleteButton} onClick={onDelete}>
                <>Eliminar</>
            </Button>
        </div>
    );
}

function DeleteError({ onClose }: {
    onClose: () => void,
}): JSX.Element {
    return (
        <div className={styles.deleteErrorContent}>
            <ErrorIcon />
            <p className={styles.message}>No pudimos eliminar tu secreto. Intenta de nuevo más tarde.</p>
            <Button onClick={onClose} className={styles.closeButton}>
                <>Cerrar</>
            </Button>
        </div>
    );
}

function DeleteSuccess({ onClose }: {
    onClose: () => void,
}): JSX.Element {
    return (
        <div className={styles.deleteSuccessContent}>
            <SuccessIcon />
            <p className={styles.message}>Tu secreto fue eliminado</p>
            <Button onClick={onClose} className={styles.closeButton}>
                <>Cerrar</>
            </Button>
        </div>
    );
}

function ErrorIcon(): JSX.Element {
    return (
        <Image
            className={styles.errorIcon}
            src={errorIcon}
            alt='error' />
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

function dialogClassName({
    loading,
    error,
    deleting,
    deleteError,
    deleteSuccess,
    secret,
}: {
    loading: boolean,
    error: boolean,
    deleting: boolean,
    deleteError: boolean,
    deleteSuccess: boolean,
    secret: Secret | undefined
}): string {
    if (loading) {
        return styles.dialogLoading;
    }
    if (error) {
        return styles.dialogError;
    }
    if (deleting) {
        return styles.dialogDeleting;
    }
    if (deleteError) {
        return styles.dialogDeleteError;
    }
    if (deleteSuccess) {
        return styles.dialogDeleteSuccess;
    }
    return styles.dialogSuccess;
}
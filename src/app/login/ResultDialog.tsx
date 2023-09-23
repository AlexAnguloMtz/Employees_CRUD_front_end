import { LoginError } from './LoginError';
import styles from './styles.module.css';

export enum DialogType {
    LOADING,
    ERROR,
    SUCCESS,
    BASAL,
}

export function ResultDialog({
    type,
    open,
    onClose,
    error
}: {
    type: DialogType,
    open: boolean,
    onClose: () => void,
    error?: LoginError,
}): JSX.Element {
    return (
        <></>
    );
}
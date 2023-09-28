import './styles.css';
import errorIcon from '../../../../../public/error.png';
import Image from 'next/image';

export default function ErrorScreen({
    message
}: {
    message?: string
}): JSX.Element {
    return (
        <div className={'fullScreen errorScreen'}>
            <ErrorIcon />
            <p className='errorMessage'>{message || defaultMessage()}</p>
        </div>
    );
}

function ErrorIcon(): JSX.Element {
    return (
        <Image
            className='errorIcon'
            src={errorIcon}
            alt='error' />
    );
}

function defaultMessage(): string {
    return 'Error cargando datos. Intenta de nuevo más tarde.';
}
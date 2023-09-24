import { SecretCreationRequest } from '../common/models/Secret';
import styles from './styles.module.css';
import { validateBody, validateName } from './lib/validations';
import { Button } from '../client/components/Button';
import { ChangeEvent, useState } from 'react';

const initialValues: SecretCreationRequest = {
    name: '',
    body: '',
}

export function FloatingActionButton({
    open,
    onFabClick,
    onOverlayClick,
}: {
    open: boolean,
    onFabClick: () => void,
    onOverlayClick: () => void,
}): JSX.Element {

    const [nameError, setNameError] = useState<string>('');

    const [bodyError, setBodyError] = useState<string>('');

    const [request, setRequest] = useState<SecretCreationRequest>(initialValues);

    function handleSubmit(): void {
        setErrors();
        if (!hasErrors()) {
            alert('GOOD!');
        }
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

    return (
        <>
            <div className={open ? styles.overlayOpen : styles.overlay}
                onClick={onOverlayClick}>
            </div>
            <div
                className={open ? styles.fabOpen : styles.fab}
                onClick={onFabClick}>
                <p className={styles.plus}>+</p>
                <form className={styles.fabContent} onSubmit={(e) => e.preventDefault()}>
                    <h3 className={styles.fabHeader}>
                        Nuevo secreto
                    </h3>
                    <div className={`${styles.inputContainer} ${styles.nameInputContainer}`}>
                        <label htmlFor="name" className={styles.formLabel}>Nombre de tu secreto</label>
                        <input className={`${styles.input} ${nameError && styles.error}`} type="text" name='name' onChange={handleNameChange} />
                        <p className={styles.formErrorMessage}>{nameError}</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="body" className={styles.formLabel}>Contenido de tu secreto</label>
                        <textarea className={`${styles.textArea} ${bodyError && styles.error}`} name="body" id="" onChange={handleBodyChange}></textarea>
                        <p className={styles.formErrorMessage}>{bodyError}</p>
                    </div>
                    <Button
                        colorStyle='primary'
                        className={styles.submitButton}
                        onClick={() => handleSubmit()}>
                        <>Encriptar y guardar secreto</>
                    </Button>
                </form>
            </div>
        </>
    );
}


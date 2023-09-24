import styles from './styles.module.css';

export function FloatingActionButton({
    open,
    onFabClick,
    onOverlayClick,
}: {
    open: boolean,
    onFabClick: () => void,
    onOverlayClick: () => void,
}): JSX.Element {
    return (
        <>
            <div className={open ? styles.overlayOpen : styles.overlay}
                onClick={onOverlayClick}>
            </div>
            <div
                className={open ? styles.fabOpen : styles.fab}
                onClick={onFabClick}>
                <p className={styles.plus}>+</p>
                <form className={styles.fabContent}>
                    <h3 className={styles.fabHeader}>
                        Nuevo secreto
                    </h3>
                    <label htmlFor="secretName">Nombre del secreto</label>
                    <input type="text" />
                </form>
            </div>
        </>
    );
}
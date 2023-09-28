import styles from './styles.module.css';
import successIcon from '../../../../../public/check.png';
import Image from "next/image";

export default function SuccessIcon(): JSX.Element {
    return (
        <Image
            className={styles.successIcon}
            src={successIcon}
            alt='éxito' />
    );
}
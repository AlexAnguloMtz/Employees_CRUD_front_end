import styles from './styles.module.css';
import successIcon from '../../../../../public/check.png';
import Image from "next/image";
import { CSSProperties } from 'react';

export default function SuccessIcon({
    style
}: {
    style?: CSSProperties
}): JSX.Element {
    return (
        <Image
            style={style}
            className={styles.successIcon}
            src={successIcon}
            alt='éxito' />
    );
}
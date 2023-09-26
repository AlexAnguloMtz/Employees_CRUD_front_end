import styles from './styles.module.css';
import Image from 'next/image';
import image from '../../../public/ladies-speaking.jpg';

export default function HeroImage(): JSX.Element {
    return (
        <Image
            className={styles.heroImage}
            src={image}
            alt='junta de empleo' />
    );
}
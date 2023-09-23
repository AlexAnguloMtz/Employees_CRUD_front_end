import styles from './styles.module.css';

type ColorStyle = 'primary' | 'secondary';

export function Button({
    colorStyle = 'primary',
    children,
    onClick,
    className,
}: {
    colorStyle?: ColorStyle,
    children: JSX.Element,
    onClick?: () => void,
    className?: string,
}): JSX.Element {
    return (
        <button
            className={`${colorStyleClassName(colorStyle)} ${className}`}
            onClick={onClick}>
            {children}
        </button>
    );
}

function colorStyleClassName(colorStyle: ColorStyle): string {
    if (colorStyle === 'primary') {
        return styles.primary;
    }
    return styles.secondary;
}
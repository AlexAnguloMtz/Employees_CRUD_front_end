import styles from './styles.module.css';

type ColorStyle = 'primary' | 'secondary' | 'destructive';

export function Button({
    type = 'button',
    colorStyle = 'primary',
    children,
    onClick,
    className,
}: {
    type?: 'submit' | 'button' | 'reset'
    colorStyle?: ColorStyle,
    children: JSX.Element,
    onClick?: () => void,
    className?: string,
}): JSX.Element {
    return (
        <button
            type={type}
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
    if (colorStyle === 'destructive') {
        return styles.destructive;
    }
    return styles.secondary;
}
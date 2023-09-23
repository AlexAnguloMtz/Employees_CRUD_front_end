import styles from './styles.module.css';

type ColorStyle = 'primary' | 'secondary';

export function Button({
    colorStyle = 'primary',
    children,
    onClick,
}: {
    colorStyle?: ColorStyle,
    children: JSX.Element | string,
    onClick: () => void,
}): JSX.Element {
    return (
        <button
            className={colorStyleClassName(colorStyle)}
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
import styles from './styles.module.css';
import eye from '../../../../../public/eye-solid.svg';
import eyeClosed from '../../../../../public/eye-slash-solid.svg';
import { useState } from "react";
import { DefaultTextField } from "../DefaultTextField";
import { IconButton, InputAdornment } from "@mui/material";
import { StaticImageData } from 'next/image';
import Image from 'next/image';

type Props = {
    id?: string,
    name?: string,
    value: string,
    onChange: (e: React.ChangeEvent) => void,
    helperText?: string | undefined | false,
    labelText: string,
    error?: boolean,
}

export function DefaultPasswordField({
    id,
    name,
    value,
    onChange,
    helperText,
    labelText,
    error,
}: Props): JSX.Element {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    }

    return (
        <DefaultTextField
            id={id}
            name={name}
            label={labelText}
            value={value}
            onChange={onChange}
            helperText={helperText}
            error={error}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((showPassword: boolean) => !showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        <Visibility src={showPassword ? eyeClosed : eye} />
                    </IconButton>
                </InputAdornment>
            }
        />
    );
}


function Visibility({ src }: {
    src: StaticImageData
}): JSX.Element {
    return (
        <Image className={styles.passwordIcon}
            src={src}
            alt='toggle password' />
    );
}
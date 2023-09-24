import { TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

type Props = {
    id?: string,
    name?: string,
    label?: string,
    value: string,
    onChange: (e: React.ChangeEvent) => void,
    error?: boolean,
    helperText: string | false | undefined,
    type?: 'text' | 'password',
    endAdornment?: JSX.Element,
    className?: string,
}

export function DefaultTextField({
    id,
    name,
    label,
    value,
    onChange,
    error,
    helperText,
    endAdornment,
    type,
    className,
}: Props
): JSX.Element {
    return (
        <TextField
            className={className}
            sx={textInputStyle()}
            fullWidth
            id={id}
            name={name}
            label={label}
            variant="outlined"
            value={value}
            type={type}
            onChange={onChange}
            error={error}
            helperText={helperText}
            InputProps={{ endAdornment }}
        />
    );
}

export function textInputStyle(): any {
    return {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgb(255, 255, 255)'
        },
        '& .MuiFormHelperText-sizeMedium': {
            fontSize: '14px',
        }
    };
}


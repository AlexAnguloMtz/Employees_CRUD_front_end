import styles from './styles.module.css';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Item = {
    text: string,
    value: string,
}

type Props = {
    id: string,
    labelId: string,
    labelText: string,
    helperText?: string | false
    onChange?: (e: SelectChangeEvent<string>) => void,
    name?: string,
    items: Array<Item>,
    error?: boolean,
    value: string,
}

export function DefaultSelect({
    id,
    labelId,
    labelText,
    helperText,
    onChange,
    name,
    items,
    error,
    value,
}: Props): JSX.Element {
    return (
        <FormControl>
            <InputLabel className={(error && helperText) ? styles.error : ''} id={labelId}>{labelText}</InputLabel>
            <Select
                id={id}
                labelId={labelId}
                name={name}
                onChange={onChange}
                error={error}
                value={value}>
                {items.map(toMenuItem)}
            </Select>
            {(helperText !== undefined) && (error) && <FormHelperText className={styles.errorMessage}>{helperText}</FormHelperText>}
        </FormControl>
    );
}

function toMenuItem(item: Item): JSX.Element {
    return (
        <MenuItem
            key={item.value}
            value={item.value}>
            {item.text}
        </MenuItem>
    );
}
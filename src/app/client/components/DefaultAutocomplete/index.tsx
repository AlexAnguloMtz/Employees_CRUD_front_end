import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

type FindElementsOptions<T> = {
    onSuccess: (elements: Array<T>) => void,
    onError: (error: Error) => void
}

type FindElements<T> = ({ onSuccess, onError }: FindElementsOptions<T>) => void

type Props<T> = {
    id: string,
    label: string,
    findElements: FindElements<T>,
    getOptionLabel: (t: T) => string,
    isOptionEqualToValue: (option: T, value: T) => boolean,
}

export default function DefaultAutocomplete<T>({
    id,
    label,
    findElements,
    getOptionLabel,
    isOptionEqualToValue,
}: Props<T>
) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<T[]>([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        if (loading) {
            findElements({
                onSuccess: setOptions,
                onError: () => alert('error while fetching business types')
            });
        }
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            fullWidth
            id={id}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}
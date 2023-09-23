export enum RegistrationError {
    USERNAME_CONFLICT,
    UNKNOWN_ERROR,
}

export const errorName = (error: RegistrationError): string => {
    if (error === RegistrationError.USERNAME_CONFLICT) {
        return 'Nombre de usuario ya existe';
    } else {
        return 'Error inesperado';
    }
}

export const errorDescription = (error: RegistrationError): string => {
    if (error === RegistrationError.USERNAME_CONFLICT) {
        return 'Ya existe una cuenta asociada a este nombre de usuario';
    } else {
        return 'No se pudo crear tu cuenta. Intenta de nuevo más tarde.';
    }
}
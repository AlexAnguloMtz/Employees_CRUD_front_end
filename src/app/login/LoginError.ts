export enum LoginError {
    INVALID_CREDENTIALS,
    UNKNOWN_ERROR,
}

export function errorName(type: LoginError): string {
    if (type === LoginError.INVALID_CREDENTIALS) {
        return 'Credenciales inválidas';
    }
    return 'Error inesperado';
}

export function errorDescription(type: LoginError): string {
    if (type === LoginError.INVALID_CREDENTIALS) {
        return 'El nombre de usuario o la contraseña son incorrectos';
    }
    return 'No se pudo iniciar sesión. Intenta de nuevo más tarde.';
}
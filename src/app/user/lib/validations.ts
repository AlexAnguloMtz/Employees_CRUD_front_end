import { SecretCreationRequest } from "@/app/common/models/Secret"

export const validateName = (name: string): string => {
    if (!name) {
        return 'El nombre del secreto es requerido';
    }
    if (name.length > 30) {
        return 'Máximo 30 caracteres';
    }
    return '';
}


export const validateBody = (body: string): string => {
    if (!body) {
        return 'El contenido del secreto es requerido';
    }
    if (body.length > 500) {
        return 'Máximo 500 caracteres';
    }
    return '';
}
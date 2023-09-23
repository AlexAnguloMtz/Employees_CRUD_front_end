import * as yup from 'yup';

export const registrationRequestValidator = () => yup.object({
    username: yup
        .string()
        .required('El nombre de usuario es requerido')
        .min(5, 'El nombre de usuario debe tener al menos 5 caracteres')
        .max(15, 'El nombre de usuario debe tener máximo 15 caracteres')
        .matches(/^[A-Za-z_0-9]+$/, 'El nombre de usuario debe contener sólo letras, números y guión bajo'),
    password: yup
        .string()
        .required('La contraseña es requerida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(50, 'La contraseña debe tener máximo 50 caracteres')
        .matches(/^\S*$/, 'La contraseña no debe contener espacios')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'La contraseña debe contener al menos una mayúscula, una minúscula y un dígito'
        ),
});
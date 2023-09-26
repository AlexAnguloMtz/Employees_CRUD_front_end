import * as yup from 'yup';

export const registrationRequestValidator = () => yup.object({
    businessTypeId: yup
        .string()
        .required("El giro del negocio es requerido"),
    businessName: yup
        .string()
        .required('El nombre del negocio es requerido')
        .max(50, "Máximo 50 caracteres"),
    address: yup.object({
        stateId: yup
            .string()
            .required("El estado es requerido"),
        streetName: yup
            .string()
            .required("La calle es requerida")
            .max(50, "Máximo 50 caracteres"),
        districtName: yup
            .string()
            .required("La colonia es requerida")
            .max(50, "Máximo 50 caracteres"),
        streetNumber: yup
            .string()
            .required("Número requerido")
            .max(7, "Máximo 7 caracteres")
            .matches(/^[0-9A-Za-z]+$/, "Sólo números o letras"),
        zipCode: yup.
            string()
            .required("CP requerido")
            .matches(/^\d{5}$/, "CP inválido")
    }),
    adminUsername: yup
        .string()
        .required('El nombre de usuario es requerido')
        .min(5, 'El nombre de usuario debe tener al menos 5 caracteres')
        .max(15, 'El nombre de usuario debe tener máximo 15 caracteres')
        .matches(/^[A-Za-z_0-9]+$/, 'El nombre de usuario debe contener sólo letras, números y guión bajo'),
    adminPassword: yup
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
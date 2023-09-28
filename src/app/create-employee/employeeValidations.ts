import * as Yup from 'yup';

export const employeeValidationSchema = Yup.object({
    name: Yup.string()
        .required('El nombre es obligatorio')
        .max(80, 'El nombre debe tener como máximo 80 caracteres'),
    email: Yup.string()
        .required('El correo electrónico es obligatorio')
        .email('Formato de correo electrónico inválido')
        .max(80, 'El correo electrónico debe tener como máximo 80 caracteres'),
    phone: Yup.string()
        .required('El teléfono es obligatorio')
        .matches(/^\d+$/, 'El teléfono debe contener solo dígitos')
        .length(10, 'El teléfono debe tener exactamente 10 dígitos'),
    address: Yup.object({
        municipality: Yup
            .string()
            .required('La ciudad es requerida')
            .max(80, 'La ciudad debe tener como máximo 80 caracteres'),
        streetName: Yup
            .string()
            .required('La calle es requerida')
            .max(80, 'El nombre de la calle debe tener como máximo 80 caracteres'),
        streetNumber:
            Yup.string()
                .required('El número del domicilio es requerido')
                .max(10, 'Máximo 10 caracteres')
    }),
    monthlySalaryUSD: Yup.string()
        .required('El salario mensual es obligatorio')
        .matches(/^\d+$/, 'El salario mensual debe contener solo dígitos')
        .max(8, 'Máximo 8 dígitos'),
});

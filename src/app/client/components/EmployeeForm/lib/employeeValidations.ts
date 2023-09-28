import * as Yup from 'yup';

export default Yup.object({
    fullName: Yup.string()
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
    monthlySalaryUSD: Yup.string()
        .required('El salario mensual es obligatorio')
        .matches(/^[1-9]\d*$/, 'Debe ser un número y no puede iniciar con cero')
        .max(8, 'Máximo 8 dígitos'),
    address: Yup.object({
        city: Yup
            .string()
            .required('La ciudad es requerida')
            .max(80, 'Máximo 80 caracteres'),
        streetName: Yup
            .string()
            .required('La calle es requerida')
            .max(80, 'Máximo 80 caracteres'),
        streetNumber: Yup
            .string()
            .required('El número de calle es requerido')
            .max(10, 'Máximo 10 caracteres'),
    })
});
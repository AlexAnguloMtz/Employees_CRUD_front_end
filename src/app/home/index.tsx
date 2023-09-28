'use client';

import './styles.css';
import { CSSProperties, useEffect, useState } from 'react';
import { getEmployees } from './lib/dataFetching';
import { Employee } from '../common/models/Employee';
import Image, { StaticImageData } from 'next/image';
import deleteIcon from '../../../public/delete.png';
import editIcon from '../../../public/edit.png';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../client/components/LoadingScreen';
import ErrorIndicator from '../client/components/ErrorScreen';

export default function Home(): JSX.Element {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<boolean>(false);

    const [employees, setEmployees] = useState<Array<Employee>>([]);

    useEffect(() => {
        if (loading) {
            getEmployees()
                .then(setEmployees)
                .catch((_) => setError(true))
        }
    }, []);

    useEffect(() => {
        if (error || employees.length > 0) {
            setLoading(false);
        }
    }, [employees, error]);

    const navigateToEmployeeCreationPage = (): void => {
        router.push('/create-employee');
    }

    if (loading) {
        return <LoadingIndicator />
    }

    if (error) {
        return <ErrorIndicator />
    }

    return (
        <div className={"page"}>
            <Controls onClick={navigateToEmployeeCreationPage} />
            <table className={"table"}>
                <TableHeaders />
                <tbody>
                    {
                        employees.map((employee: Employee) => {
                            return (
                                <EmployeeRow
                                    employee={employee}
                                    onEdit={() => router.push(`/update-employee?id=${employee.id}`)}
                                    onDelete={() => { }} />
                            );
                        })}
                </tbody>
            </table>
            <FloatingActionButton onClick={navigateToEmployeeCreationPage} />
        </div>
    );
}

function TableHeaders(): JSX.Element {
    return (
        <thead>
            <th style={{ minWidth: '50px' }}>
                Id
            </th>
            <th style={{ minWidth: '250px', maxWidth: '250px' }}>
                Nombre
            </th>
            <th style={{ minWidth: '80px' }}>
                USD / Mes
            </th>
            <th style={{ minWidth: '250px' }}>
                Correo
            </th>
            <th style={{ minWidth: '200px' }}>
                Ciudad
            </th>
            <th style={{ minWidth: '200px' }}>
                Calle y número
            </th>
            <th style={{ minWidth: '150px' }}>
                Teléfono
            </th>
            <th style={{ minWidth: '100px' }}>
                Acciones
            </th>
        </thead>
    );
}

function EmployeeRow({ employee, onEdit, onDelete }: {
    employee: Employee,
    onEdit: () => void,
    onDelete: () => void
}): JSX.Element {
    return (
        <tr>
            <TableCell>
                {String(employee.id)}
            </TableCell>
            <TableCell>
                {employee.fullName}
            </TableCell>
            <TableCell>
                {String(employee.monthlySalaryUSD)}
            </TableCell>
            <TableCell >
                {employee.email}
            </TableCell>
            <TableCell>
                {employee.address.city}
            </TableCell>
            <TableCell >
                {`${employee.address.streetName} ${employee.address.streetNumber}`}
            </TableCell>
            <TableCell>
                {employee.phone}
            </TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <IconButton
                    src={editIcon}
                    alt='editar'
                    onClick={onEdit} />
                <IconButton
                    src={deleteIcon}
                    alt='borrar'
                    onClick={onDelete} />
            </TableCell>
        </tr>
    );
}

function TableCell({ children, style }: {
    children: JSX.Element | Array<JSX.Element> | string,
    style?: CSSProperties
}): JSX.Element {
    return (
        <td className={'tableCell'} style={style}>
            {children}
        </td>
    );
}

function Controls({ onClick }: {
    onClick: () => void
}): JSX.Element {
    return (
        <div className='controls'>
            <button className='primaryAction' onClick={onClick}>
                Guardar nuevo empleado con datos encriptados
            </button>
        </div>
    );
}

function IconButton({ src, alt, onClick }: {
    src: StaticImageData,
    alt: string,
    onClick: () => void
}): JSX.Element {
    return (
        <button
            className='iconButton'
            onClick={onClick}>
            <Image
                src={src}
                alt={alt} />
        </button>
    );
}

function FloatingActionButton({ onClick }: {
    onClick: () => void
}): JSX.Element {
    return (
        <button className='fab' onClick={onClick}>
            +
        </button>
    );
}
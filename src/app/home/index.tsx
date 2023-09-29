'use client';

import './styles.css';
import { CSSProperties, useEffect, useState } from 'react';
import { deleteEmployee, getEmployees } from './lib/dataFetching';
import { Employee } from '../common/models/Employee';
import Image, { StaticImageData } from 'next/image';
import deleteIcon from '../../../public/delete.png';
import editIcon from '../../../public/edit.png';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../client/components/LoadingScreen';
import ErrorIndicator from '../client/components/ErrorScreen';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CustomSpinner from '../client/components/CustomSpinner';
import SuccessIcon from '../client/components/SuccessIcon';

export default function Home(): JSX.Element {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<boolean>(false);

    const [employees, setEmployees] = useState<Array<Employee> | undefined>(undefined);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | undefined>(undefined);

    useEffect(() => {
        if (loading) {
            getEmployees()
                .then(setEmployees)
                .catch((_) => setError(true))
        }
    }, []);

    useEffect(() => {
        if (error || employees !== undefined) {
            setLoading(false);
        }
    }, [employees, error]);

    const navigateToEmployeeCreationPage = (): void => {
        router.push('/create-employee');
    }

    const handleDelete = (employee: Employee): void => {
        setDeleteDialogOpen(true);
        setEmployeeToDelete(employee);
    }

    const resetDeletion = (): void => {
        setDeleteDialogOpen(false);
        setEmployeeToDelete(undefined);
    }

    const handleSuccessfulDelete = (id: number): void => {
        setEmployees(removeEmployeeById(employees!, id));
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
            {
                (employees!.length > 0)
                    ?
                    <table className={"table"}>
                        <TableHeaders />
                        <tbody>
                            {
                                employees!.map((employee: Employee) => {
                                    return (
                                        <EmployeeRow
                                            employee={employee}
                                            onEdit={() => router.push(`/update-employee?id=${employee.id}`)}
                                            onDelete={() => handleDelete(employee)} />
                                    );
                                })}
                        </tbody>

                    </table>
                    : <NoEmployeesMessage />

            }
            <FloatingActionButton onClick={navigateToEmployeeCreationPage} />
            <DeleteEmployeeDialog
                open={deleteDialogOpen}
                employeeToDelete={employeeToDelete}
                onCancel={() => setDeleteDialogOpen(false)}
                onResultAchieved={resetDeletion}
                onSuccessfulDelete={handleSuccessfulDelete} />
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

function DeleteEmployeeDialog({
    open,
    employeeToDelete,
    onCancel,
    onResultAchieved,
    onSuccessfulDelete,
}: {
    open: boolean,
    employeeToDelete: Employee | undefined,
    onCancel: () => void,
    onResultAchieved: () => void,
    onSuccessfulDelete: (id: number) => void
}): JSX.Element {

    const [deleting, setDeleting] = useState<boolean>(false);

    const [deleteResult, setDeleteResult] = useState<undefined | 'error' | 'success'>(undefined);

    const handleDeleteConfirmation = (): void => {
        setDeleting(true);
    }

    const handleResultAchieved = (): void => {
        onResultAchieved();
        setTimeout(() => {
            setDeleteResult(undefined);
        }, 500);
    }

    useEffect(() => {
        if (deleting) {
            deleteEmployee(employeeToDelete!.id)
                .then(() => setDeleteResult('success'))
                .catch(() => setDeleteResult('error'));
        }
    }, [deleting]);

    useEffect(() => {
        if (deleteResult !== undefined) {
            setDeleting(false);
        }
        if (deleteResult === 'success') {
            onSuccessfulDelete(employeeToDelete!.id);
        }
    }, [deleteResult]);

    const body = (): JSX.Element => {

        if (deleting) {
            return (
                <div style={{ width: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                    <CustomSpinner />
                </div>
            );
        }

        if (deleteResult === 'success') {
            return <DeletedSuccessfully onClose={handleResultAchieved} />;
        }

        if (deleteResult === 'error') {
            return <DeleteError onClose={handleResultAchieved} />
        }

        return (
            <>
                <DialogTitle>
                    Eliminar empleado
                </DialogTitle>
                <DialogContent>
                    Desea eliminar al empleado
                    <strong>{' ' + employeeToDelete?.fullName}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button className={'cancelButton'} onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button className={'deleteButton'} onClick={handleDeleteConfirmation}>
                        Eliminar
                    </Button>
                </DialogActions>
            </>
        );
    }

    return (
        <Dialog open={open} className={'deleteDialog'}>
            {body()}
        </Dialog>
    );
}

function DeletedSuccessfully({ onClose }: {
    onClose: () => void
}): JSX.Element {
    return (
        <>
            <div style={{ padding: '12px', textAlign: 'center' }}>
                <SuccessIcon style={{ width: '80px', height: '80px', margin: '0 auto' }} />
                <DialogContent>
                    Se eliminó el empleado
                </DialogContent>
            </div>

            <DialogActions>
                <Button onClick={onClose}>
                    Cerrar
                </Button>
            </DialogActions>
        </>
    );
}

function DeleteError({ onClose }: {
    onClose: () => void
}): JSX.Element {
    return (
        <>
            <DialogTitle>
                Error desconocido
            </DialogTitle>
            <DialogContent>
                <p>No se pudo eliminar el empleado. Intenta de nuevo más tarde.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cerrar
                </Button>
            </DialogActions>
        </>
    );
}

function removeEmployeeById(employees: Employee[], id: number): Array<Employee> {
    return employees.filter(employee => employee.id !== id);
}

function NoEmployeesMessage(): JSX.Element {
    return (
        <div className={'noEmployeesMessage'}>
            <h1>No existen empleados</h1>
            <h2>Agrega un nuevo empleado para comenzar</h2>
        </div>
    );
}
'use client';

import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { SaveEmployeeRequest } from '../common/models/SaveEmployeeRequest';
import EmployeeForm from '../client/components/EmployeeForm';
import { getEmployeeById, updateEmployee } from './lib/dataFetching';
import { Employee } from '../common/models/Employee';
import LoadingIndicator from '../client/components/LoadingScreen';
import ErrorScreen from '../client/components/ErrorScreen';
import SuccessIcon from '../client/components/SuccessIcon';
import { useRouter } from 'next/navigation';

type InitialFetchResult = undefined | 'error' | SaveEmployeeRequest;

type EmployeeUpdateResult = undefined | 'error' | 'success';

type SearchParams = {
  id: number
}

function UpdateEmployee({ searchParams }: {
  searchParams: SearchParams
}): JSX.Element {

  const router = useRouter();

  const [loadingEmployee, setLoadingEmployee] = useState<boolean>(true);

  const [updatingEmployee, setUpdatingEmployee] = useState<boolean>(false);

  const [initialFetchResult, setInitialFetchResult] = useState<InitialFetchResult>(undefined);

  const [employeeUpdateResult, setEmployeeUpdateResult] = useState<EmployeeUpdateResult>(undefined);

  useEffect(() => {
    if (loadingEmployee) {
      getEmployeeById(searchParams.id)
        .then((employee: Employee) => setInitialFetchResult(toRequest(employee)))
        .catch(() => setInitialFetchResult('error'));
    }
  }, []);

  useEffect(() => {
    if (initialFetchResult !== undefined) {
      setLoadingEmployee(false);
    }
  }, [initialFetchResult]);

  useEffect(() => {
    if (employeeUpdateResult !== undefined) {
      setUpdatingEmployee(false);
    }
  }, [employeeUpdateResult]);

  const handleSubmit = (request: SaveEmployeeRequest): void => {
    setUpdatingEmployee(true);
    updateEmployee(request)
      .then(() => setEmployeeUpdateResult('success'))
      .catch(() => setEmployeeUpdateResult('error'));
  }

  if (loadingEmployee || updatingEmployee) {
    return <LoadingIndicator />;
  }

  if (initialFetchResult === 'error') {
    return <ErrorScreen />;
  }

  if (employeeUpdateResult === 'error') {
    return <ErrorScreen message='No se pudo actualizar el empleado. Intenta de nuevo más tarde.' />
  }

  if (employeeUpdateResult === 'success') {
    return (
      <EmployeeUpdateSuccess
        onContinue={() => router.push('/')} />
    );
  }

  return (
    <Container className={styles.page} maxWidth="sm">
      <h1 className={styles.mainHeader}>
        Actualizar Empleado
      </h1>
      <EmployeeForm
        onSubmit={handleSubmit}
        initialValues={initialFetchResult}
        submitButtonText={'Actualizar Empleado'} />
    </Container>
  );
};

function EmployeeUpdateSuccess({
  onContinue,
}: {
  onContinue: () => void,
}): JSX.Element {
  return (
    <div className={styles.fullScreen}>
      <SuccessIcon />
      <p className={styles.successMessage}>
        Se actualizó el empleado y se encriptó su información.
        <br />
        Serás redirigido a la página de empleados.
      </p>
      <Button onClick={onContinue} className={styles.dismissButton} variant='contained'>
        Ir a página <br /> de empleados
      </Button>
    </div>
  );
}

function toRequest(employee: Employee): SaveEmployeeRequest {
  return {
    fullName: employee.fullName,
    email: employee.email,
    phone: employee.phone,
    monthlySalaryUSD: String(employee.monthlySalaryUSD),
    address: employee.address,
  }
}

export default UpdateEmployee;
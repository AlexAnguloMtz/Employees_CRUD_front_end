import { Employee } from "@/app/common/models/Employee";
import { SaveEmployeeRequest } from "@/app/common/models/SaveEmployeeRequest";

export function getEmployeeById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 0,
                fullName: 'Luis',
                email: 'raul@gmail.com',
                phone: '6655443322',
                monthlySalaryUSD: 100,
                address: {
                    streetName: 'Calle Suárez',
                    streetNumber: '200A',
                    city: 'Guaymas',
                }
            });
        }, 1000);
    });
}

export function updateEmployee(request: SaveEmployeeRequest): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
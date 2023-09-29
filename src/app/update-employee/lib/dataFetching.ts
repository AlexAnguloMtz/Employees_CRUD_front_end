import { Employee } from "@/app/common/models/Employee";
import { SaveEmployeeRequest } from "@/app/common/models/SaveEmployeeRequest";

export async function getEmployeeById(id: number): Promise<Employee> {
    try {
        const response: Response = await fetch(`/api/employees/${id}`);
        if (response.ok) {
            return (await response.json()) as Employee;
        }
        throw new Error(`Could not find employee with id ${id}`);
    } catch (e) {
        throw e;
    }
}

export async function updateEmployee(id: number, request: SaveEmployeeRequest): Promise<void> {
    try {
        const response: Response = await fetch(`/api/employees/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(request)
        });
        if (response.ok) {
            return new Promise((resolve, _) => { resolve(); });
        }
        throw new Error(JSON.stringify(await response.json()));
    } catch (e) {
        throw e;
    }
}
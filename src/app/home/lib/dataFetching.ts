import { Employee } from "@/app/common/models/Employee";

export async function getEmployees(): Promise<Array<Employee>> {
    try {
        const rensponse: Response = await fetch('/api/employees');
        if (rensponse.ok) {
            return await rensponse.json() as Array<Employee>;
        }
        throw new Error('Could not load employees');
    } catch (e) {
        throw e;
    }
}

export async function deleteEmployee(id: number): Promise<void> {
    try {
        const rensponse: Response = await fetch(`/api/employees/${id}`, {
            method: 'DELETE'
        });
        if (rensponse.ok) {
            return new Promise((resolve, _) => { resolve(); });
        }
        throw new Error('Could not delete employee');
    } catch (e) {
        throw e;
    }
}
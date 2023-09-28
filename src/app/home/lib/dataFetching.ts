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
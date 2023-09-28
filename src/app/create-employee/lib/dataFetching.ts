import { SaveEmployeeRequest } from "@/app/common/models/SaveEmployeeRequest";

export async function createEmployee(request: SaveEmployeeRequest): Promise<void> {
    try {
        const response: Response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (response.ok) {
            return new Promise((resolve, _) => { resolve(); });
        }

        throw new Error('Could not save employee');

    } catch (e) {
        throw e;
    }
}
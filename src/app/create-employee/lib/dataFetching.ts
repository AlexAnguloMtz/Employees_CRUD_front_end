import { EmployeeCreationRequest } from "@/app/common/models/EmployeeCreationRequest";

export async function createEmployee(request: EmployeeCreationRequest): Promise<void> {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(); }, 1000);
        })
    } catch (e) {
        throw e;
    }
}
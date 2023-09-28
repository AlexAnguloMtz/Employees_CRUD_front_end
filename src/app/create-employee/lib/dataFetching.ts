import { SaveEmployeeRequest } from "@/app/common/models/SaveEmployeeRequest";

export async function createEmployee(request: SaveEmployeeRequest): Promise<void> {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(); }, 1000);
        })
    } catch (e) {
        throw e;
    }
}
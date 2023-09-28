import { Address } from "./Address"

export type Employee = {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: Address,
    monthlySalaryUSD: number,
}
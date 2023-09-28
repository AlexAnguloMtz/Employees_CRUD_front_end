import { Address } from "./Address"

export type Employee = {
    id: number,
    fullName: string,
    email: string,
    phone: string,
    address: Address,
    monthlySalaryUSD: number,
}
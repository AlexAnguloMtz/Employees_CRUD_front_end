import { Address } from "./Address";

export type BusinessRegistrationRequest = {
    businessName: string,
    businessTypeId: number,
    adminUsername: string,
    adminPassword: string,
    address: Address,
}
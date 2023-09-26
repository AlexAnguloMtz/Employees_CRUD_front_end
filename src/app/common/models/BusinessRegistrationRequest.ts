import { Address } from "./Address";

export type BusinessRegistrationRequest = {
    businessName: string,
    businessTypeId: string,
    adminUsername: string,
    adminPassword: string,
    address: Address,
}
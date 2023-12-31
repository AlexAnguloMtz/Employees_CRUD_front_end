export type SaveEmployeeRequest = {
    fullName: string,
    email: string,
    phone: string,
    monthlySalaryUSD: string,
    address: {
        city: string,
        streetName: string,
        streetNumber: string
    }
}
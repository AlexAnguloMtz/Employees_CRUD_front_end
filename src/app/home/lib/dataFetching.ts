import { Employee } from "@/app/common/models/Employee";

export async function getEmployees(): Promise<Array<Employee>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 10000,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 30000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                },
                {
                    id: 0,
                    name: 'Alex Raul Angulo Martinez',
                    email: 'raulalexo100@gmail.com',
                    monthlySalaryUSD: 3000,
                    phone: '6471192636',
                    address: {
                        city: 'Guaymas',
                        streetName: 'Heriberto Aja',
                        streetNumber: "200",
                    },
                }
            ]);
        }, 1000);
    });
}

// try {
//     const rensponse: Response = await fetch('/api/employees');
//     if (rensponse.ok) {
//         return await rensponse.json() as Array<Employee>;
//     }
//     throw new Error('Could not load employees');
// } catch (e) {
//     throw e;
// }
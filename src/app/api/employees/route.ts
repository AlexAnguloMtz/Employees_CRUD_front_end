import { Employee } from "@/app/common/models/Employee";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response: Response = await fetch(`${process.env.API_BASE_URL!}/employees`);
        if (response.ok) {
            const employees: Array<Employee> = await response.json();
            return NextResponse.json(employees, { status: response.status });
        }
        throw new Error();
    } catch (e) {
        return NextResponse.json({ error: 'Could not load employees' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const response: Response = await fetch(`${process.env.API_BASE_URL!}/employees`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(await request.json())
        });
        if (response.ok) {
            return NextResponse.json({ message: 'Employee saved successfully' }, { status: response.status });
        }
        throw new Error();
    } catch (e) {
        return NextResponse.json({ error: 'Could not save employe' }, { status: 500 })
    }
}
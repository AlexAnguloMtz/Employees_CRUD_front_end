import { NextResponse } from "next/server";
import { RegistrationOptions } from "@/app/common/models/RegistrationOptions";

export async function GET() {
    try {
        const response: Response = await fetch(`${process.env.API_BASE_URL}/api/registration-options`);

        if (response.ok) {
            const data: RegistrationOptions = await response.json();
            return NextResponse.json(data, { status: response.status });
        }

        throw new Error('Could not load data');

    } catch (e) {
        return NextResponse.json({}, { status: 500 })
    }

}
import { NextResponse } from "next/server";

type Params = {
    id: number
}

export async function GET(
    request: Request,
    { params }: { params: Params }
) {
    try {
        const response: Response = await fetch(`${process.env.API_BASE_URL}/employees/${params.id}`, {
            headers: {
                'x-api-key': process.env.API_KEY!
            }
        });
        if (response.ok) {
            return NextResponse.json((await response.json()), { status: response.status });
        }
        throw new Error();
    } catch (e) {
        return NextResponse.json({ error: 'Could not find employee' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Params }
) {
    try {
        const response: Response = await fetch(`${process.env.API_BASE_URL}/employees/${params.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'x-api-key': process.env.API_KEY!
            },
            body: JSON.stringify(await request.json())
        });

        if (response.ok) {
            return NextResponse.json({ message: 'Employee updated successfully' }, { status: response.status });
        }

        throw new Error(`${response.status}`);

    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Params }
) {
    try {
        const response: Response = await fetch(`${process.env.API_BASE_URL}/employees/${params.id}`, {
            method: 'DELETE',
            headers: { 'x-api-key': process.env.API_KEY! }
        });
        if (response.ok) {
            return NextResponse.json({ message: 'Employee deleted successfully' }, { status: response.status });
        }
        throw new Error();
    } catch (e) {
        return NextResponse.json({ error: 'Could not delete employee' }, { status: 500 });
    }
}
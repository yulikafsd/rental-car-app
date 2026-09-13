import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ carId: string }> },
) {
    try {
        const { carId } = await params;
        const requestData = await request.json();

        console.log(`[Server] Received booking request for Car ID: ${carId}`, {
            carId,
            ...requestData,
            receivedAt: new Date().toISOString(),
        });

        if (!requestData.name || !requestData.email) {
            return NextResponse.json(
                { message: "Name and email are required" },
                { status: 400 },
            );
        }

        const carTarget = requestData.carName
            ? `${requestData.carName}`
            : "your selected car";

        return NextResponse.json(
            {
                message: `Thank you, ${requestData.name}! Your booking request for ${carTarget} has been successfully submitted. We will contact you soon!`,
            },
            { status: 201 },
        );
    } catch {
        return NextResponse.json(
            { message: "Failed to process booking" },
            { status: 500 },
        );
    }
}

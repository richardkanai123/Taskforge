import { prisma } from "@/lib/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    const { id } = await params;
    
    try {
        const user = await prisma.users.findUnique({
            where: { id: id }, select: {
                id: true,
                email: true,
                fullname: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true,
        } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        return NextResponse.json(user, { status: 200 });
    
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, body: { message: error.message } };
        }
        return { status: 500, body: { message: "Internal Server Error" } };
    }
    
}
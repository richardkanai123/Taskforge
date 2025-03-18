import { prisma } from "@/lib/Prisma";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Params }) {

    const { id } = await params;
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: id as string }, select: {
                id: true,
                email: true,
                name: true,
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
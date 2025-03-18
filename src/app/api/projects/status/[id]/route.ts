import { prisma } from "@/lib/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    const { id } =await params;
    try {
        const ProjectData = await prisma.project.findUnique({
            where: {
                id: id,
            },

            select: {
                status: true,
            }
        });

        if (!ProjectData) {
            return NextResponse.json({ message: "No project found" }, { status: 404 });
        }
        return NextResponse.json({ message: ProjectData.status }, { status: 200 });
    
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, body: { message: error.message } };
        }
        return { status: 500, body: { message: "Internal Server Error" } };
    }
}
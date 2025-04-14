// fetch projects from the database for the current user
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/Prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    

    try {
        const { id: projectid } = await params
       
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        
        }
            
        // check if project exists
        const projectExists = await prisma.project.findUnique({
            where: {
                id: projectid as string,
            },
        });

        if (!projectExists) {
            return NextResponse.json({ message: "Invalid project " }, { status: 404 });
        }

        // get the tasks of the project given the project id
        const tasks = await prisma.task.findMany({
            where: {
                projectId: projectid,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(tasks, { status: 200 });
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

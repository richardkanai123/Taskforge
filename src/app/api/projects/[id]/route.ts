import { ProjectSchema } from "@/lib/Constants";
import { prisma } from "@/lib/Prisma";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

// get project by id
export async function GET(request: NextRequest, { params }: { params: Params }) {

    const { id } =await params;
    try {
        const ProjectData = await prisma.project.findUnique({
            where: {
                id: id as string,
            },
        });

        if (!ProjectData) {
            return NextResponse.json({ message: "No project found" }, { status: 404 });
        }
        return NextResponse.json(ProjectData, { status: 200 });
    
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, body: { message: error.message } };
        }
        return { status: 500, body: { message: "Internal Server Error" } };
    }
}


// update project by id
export async function PATCH(request: NextRequest, { params }: { params: Params }) {

    const { id } = await params;
    
    try {

        const body = await request.json();

        // validate the request body    
        const isValidProjectData = ProjectSchema.safeParse(body);

        if (!isValidProjectData.success) {
            return NextResponse.json(
                { message: `Invalid project data`, errors: isValidProjectData.error.errors },
                { status: 406 }
            );
        }

        //   check if project exists
        const projectExists = await prisma.project.findUnique({
            where: {
                id: id as string,
            },
        });

        if (!projectExists) {
            return NextResponse.json({ message: "Invalid project " }, { status: 404 });
        }

        // comp
        
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, body: { message: error.message } };
        }
        return { status: 500, body: { message: "Internal Server Error" } };
        
    }
}
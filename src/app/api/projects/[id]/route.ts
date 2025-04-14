import { auth } from "@/lib/auth";
import { ProjectSchema } from "@/lib/Constants";
import { projectsPermission } from "@/lib/Permissions/projectsPermission";
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

        // console.log(ProjectData)

        //check if the user is authorized to view the project
        const session = await auth.api.getSession({
            headers: request.headers,
        });

    // check if the user is authorized to view the project
    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

        if (session.role === 'ADMIN') {
            return NextResponse.json(ProjectData, { status: 200 });
        }

        console.log(session.role)

        // check for persmission
        const { isOwner, isLead, isMember, isCustomer } = await projectsPermission(ProjectData, session.user.id);

        if (!isOwner && !isLead && !isMember && !isCustomer) {
            return NextResponse.json({
                message: "You are not authorized to view this project" }, { status: 401 });
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

        const updatedProject = await prisma.project.update({
            where: {
                id: id as string,
            }
            , data: {
                ...body,
            },
        });

        return NextResponse.json(updatedProject, { status: 200 });
        
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, body: { message: error.message } };
        }
        return { status: 500, body: { message: "Internal Server Error" } };
        
    }
}
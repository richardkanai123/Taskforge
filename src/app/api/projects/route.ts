// get all projects
import { prisma } from "@/lib/Prisma";
import { NewProjectSchema } from "@/lib/schemas/project";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const projects = await prisma.project.findMany();
        if (!projects || projects.length === 0) {
            return NextResponse.json({ message: "No projects found" }, {status: 404});
        }

        return NextResponse.json(projects, {status: 200});
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({ message: error.message }, {status: 500});
        }
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500});
    }
}


// create new project

export async function POST(request: NextRequest) { 
    try {
        
        const body = await request.json();

        // validate the request body
        const isValidProjectData = NewProjectSchema.safeParse(body);

        if (!isValidProjectData.success) { 
            return NextResponse.json(
                { message: `Invalid project data`, errors: isValidProjectData.error.errors },
                { status: 406 }
            );
        }

        const newProject = await prisma.project.create({
            data: {
                title: isValidProjectData.data.title,
                description: isValidProjectData.data.description,
                status: isValidProjectData.data.status,
                dueDate: isValidProjectData.data.dueDate,
                creatorId: isValidProjectData.data.creatorId,
                leadId: isValidProjectData.data.leadId as string,
                customerId: isValidProjectData.data.customerId as string,
                githubRepo: isValidProjectData.data.githubRepo,
            }, select: {
                title: true,
                status: true,
                id: true,
            }
        }
        );

        if (!newProject) {
            return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
        }

         revalidatePath('/dashboard')
                revalidatePath('/dashboard/projects')

        return NextResponse.json(newProject, { status: 201 });

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({ message: error.message }, {status: 500});
        }
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500});
    }
}
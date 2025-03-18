import { prisma } from "@/lib/Prisma";
import { NewTaskSchema } from "@/lib/schemas/task";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

// get task by id
export async function GET(request: NextRequest, { params }: { params: Params }) {

    const { id } =await params;
    try {
        const task = await prisma.task.findUnique({
            where: {
            id: id as string,
            },
            include: {
                assignedTo: {
                    select: {
                        username: true,
                        email: true,
                    },
                },
            }
        });

        if (!task) {
            return NextResponse.json({ message: "Task not found!" }, { status: 404 });
        }
        return NextResponse.json({task}, { status: 200 });
    
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


// update project by id
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
    const { id } =await params;
    
    // validate request body
    const body = await request.json();
    try {
    
    const isValid = NewTaskSchema.safeParse(body);
    if (!isValid.success) { 
        return NextResponse.json({ message: isValid.error.errors }, { status: 400 });
    }
    
    const { title, description, status, priority, progress, dueDate, projectId } = isValid.data;


        // check if task exists
        const taskExists = await prisma.task.findUnique({
            where: {
                id: id as string,
            },
            include: {
                project: {
                    select: {
                        creatorId: true,
                        leadId: true,
                    },
                    include: {
                        creator: {
                            select: {
                                id: true,
                            },
                        }, 
                        lead: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
            })

        if (!taskExists) { 
            return NextResponse.json({ message: "Task not found!" }, { status: 404 });
        }

        if (taskExists.projectId !== projectId) {
            return NextResponse.json({ message: "Task does not belong to the project!" }, { status: 404 });
        }

        // // check the owner of the task
        // if (taskExists. !== owner || taskExists.project.creatorId !== owner || taskExists.project.leadId !== owner) {
        //     return NextResponse.json({ message: "You are not authorized to update this task!" }, { status: 401 });
        // }

        // update the task
        const task = await prisma.task.update({
            where: {
                id: id as string,
            },
            data: {
                title,
                description,
                status,
                priority,
                progress,
                dueDate
            },
        });

        return NextResponse.json({ task }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

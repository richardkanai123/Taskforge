// create new task

import { prisma } from "@/lib/Prisma";
import { NewTaskSchema } from "@/lib/schemas/task";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) { 
    const body = await request.json();

    try {
    // validate the request body

        const isValidTaskData = NewTaskSchema.safeParse(body);

    if (!isValidTaskData.success) { 
        return NextResponse.json(
            { message: `Invalid task data`, errors: isValidTaskData.error.errors },
            { status: 406 }
        );
    }

    const newTask = await prisma.task.create({
        data: {
            title: isValidTaskData.data.title,
            description: isValidTaskData.data.description,
            projectId: isValidTaskData.data.projectId,
            assignedId: isValidTaskData.data.assignedId,
            status: isValidTaskData.data.status,
            dueDate: isValidTaskData.data.dueDate,
            priority: isValidTaskData.data.priority,
        }, select: {
            title: true,
            status: true,
        }
    }
    );

        revalidatePath('/dashboard')
        revalidatePath('/dashboard/tasks')

        return NextResponse.json(newTask, { status: 201 });
        
    } catch (error) {

        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}
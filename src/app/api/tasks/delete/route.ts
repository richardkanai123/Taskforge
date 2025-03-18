// delete a task from the database

import { prisma } from "@/lib/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    const { id } =await params;
    try {
        const task = await prisma.task.delete({
            where: {
                id: id,
            }
        });

        if (!task) {
            return NextResponse.json({ message: "Task not found!" }, { status: 404 });
        }
        return NextResponse.json(task, { status: 200 });
    
    } catch (error) {
        if (error instanceof Error) {
             return NextResponse.json({ message: error.message }, { status: 404 });
        }
         return NextResponse.json({ message: "Internal server error" }, { status: 404 });
    }
}
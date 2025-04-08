// fetch projects from the database for the current user
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/Prisma";
// import { TaskStatus } from "@/lib/types";
import { TaskStatus } from "@prisma/client";

function FormatStatus(status: string) {
    switch (status) {
        case "in_progress":
            return TaskStatus.IN_PROGRESS;
        case "completed":
            return TaskStatus.COMPLETED;
        default:
            return TaskStatus.OPEN;
    }
}

export async function GET(request: NextRequest) {
	try {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		// get params form request url
		const searchParams = request.nextUrl.searchParams;
		const  searchstatus = searchParams.get("status")

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        if (!searchstatus) {
            // search for all tasks
            const usertasks = await prisma.task.findMany({
                where: {
                    assignedId: session.user.id,

                },
                include: {
                    project: {
                        select: {
                            title: true,
                            id: true
                      }
                  }  
                },
                orderBy: {
                    dueDate: "desc",
                },
            });
            return NextResponse.json(usertasks, { status: 200 });
        }

		// fetch projects from the database for the current user
		const usertasks = await prisma.task.findMany({
			where: {
                assignedId: session.user.id,
                status: FormatStatus(searchstatus)
            },
            include: {
                    project: {
                        select: {
                            title: true,
                            id: true
                      }
                  }  
                },
			orderBy: {
				dueDate: "desc",
			},
		});

		return NextResponse.json(usertasks, { status: 200 });
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

// fetch projects from the database for the current user
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/Prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // fetch projects from the database for the current user
        const projects = await prisma.project.findMany({
            where: {
                creatorId: session.user.id,
            },
            include: {
                members: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
                customer: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                lead: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        progress: true,
                        assignedTo: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                dueDate: "desc",
            }
        });

        const calculateProjectProgress = (project: { tasks: { progress?: number }[] }) => {
            const totalTasks = project.tasks.length;
            const TotalProgress = project.tasks.reduce(
            (acc, task) => acc + (task.progress || 0),
            0
            );
            return totalTasks === 0 ? 0 : (TotalProgress / totalTasks);
        };

        // calculate progress for each project
        const projectsWithProgress = projects.map((project) => ({
            ...project,
            progress: calculateProjectProgress(project)
        }));

        return NextResponse.json(projectsWithProgress, { status: 200 });
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

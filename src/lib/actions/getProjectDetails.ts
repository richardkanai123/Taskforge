import { headers } from "next/headers"
import { auth } from "../auth"
import { Project } from "@prisma/client"
// gets tasks of a project by project id
export async function getTasksByProjectId(projectId: string): Promise<{
    project: Project | null;
    message: string;
    status: number;
}> {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        
        if (!session?.user?.id) {
            return {
                project: null,
                message: "Unauthorized",
                status: 401,
            }
        }
        
        const response = await fetch(`${process.env.BASE_URL}/api/projects/${projectId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': (await headers()).get('cookie') || '',
            },
        })
        const resData = await response.json()
        if (response.status !== 200) {
            return {
                project: null,
                message: resData.message as string || "Error fetching project",
                status: response.status,
            }
        }   

        if (!resData) {
            return {
                project: null,
                message: "No project found",
                status: 404,
            }
        }

        return {
            project: resData,
            message: "Success",
            status: 200,
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                project: null,
                message: error.message,
                status: 500,
            }
        }

        return {
            project: null,
            message: "Something went wrong",
            status: 500,
        }
    }
}
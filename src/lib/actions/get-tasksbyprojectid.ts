import { headers } from "next/headers"
import { auth } from "../auth"
import { Task } from "@prisma/client"
// gets tasks of a project by project id
export async function getTasksByProjectId(projectId: string): Promise<{
    tasks: Task[] | null;
    message: string;
    status: number;
}> {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        
        if (!session?.user?.id) {
            return {
                tasks: null,
                message: "Unauthorized",
                status: 401,
            }
        }
        
        const response = await fetch(`${process.env.BASE_URL}/api/projects/${projectId}/getprojecttasks`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': (await headers()).get('cookie') || '',
            },
        })
        const resData = await response.json()
        if (response.status !== 200) {
            return {
                tasks: null,
                message: resData.message as string || "Error fetching tasks",
                status: response.status,
            }
        }   

       if(resData.length > 0) {
            return {
                tasks: resData,
                message: "Tasks fetched successfully",
                status: 200,
            }
       } else {
            return {
                tasks: null,
                message: "No tasks found",
                status: 200,
            }
       }
    } catch (error) {
        if (error instanceof Error) {
            return {
                tasks: null,
                message: error.message,
                status: 500,
            }
        }

        return {
            tasks: null,
            message: "Something went wrong",
            status: 500,
        }
    }
}
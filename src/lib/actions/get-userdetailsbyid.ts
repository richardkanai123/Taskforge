// gets user detail given user id

import { headers } from "next/headers"
import { auth } from "../auth"
import { prisma } from "../Prisma";
// gets tasks of a project by project id

interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    image: string | null;
}
export async function getUserdetails(userid: string): Promise<{
    user: User | null;
    message: string;
    status: number;
}> {
    try {
     const session = await auth.api.getSession({
            headers: await headers()
        })
        
        if (!session?.user?.id) {
            return {
                user: null,
                message: "Unauthorized",
                status: 401,
            }
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userid,
            },
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                image: true,
            }
        })
        
        if (!user) {
            return {
                user: null,
                message: "User not found",
                status: 404,
            }
        }
        
        return {
            user,
            message: "User found",
            status: 200,
        }

    
    } catch (error) {
        if (error instanceof Error) {
            return {
                user: null,
                message: error.message,
                status: 500,
            }
        }

        return {
            user: null,
            message: "Something went wrong",
            status: 500,
        }
    }
}
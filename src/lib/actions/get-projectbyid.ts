import { headers } from "next/headers"
import { auth } from "../auth"
import { Project } from "@prisma/client";

export async function GetProjectById(id:string): Promise<{
    project: Project | null
    message: string;
    status: number;
}> {
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
  
  const response = await fetch(`${process.env.BASE_URL}/api/projects/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': (await headers()).get('cookie') || '',
    },
  })
  const resData = await response.json()
  if (response.status !== 200) {
    return {
      project: null,
      message: resData.message as string || "Error fetching projects",
      status: response.status,
    }
  }

  return {
    project: resData,
    message: "Projects fetched successfully",
    status: response.status,
  }
  
}
import { headers } from "next/headers"
import { auth } from "../auth"
import { ProjectWithDetails } from "../types";

export async function getUserProjects(): Promise<{
    projects: ProjectWithDetails[] | null;
    message: string;
    status: number;
}> {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if (!session?.user?.id) {
    return {
      projects: null,
      message: "Unauthorized",
      status: 401,
    }
  }
  
  const response = await fetch(`${process.env.BASE_URL}/api/projects/getuserprojects`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': (await headers()).get('cookie') || '',
    },
  })
  const resData = await response.json()
  if (response.status !== 200) {
    return {
      projects: null,
      message: resData.message as string || "Error fetching projects",
      status: response.status,
    }
  }

  return {
    projects: resData,
    message: "Projects fetched successfully",
    status: response.status,
  }
  
}
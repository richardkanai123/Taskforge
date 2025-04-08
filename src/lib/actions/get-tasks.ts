
import { headers } from "next/headers"
import { auth } from "../auth"
import {  TaskWithProject } from "../types";

export async function getUserTasks(): Promise<{
    tasks: TaskWithProject[] | null;
    message: string;
    status: number;
}> {
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
  
  const response = await fetch(`${process.env.BASE_URL}/api/tasks/getusertasks`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': (await headers()).get('cookie') || '',
    },
  })
  const resData = await response.json()
  if (response.status !== 200) {
    return {
      tasks: null,
      message: resData.message as string || "Error fetching projects",
      status: response.status,
    }
  }

  return {
    tasks: resData,
    message: "Task fetched successfully",
    status: response.status,
  }
  
}
import { auth } from "@/lib/auth";
import { Task } from "@prisma/client";
import { headers } from "next/headers";


export const GetTaskById = async (taskId: string): Promise<{
    task: Task | null;
    message: string;
    status: number;
}> => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return {
			task: null,
			message: "Unauthorized",
			status: 401,
		};
    }
    

	const res = await fetch(
		`${process.env.BASE_URL}/api/tasks/${taskId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': (await headers()).get('cookie') || '',
            },
        }
	);
    const data = await res.json();


	if (res.status !== 200) {
		return {
			task: null,
			message: (data.message as string) || "Error fetching task",
			status: res.status,
		};
	}

	return {
		task: data,
		message: "Task fetched successfully",
		status: res.status,
    };
    
};

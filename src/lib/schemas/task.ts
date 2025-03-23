import { z } from "zod";

enum TASK_STATUS {
	OPEN = "OPEN",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED"
}

enum PRIORITY {
	L1 = "L1",
	L2 = "L2",
	L3 = "L3",
	L4 = "L4",
	L5 = "L5"
}

export const NewTaskSchema = z.object({
	title: z.string().min(1, "Task title is required"),
	description: z.string(),
	projectId: z.string(),
	assignedId: z.string().optional(),
	status: z.nativeEnum(TASK_STATUS).default(TASK_STATUS.OPEN),
	dueDate: z.coerce.date(),
	priority: z.nativeEnum(PRIORITY),
	progress: z.number().min(0).max(100).default(0),
});

export { TASK_STATUS, PRIORITY };
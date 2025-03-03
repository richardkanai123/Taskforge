import { z } from "zod";

export const NewTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
    projectId: z.string().cuid(),
    owner: z.string().cuid(),
  dueDate: z.date(),
  priority: z.string().min(1, "Priority is required"),
  progress: z.number().min(0).max(100).default(0),
});
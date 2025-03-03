import { z } from 'zod';

export const NewProjectSchema = z.object({
    title: z.string().min(5, "Project title is required"),
    description: z.string().optional(),
    dueDate: z.date().min(new Date(), "Due date must be in the future"),
    priority: z.string().min(1, "Priority is required"),
    status: z.enum(["OPEN", "COMPLETED", "INPROGRESS"]).default("OPEN"),
    userId: z.string().cuid(),
})
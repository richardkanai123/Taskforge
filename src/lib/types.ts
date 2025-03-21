// lib/types.ts
export type ProjectStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";
export type TaskStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";
export type Priority = "L1" | "L2" | "L3" | "L4" | "L5";

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date;
}

export interface ProjectWithTasks {
  title: string;
  description: string;
  status: ProjectStatus;
  dueDate: Date;
  tasks: Task[];
}

// lib/validations.ts
import { z } from "zod";

export const projectFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]),
  dueDate: z.date().min(new Date(), "Due date must be in the future"),
});

export const taskFormSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be less than 500 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["L1", "L2", "L3", "L4", "L5"]),
  dueDate: z.date(),
});

export const tasksFormSchema = z.object({
  tasks: z.array(taskFormSchema).min(1, "Add at least one task"),
});
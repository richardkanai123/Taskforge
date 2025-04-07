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
	githubRepo?: string;
	tasks: Task[];
}

import { z } from "zod";

export const projectFormSchema = z.object({
	title: z
		.string()
		.min(3, "Title must be at least 3 characters")
		.max(100, "Title must be less than 100 characters"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters")
		.max(1000, "Description must be less than 1000 characters"),
	status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]),
	dueDate: z.date().min(new Date(), "Due date must be in the future"),
	githubRepo: z.union([
		z.string().url("Please enter a valid URL"),
		z.string().length(0),
		z.string().optional(),
	]),
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

// projects with details

export interface ProjectWithDetails {
  id: string;
  progress?: number;
  creatorId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  leadId: string | null;
  customerId: string | null;
  githubRepo?: string;
	members: {
		id: string;
		name: string | null;
		email: string;
	}[];
	customer: {
		id: string;
		name: string;
	} | null;
	lead: {
		id: string;
		name: string | null;
	} | null;
	tasks: {
		id: string;
		title: string;
		status: TaskStatus;
    progress: number;
		assignedTo: {
			id: string;
			name: string | null;
		} | null;
	}[];
}

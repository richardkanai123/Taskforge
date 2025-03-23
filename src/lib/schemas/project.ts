import { z } from "zod";

export const NewProjectSchema = z.object({
	dueDate: z.coerce.date().min(new Date(), "Due date must be in the future"),
	title: z.string().min(1, "Project title is required"),
	description: z.string(),
	status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).default("OPEN"),
	creatorId: z.string(), // Required: Creator cannot be null
	leadId: z.string().optional(), // Lead is optional and can be changed
	customerId: z.string().optional(),
	githubRepo: z.string().url().optional(),
});



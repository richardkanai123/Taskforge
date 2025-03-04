import { z } from 'zod';

export const NewProjectSchema = z.object({
    dueDate: z.date().min(new Date(), "Due date must be in the future"),
    title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).default("OPEN"),
  creatorId: z.string().cuid(), // Required: Creator cannot be null
  leadId: z.string().cuid().nullable().optional(), // Lead is optional and can be changed
  customerId: z.string().cuid().nullable().optional(),
})
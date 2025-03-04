import { z } from "zod";


const Priority = {
  L1: 1,
  L2: 2,
  L3: 3,
  L4: 4,
  L5: 5,
};



 const ProjectSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).default("OPEN"),
  creatorId: z.string().cuid(), // Required: Creator cannot be null
  leadId: z.string().cuid().nullable().optional(), // Lead is optional and can be changed
  customerId: z.string().cuid().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export { Priority, ProjectSchema };
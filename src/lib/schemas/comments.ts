import { z } from "zod";

export const NewCommentSchema = z.object({
  content: z.string().min(1, "Comment text is required"),
  taskId: z.string().cuid(),
  writerid: z.string().cuid(),
});
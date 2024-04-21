import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(3, "Text is required").max(255),
});

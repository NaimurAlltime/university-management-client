import { z } from "zod";

export const categorySchema = z.object({
  name: z.string({ required_error: "Category name feild is required" }),
});

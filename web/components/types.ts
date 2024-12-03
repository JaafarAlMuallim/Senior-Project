import { Grade } from "@/models/grades";
import { z } from "zod";

export const formSchema = z.object({
  course: z.string(),
  grade: z.nativeEnum(Grade),
  checkbox: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>; 
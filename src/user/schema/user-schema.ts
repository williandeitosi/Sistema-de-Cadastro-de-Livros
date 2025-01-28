import { string, z } from "zod";

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(4, "Mínimo 4 caracteres").email(),
  password: string().min(4, "Mínimo 4 caracteres"),
});

export type UsersTypes = z.infer<typeof userSchema>;

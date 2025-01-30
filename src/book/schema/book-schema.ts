import z from "zod";

export const bookSchema = z.object({
  title: z.string(),
  author: z.string().min(3, "Mínimo 3 caracteres"),
  publicationYear: z.coerce
    .number()
    .int()
    .gte(1000, { message: "Ano deve ter 4 dígitos" })
    .lte(9999, { message: "Ano deve ter no máximo 4 dígitos" }),
  status: z.enum(["read", "unread"]),
});

export type BookType = z.infer<typeof bookSchema>;

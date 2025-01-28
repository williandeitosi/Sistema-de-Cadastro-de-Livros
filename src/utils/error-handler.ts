import { ZodError } from "zod";

export async function ErrorHandler(error: any, res: any) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  if (error instanceof Error) {
    return res.status(400).json({
      message: error.message,
    });
  }
  return res.status(500).json({ message: "Erro interno do servidor" });
}

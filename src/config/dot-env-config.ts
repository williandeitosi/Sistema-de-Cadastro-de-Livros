import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.coerce.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "⚠️ Configuração inválida para as variáveis de ambiente:",
    _env.error.format()
  );
  process.exit(1);
}

export const env = _env.data;

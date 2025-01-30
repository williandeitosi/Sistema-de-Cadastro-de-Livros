import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../../prisma/db";
import { env } from "../../config/dot-env-config";
import type { LoginTypes, UsersTypes } from "../schema/user-schema";

export class UserService {
  private async findByEmail(email: string) {
    return await db.user.findUnique({ where: { email } });
  }

  async createUser({ name, email, password }: UsersTypes) {
    const isExists = await this.findByEmail(email);

    if (isExists) {
      throw new Error("Usuário ja existe");
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = await db.user.create({
      data: { name, email, password: hashPassword },
    });
    const { password: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async loginUser({ email, password }: LoginTypes) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não existe");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });

    return { user: payload, token };
  }
}

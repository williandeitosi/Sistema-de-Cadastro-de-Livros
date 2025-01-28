import bcrypt from "bcrypt";
import { db } from "../../../prisma/db";
import type { UsersTypes } from "../schema/user-schema";

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
}

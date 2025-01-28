import { Request, Response } from "express";
import { ErrorHandler } from "../../utils/error-handler";
import { userSchema } from "../schema/user-schema";
import type { UserService } from "../services";

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const parsedData = userSchema.parse(req.body);

      const { name, email, password } = parsedData;
      const user = await this.userService.createUser({ name, email, password });

      res.status(201).json({ user });
    } catch (error) {
      ErrorHandler(error, res);
    }
  }
}

import { Request, Response } from "express";
import { ErrorHandler } from "../../utils/error-handler";
import { loginSchema, userSchema } from "../schema/user-schema";
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

  async login(req: Request, res: Response) {
    try {
      const parseData = loginSchema.parse(req.body);
      const { email, password } = parseData;

      const { token, user } = await this.userService.loginUser({
        email,
        password,
      });

      res.status(200).json({ message: "Login is successfully!", token, user });
    } catch (error) {
      ErrorHandler(error, res);
    }
  }
}

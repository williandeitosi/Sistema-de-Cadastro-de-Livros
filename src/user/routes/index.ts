import type { Application } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";

const userService = new UserService();
const userController = new UserController(userService);

const userRoutes = (app: Application) => {
  app.post("/register", (req, res) => {
    userController.register(req, res);
  });
  app.post("/login", (req, res) => {
    userController.login(req, res);
  });
};

export default userRoutes;

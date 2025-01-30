import type { Application } from "express";
import bookRoutes from "./book/routes";
import userRoutes from "./user/routes";

const setupRoutes = (app: Application) => {
  userRoutes(app);
  bookRoutes(app);
};

export default setupRoutes;

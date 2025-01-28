import express from "express";
import { env } from "./config/dot-env-config";
import setupRoutes from "./routes";
const port = env.PORT || 3333;
const app = express();
app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is Running on port: ${port}`);
});

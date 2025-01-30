import type { Application } from "express";
import { BookController } from "../controllers";
import { BookService } from "../services";

const bookService = new BookService();
const bookController = new BookController(bookService);

const bookRoutes = (app: Application) => {
  app.post("/newbook", (req, res) => {
    bookController.create(req, res);
  });

  app.get("/allbooks", (req, res) => {
    bookController.getAll(req, res);
  });

  app.get("/book", (req, res) => {
    bookController.getBook(req, res);
  });

  app.delete("/book/:id", (req, res) => {
    bookController.deleteBook(req, res);
  });
};

export default bookRoutes;

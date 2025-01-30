import { Request, Response } from "express";
import { ErrorHandler } from "../../utils/error-handler";
import { bookSchema } from "../schema/book-schema";
import { BookService } from "../services";

export class BookController {
  constructor(private bookService: BookService) {}

  async create(req: Request, res: Response) {
    try {
      const parseData = bookSchema.parse(req.body);
      const { title, author, publicationYear, status } = parseData;

      const book = await this.bookService.createBook({
        title,
        author,
        publicationYear,
        status,
      });

      return res.status(201).json({ book: book });
    } catch (error) {
      ErrorHandler(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const allBooks = await this.bookService.getAllBooks();

      return res.status(200).json({
        allBooks,
      });
    } catch (error) {
      ErrorHandler(error, res);
    }
  }

  async getBook(req: Request, res: Response) {
    try {
      const { title } = req.query;
      if (!title) {
        return res.status(400).json({ message: "Title not found" });
      }

      const getBook = await this.bookService.getBook(title as string);

      if (!getBook) {
        return res.status(400).json({ message: "Book not found" });
      }

      res.status(200).json({ book: getBook });
    } catch (error) {
      ErrorHandler(error, res);
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bookId = Number(id);

      if (!bookId) {
        return res.status(400).json({ message: "Book not found" });
      }

      await this.bookService.delete(bookId);
      return res.status(200).json({ message: "Book Deleted Successfully!" });
    } catch (error) {
      ErrorHandler(error, res);
    }
  }
}

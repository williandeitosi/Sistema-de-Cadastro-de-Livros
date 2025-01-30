import { db } from "../../../prisma/db";
import type { BookType } from "../schema/book-schema";

export class BookService {
  private async bookExists(title: string): Promise<boolean> {
    const book = await db.book.findFirst({ where: { title } });
    return !!book;
  }

  async createBook({ title, author, publicationYear, status }: BookType) {
    if (await this.bookExists(title)) {
      throw new Error("The book already exists");
    }

    const newbook = await db.book.create({
      data: { title, author, publicationYear, status },
    });

    return newbook;
  }

  async getAllBooks() {
    return await db.book.findMany();
  }

  async getBook(title: string) {
    if (!(await this.bookExists(title))) {
      throw new Error("Book not found");
    }

    return await db.book.findFirst({ where: { title } });
  }

  async delete(id: number) {
    const isExists = await db.book.findUnique({ where: { id } });

    if (!isExists) {
      throw new Error("Book not found");
    }

    await db.book.delete({ where: { id } });
  }
}

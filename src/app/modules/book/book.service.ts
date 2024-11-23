import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (book: IBook) => {
  const result = await Book.create(book);

  return result;
};

export const BookServices = {
  createBook,
};

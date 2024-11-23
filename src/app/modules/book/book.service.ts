import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (book: IBook) => {
  const result = await Book.create(book);
  return result;
};

const getAllBooks = async (searchTerm: string) => {
  console.log(searchTerm);
  let result;
  if (searchTerm) {
    result = await Book.find({
      $or: [
        { title: { $eq: searchTerm } },
        { author: { $eq: searchTerm } },
        { category: { $eq: searchTerm } },
      ],
    });
  } else {
    result = await Book.find({});
  }

  return result;
};

export const BookServices = {
  createBook,
  getAllBooks,
};

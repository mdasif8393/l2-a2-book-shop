import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (book: IBook) => {
  const result = await Book.create(book);
  return result;
};

const getAllBooks = async (searchTerm: string) => {
  let result;
  if (searchTerm) {
    // use $or operator to search in every field
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

const getBookById = async (_id: string) => {
  const result = await Book.findById({ _id });

  return result;
};

const updateABook = async (_id: string, book: Partial<IBook>) => {
  console.log();
  const result = await Book.findOneAndUpdate({ _id }, book);

  return result;
};

const deleteABook = async (productId: string) => {
  const result = await Book.findOneAndDelete({ _id: productId });
  return result;
};

export const BookServices = {
  createBook,
  getAllBooks,
  getBookById,
  updateABook,
  deleteABook,
};

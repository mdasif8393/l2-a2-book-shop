import { Request, Response } from "express";
import { BookServices } from "./book.service";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;

    const result = await BookServices.createBook(book);

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await BookServices.getAllBooks(searchTerm as string);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.sendStatus(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
};

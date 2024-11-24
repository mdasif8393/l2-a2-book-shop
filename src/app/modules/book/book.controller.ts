import { Request, Response } from "express";
import { BookServices } from "./book.service";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;

    const result = await BookServices.createBook(book);

    res.status(200).json({
      status: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
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
      status: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.sendStatus(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await BookServices.getBookById(productId);
    res.status(200).json({
      status: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const updateABook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const { productId } = req.params;

    const result = await BookServices.updateABook(productId, book);
    res.status(200).json({
      status: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const deleteABook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await BookServices.deleteABook(productId);
    res.status(200).json({
      status: true,
      message: "Book deleted successfully",
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
  getBookById,
  updateABook,
  deleteABook,
};

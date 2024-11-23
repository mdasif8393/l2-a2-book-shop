import express from "express";
import { BookControllers } from "./book.controller";

const router = express.Router();

router.post("/products", BookControllers.createBook);
router.get("/products", BookControllers.getAllBooks);
router.get("/products/:productId", BookControllers.getBookById);

export const BookRoutes = router;

import express from "express";
import { BookControllers } from "./book.controller";

const router = express.Router();

router.post("/products", BookControllers.createBook);
router.get("/products", BookControllers.getAllBooks);

export const BookRoutes = router;

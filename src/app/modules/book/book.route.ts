import express from "express";
import { BookControllers } from "./book.controller";

const router = express.Router();

router.post("/products", BookControllers.createBook);
router.get("/products", BookControllers.getAllBooks);
router.get("/products/:productId", BookControllers.getBookById);
router.put("/products/:productId", BookControllers.updateABook);
router.delete("/products/:productId", BookControllers.deleteABook);

export const BookRoutes = router;

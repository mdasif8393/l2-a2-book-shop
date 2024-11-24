import express from "express";
import { BookControllers } from "./book.controller";

const router = express.Router();

router.post("/", BookControllers.createBook);
router.get("/", BookControllers.getAllBooks);
router.get("/:productId", BookControllers.getBookById);
router.put("/:productId", BookControllers.updateABook);
router.delete("/:productId", BookControllers.deleteABook);

export const BookRoutes = router;

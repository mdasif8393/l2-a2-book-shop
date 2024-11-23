import express from "express";
import { BookControllers } from "./book.controller";

const router = express.Router();

router.post("/products", BookControllers.createBook);

export const BookRoutes = router;

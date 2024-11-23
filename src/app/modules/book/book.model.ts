import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: ["Fiction", "Poetry", "Religious", "Science", "SelfDevelopment"],
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

export const Book = model<IBook>("Book", bookSchema);

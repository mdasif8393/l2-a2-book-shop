import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Fiction", "Poetry", "Religious", "Science", "SelfDevelopment"],
    },
    description: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", bookSchema);

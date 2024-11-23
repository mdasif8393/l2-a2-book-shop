import { Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

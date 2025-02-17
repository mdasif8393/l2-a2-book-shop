import { model, Schema } from "mongoose";
import { IOrder, OrderModel } from "./order.interface";

const productSchema = [{ product: String, quantity: Number }];

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    products: productSchema,
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder, OrderModel>("Order", orderSchema);

import { model, Schema } from "mongoose";
import { Book } from "../book/book.model";
import { IOrder, OrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder, OrderModel>({
  email: { type: String, required: true },
  product: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

orderSchema.statics.isProductExists = async function (orderData: IOrder) {
  // update product inStock field false if quantity <= 0
  await Book.updateMany(
    {
      stockQuantity: { $lte: 0 },
    },
    {
      inStock: false,
    }
  );
  // if product not found in database throw error
  if (
    !(await Book.findOne({
      _id: orderData.product,
    }))
  ) {
    throw new Error("Order not found");
  } else if (
    !(await Book.findOne({
      _id: orderData.product,
      stockQuantity: { $gte: orderData.stockQuantity },
    }))
  ) {
    throw new Error("Insufficient stockQuantity available in inventory");
  }

  // decrease product quantity
  else {
    const existingProduct = await Book.findOneAndUpdate(
      {
        $and: [
          { _id: orderData.product },
          { stockQuantity: { $gt: 0 } },
          { stockQuantity: { $gte: orderData.stockQuantity } },
        ],
      },
      { $inc: { stockQuantity: -orderData.stockQuantity } }
    );
    return existingProduct;
  }
};

export const Order = model<IOrder, OrderModel>("Order", orderSchema);

import { Model } from "mongoose";

export interface IOrder {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
}

export interface OrderModel extends Model<IOrder> {
  isProductExists(productId: string): Promise<any>;
}

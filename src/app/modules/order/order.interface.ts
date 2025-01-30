import { Model } from "mongoose";

export interface IOrder {
  name: string;
  email: string;
  address: string;
  contactNumber: string;
  products: [{ product: string; quantity: number }];
  totalPrice: number;
  status: string;
}

export interface OrderModel extends Model<IOrder> {
  isProductExists(productId: string): Promise<any>;
}

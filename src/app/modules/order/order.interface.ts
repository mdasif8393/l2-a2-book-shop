import { Model } from "mongoose";

export interface IOrder {
  name: string;
  email: string;
  address: string;
  contactNumber: string;
  products: [{ product: string; quantity: number }];
  totalPrice: number;
  status: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}

export interface OrderModel extends Model<IOrder> {
  isProductExists(productId: string): Promise<any>;
}

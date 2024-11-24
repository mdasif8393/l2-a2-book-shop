import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: IOrder) => {
  const productAvailability = await Order.isProductExists(order as any);
  if (!productAvailability) {
    throw new Error("Can not create order");
  }
  const result = await Order.create(order);
  return result;
};

const calculateRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);
  return result[0].totalRevenue;
};

export const OrderServices = {
  createOrder,
  calculateRevenue,
};

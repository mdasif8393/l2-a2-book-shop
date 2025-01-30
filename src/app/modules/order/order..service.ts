import QueryBuilder from "../../builder/QueryBuilder";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: IOrder) => {
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

const getAllOrders = async (query: Record<string, unknown>) => {
  const ordersQuery = new QueryBuilder(Order.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ordersQuery.modelQuery;
  const meta = await ordersQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getOrderById = async (_id: string) => {
  const result = await Order.findById({ _id });

  return result;
};

const updateAOrder = async (_id: string, order: Partial<IOrder>) => {
  const result = await Order.findOneAndUpdate({ _id }, order);

  return result;
};

const deleteAOrder = async (productId: string) => {
  const result = await Order.findOneAndDelete({ _id: productId });
  return result;
};

export const OrderServices = {
  createOrder,
  calculateRevenue,
  getAllOrders,
  getOrderById,
  updateAOrder,
  deleteAOrder,
};

import QueryBuilder from "../../builder/QueryBuilder";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { orderUtils } from "./order.utils";

const createOrder = async (payload: IOrder) => {
  let order = await Order.create(payload);

  const shurjopayPayload = {
    amount: payload?.totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: payload?.name,
    customer_address: payload?.address,
    customer_email: payload?.email,
    customer_phone: payload.contactNumber,
    customer_city: "Dhaka",
    client_ip: "192.168.1.10",
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
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

const getUserOrder = async (email: string) => {
  const result = await Order.find({ email: email });
  return result;
};

export const OrderServices = {
  createOrder,
  verifyPayment,
  calculateRevenue,
  getAllOrders,
  getOrderById,
  updateAOrder,
  deleteAOrder,
  getUserOrder,
};

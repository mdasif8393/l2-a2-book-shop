import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrder(order);

    res.status(200).json({
      status: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const verifyPayment = catchAsync(async (req, res) => {
  try {
    const order = await OrderServices.verifyPayment(
      req.query.order_id as string
    );

    res.status(200).json({
      status: true,
      message: "Order verified successfully",
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
});

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateRevenue();

    res.status(200).json({
      status: true,
      message: "Revenue calculated successfully",
      data: {
        totalRevenue: result,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrders(req.query);
    res.status(200).json({
      status: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.sendStatus(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await OrderServices.getOrderById(productId);
    res.status(200).json({
      status: true,
      message: "Order retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const updateAOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const { productId } = req.params;

    const result = await OrderServices.updateAOrder(productId, order);
    res.status(200).json({
      status: true,
      message: "Order updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const deleteAOrder = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await OrderServices.deleteAOrder(productId);
    res.status(200).json({
      status: true,
      message: "Order deleted successfully",
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const result = await OrderServices.getUserOrder(email);
    res.status(200).json({
      status: true,
      message: "User Orders Retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  verifyPayment,
  calculateRevenue,
  getAllOrders,
  getOrderById,
  updateAOrder,
  deleteAOrder,
  getUserOrder,
};

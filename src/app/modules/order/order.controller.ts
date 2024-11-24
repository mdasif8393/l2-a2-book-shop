import { Request, Response } from "express";
import { OrderServices } from "./order..service";

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

export const OrderControllers = {
  createOrder,
  calculateRevenue,
};

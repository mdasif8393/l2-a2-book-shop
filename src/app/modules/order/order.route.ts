import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.get("/verify", OrderControllers.verifyPayment);

router.post("/", OrderControllers.createOrder);
router.get("/revenue", OrderControllers.calculateRevenue);
router.get("/user-order/:email", OrderControllers.getUserOrder);
router.get("/", OrderControllers.getAllOrders);
router.get("/:productId", OrderControllers.getOrderById);
router.put("/:productId", OrderControllers.updateAOrder);

router.delete("/:productId", OrderControllers.deleteAOrder);

export const OrderRoutes = router;

import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import { BlockUserRoute } from "./app/modules/BlockUserByAdmin/blockUserByAdmin.route";
import { BookRoutes } from "./app/modules/book/book.route";
import { OrderRoutes } from "./app/modules/order/order.route";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// router
app.use("/api/products", BookRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/auth", UserRoutes);
app.use("/api/admin/users", BlockUserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Book Shop is running");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

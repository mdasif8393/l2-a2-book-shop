import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import { BookRoutes } from "./app/modules/book/book.route";
import { OrderRoutes } from "./app/modules/order/order.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// router
app.use("/api/products", BookRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Book Shop is running");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

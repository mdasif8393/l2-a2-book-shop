import cors from "cors";
import express, { Application, Request, Response } from "express";
import { BookRoutes } from "./app/modules/book/book.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// router
app.use("/api", BookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Book Shop is running");
});

export default app;

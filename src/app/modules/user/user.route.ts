import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/register", UserControllers.createUser);

router.post("/login", UserControllers.loginUser);

router.get("/users", UserControllers.getUsers);

export const UserRoutes = router;

import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/register", UserControllers.createUser);

router.post("/login", UserControllers.loginUser);

// router.get("/user/:email", UserControllers.getUsers);

router.get("/users", UserControllers.getUsers);

router.put("/user/:userId", UserControllers.updateUser);

export const UserRoutes = router;

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      _id: result?._id,
      name: result?.name,
      email: result?.email,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful",
    data: {
      token: accessToken,
    },
  });
});

// const getSingleUser = catchAsync(async (req, res) => {
//   const { email } = req.params;
//   const result = await UserServices.getSingleUser(email);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User retrieved successfully",
//     data: result,
//   });
// });

const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = req.body;
  const { userId } = req.params;

  const result = await UserServices.updateUser(userId, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User info updated successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  // getSingleUser,
};

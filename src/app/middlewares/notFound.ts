/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
};

export default notFound;

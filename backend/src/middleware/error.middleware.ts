import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

// Define a custom error interface
interface CustomError extends Error {
  statusCode?: number;
  errors?: any;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(err.statusCode || 500)
    .json(new ApiError(err.statusCode || 500, err.message, err.errors));
};

export default errorMiddleware;

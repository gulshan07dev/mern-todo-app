import { Request, Response, NextFunction } from "express";

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
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    success: false,
    message: err.message,
    errors: err.errors,
  });
};

export default errorMiddleware;

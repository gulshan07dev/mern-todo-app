import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler =
  (reqHandler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));

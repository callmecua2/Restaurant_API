import { verifyToken } from "./webtoken";
import type { NextFunction, Request, Response } from "express";

export const userMiddlerware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.userLogin;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = decoded;
    console.log(req.user)

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

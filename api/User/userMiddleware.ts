import { verifyToken } from "../../lib/webtoken";
import type { NextFunction } from "express";

export const userMiddlerware = async (
  req: any,
  res: any,
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

import { verifyToken } from "../../lib/webtoken";
import type { NextFunction } from "express";

export const organizationMiddleware = async (
  req: any,
  res: any,
  next: NextFunction,
) => {
  try {
    console.log("middleware kena");
    const token = req.cookies.login_auth;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = verifyToken(token);

    if(!decoded) {
       return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.organization = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};


import type { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("userLogin", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout Success!",
  });
};



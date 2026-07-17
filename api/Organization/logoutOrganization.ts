import type { Request, Response } from "express";

export const logoutOrg = async (req: Request, res: Response) => {
  res.clearCookie("login_organization", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Log out Success",
  });
};

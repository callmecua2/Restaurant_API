import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { UserRole } from "@prisma/client";

interface Params {
  id: string;
}

export const getUserDetail = async (req: Request<Params>, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (!userId) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    if (Number.isNaN(userId) || userId <= 0) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const auth = req.user;

    const allowedRole: UserRole[] = [UserRole.OWNER, UserRole.MANAGER];

    if (!allowedRole.includes(auth.userRole)) {
      return res.status(403).json({
        message: "Unauthorized User Access",
      });
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: userId,
        OrganizationId: auth.organizationId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        status: true,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      message: "Success",
      data: findUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

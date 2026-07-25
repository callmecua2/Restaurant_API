import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { HashPassword, ComparePassword } from "../../encryption/encryption";

interface changePassword {
  currentPassword : string
  newPassword : string;
  confirmPassword : string
}

export const changePassword = async (req: Request<{}, {}, changePassword>, res: Response) => {
  try {
    const {currentPassword,  newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    if(currentPassword === newPassword) {
      return res.status(400).json({
        message  : "Password baru tidak boleh sama"
      })
    }

    if(newPassword.length < 8 || confirmPassword.length < 8) {
      return res.status(400).json({
        message : "Password not long enough"
      })
    }

    if(newPassword !== confirmPassword) {
      return res.status(400).json({
        message : "Bad Request"
      })
    }

    const auth = req.user;
    const id = auth.userId;
    const organizationId = auth.organizationId;

    const findUser = await prisma.user.findFirst({
      where: {
        id: id,
        OrganizationId: organizationId,
      },
    });

    if (!findUser) {
      return res.status(400).json({
        message: "Error : bad request",
      });
    }

    const compare = await ComparePassword(currentPassword, findUser.password)

    if(!compare) {
      return res.status(400).json({
        message : "Wrong Password"
      })
    }

    const hashPassword = await HashPassword(newPassword);

    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        password: hashPassword,
      },
    });

    return res.status(200).json({
      message: "Success change password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

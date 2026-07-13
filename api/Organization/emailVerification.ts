import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { verifyToken } from "../../lib/webtoken";

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
  return res.status(400).json({
    message: "OTP must be exactly 6 digits",
  });
}

    // check verification account cookies

    const accToken = req.cookies.verifyEmail;

    if (!accToken) {
      return res.status(400).json({
        message: "coookies verif kosong",
      });
    }

    const decoded = verifyToken(accToken);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid or expired verification token",
      });
    }

    const tokenPurpose = "Verify_Email";
    if (decoded?.purpose !== tokenPurpose) {
      return res.status(400).json({
        message: "salah cookies purpose",
      });
    }

    // finding and validate account based on organization

    const findOrg = await prisma.organization.findUnique({
      where: {
        id: decoded.OrganizationId,
        status: "PENDING_VERIFICATION",
      },
    });

    if (!findOrg) {
      return res.status(400).json({
        message: "Sudah diverifikasi / user tidak ada",
      });
    }

    // finding and validate email and limit otp

    const findEmail = await prisma.emailVerification.findUnique({
      where: {
        id: decoded.emailVerificationId,
      },
    });

    if (!findEmail) {
      return res.status(400).json({
        message: "Email juga ga ada",
      });
    }
    if (findEmail?.OrganizationId !== findOrg.id) {
      return res.status(400).json({
        message: "realasi email dan organization salah",
      });
    }
    if (new Date() >= findEmail.expiredAt) {
      return res.status(400).json({
        message: "kode expired, kirim ulang otp",
      });
    }

    if (findEmail.attempts >= 5) {
      return res.status(400).json({
        message: "Percobaan verifikasi udah maksimal",
      });
    }

    if (findEmail.token !== code) {
      const update = await prisma.emailVerification.update({
        where: {
          id: findEmail.id,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });

      return res.status(400).json({
        message: `OTP salah, percobaan ke ${update.attempts}`,
      });
    }

    // update verification email account

    const updateData = await prisma.$transaction(async (tx) => {
      await tx.emailVerification.delete({
        where: {
          id: findEmail.id,
        },
      });

      const updateOrg = await tx.organization.update({
        where: {
          id: findOrg.id,
        },
        data: {
          status: "ACTIVE",
        },
      });

      return updateOrg;
    });

    res.clearCookie("verifyEmail", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Success",
      user: updateData.username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

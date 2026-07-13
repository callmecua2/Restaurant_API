import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import crypto from "crypto";
import { verifyToken } from "../../lib/webtoken";
import { sendEmail } from "../../lib/sendemail";

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const newToken = crypto.randomInt(100000, 1000000).toString();
    const newExpiry = new Date(Date.now() + 5 * 60 * 1000);

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
    if (decoded.purpose !== tokenPurpose) {
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

    await sendEmail(newToken);
    
    const resendOTP = await prisma.emailVerification.update({
      where: {
        id: findEmail.id,
      },
      data: {
        token: newToken,
        expiredAt: newExpiry,
        attempts: 0,
      },
    });


    return res.status(200).json({
      message: "Succes membuat OTP baru, cek email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

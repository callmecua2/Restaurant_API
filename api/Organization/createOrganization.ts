// create new organization
import type { Request, Response } from "express";
import { HashPassword, ComparePassword } from "../../encryption/encryption";
import prisma from "../../lib/prisma";
import { generateToken } from "../../lib/webtoken";
import crypto from "crypto";
import { sendEmail } from "../../lib/sendemail";
import jwt from "jsonwebtoken";
import { type CreateOrganization } from "../../types/authcookies";

interface createUserPayload {
  username: string;
  email: string;
  password: string;
}

export const createOrganization = async (
  req: Request<{}, {}, createUserPayload>,
  res: Response,
) => {
  try {
    const { username, email, password }: createUserPayload = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password is not long enough" });
    }

    const existingUser = await prisma.organization.findFirst({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email has been used",
      });
    }

    const hash = await HashPassword(password);
    const apiKey = crypto.randomBytes(32).toString("hex");
    const verifCode = crypto.randomInt(0, 1000000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // create new organization and email verification function

    const createOrganization = await prisma.$transaction(async (tx) => {
      const createNewOrganization = await tx.organization.create({
        data: {
          username: username,
          email: email,
          password: hash,
          apiKey: apiKey,
        },
      });

      const createTokenEmail = await tx.emailVerification.create({
        data: {
          OrganizationId: createNewOrganization.id,
          token: verifCode.toString(),
          expiredAt: expiresAt,
        },
      });

      await sendEmail(verifCode.toString());

      return {
        organizationId: createNewOrganization.id,
        tokenEmailId: createTokenEmail.id,
      };
    });

    // create verify account only cookies

    const registrationPayload = {
      organizationId: createOrganization.organizationId,
      emailVerificationId: createOrganization.tokenEmailId,
      purpose: "verify-email",
    };

    const registrationToken = jwt.sign(registrationPayload, apiKey, {
      expiresIn: "1h",
    });

    res.cookie("verifyEmail", registrationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message:
        "Success creating Organization, please check your email for verification",
      user: username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

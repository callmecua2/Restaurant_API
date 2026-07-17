import { ComparePassword } from "../../encryption/encryption";
import prisma from "../../lib/prisma";
import { generateToken } from "../../lib/webtoken";


export const loginOrganization = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        message: "Invalid input",
      });
    }

    const validateUser = await prisma.organization.findUnique({
      where: { username },
    });

    if (!validateUser) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const compare = await ComparePassword(password, validateUser.password);
    if (!compare) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken({
      organizationId: validateUser.id,
      username: validateUser.username,
    });

    res.cookie("login_organization", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "Login Success",
      username: validateUser.username,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
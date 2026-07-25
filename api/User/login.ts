import prisma from "../../lib/prisma";
import { generateToken } from "../../lib/webtoken";
import { ComparePassword } from "../../encryption/encryption";

export const userLogin = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (!username.includes("@")) {
      return res.status(400).json({
        message: "Invalid username format",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password not long enough",
      });
    }

    const validateUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!validateUser) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const compare = await ComparePassword(password, validateUser.password);

    if (!compare) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken({
        userId : validateUser.id,
        userName: validateUser.username,
        userRole : validateUser.role,
        organizationId : validateUser.OrganizationId
    });

    res.cookie("userLogin", token, {
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
      message: "Internal server error",
    });
  }
};

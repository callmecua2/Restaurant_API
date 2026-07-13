import prisma from "../../lib/prisma";
import { generateToken } from "../../lib/webtoken";
import { ComparePassword } from "../../encryption/encryption";

export const userLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password not long enough",
      });
    }

    const validateUser = await prisma.user.findUnique({
      where: { email },
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
        Username: validateUser.name,
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
      username: validateUser.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

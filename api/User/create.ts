import { HashPassword, ComparePassword } from "../../encryption/encryption";
import prisma from "../../lib/prisma";

export const createUser = async (req: any, res: any) => {
  try {
    const body = await req.json();
    const { username, email, password, role } = body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (username.length < 6) {
      return res.status(400).json({ message: "Username is not long enough" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password is not long enough" });
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "Email has been used",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const auth = req.user;
    const userRole = auth.userRole;
    const organzation = auth.organizationId;

    if (userRole !== "OWNER" || userRole !== "MANAGER") {
      return res.status(400).json({
        message: "Not Auhtorized used",
      });
    }

    if (role === "MANAGER" && userRole !== "OWNER") {
      return res.status(400).json({
        message: "Can't add manager account if not by Owner",
      });
    }

    const hashing = await HashPassword(password);
    const createUser = await prisma.user.create({
      data: {
        username: username,
        password: hashing,
        role: role,
        OrganizationId: organzation,
      },
    });

    return res.status(400).json({
      message: "Success creating user",
      user: username,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Internal server error",
    });
  }
};

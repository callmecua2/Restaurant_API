import { HashPassword} from "../../encryption/encryption";
import prisma from "../../lib/prisma";


export const createUser = async (req: any, res: any) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
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
        message: "Password is not long enough",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email has been used",
      });
    }

    const hashingpassword = await HashPassword(password);
    const organizationId = req.organization.organizationId;

    const createNewUser = await prisma.user.create({
      data: {
        email: email,
        password: hashingpassword,
        name: name,
        role: role,
        OrganizationId: organizationId,
      },
    });

    return res.status(200).json({
      message: "Success create new user",
      user: createNewUser.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

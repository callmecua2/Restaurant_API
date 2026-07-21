import prisma from "../../lib/prisma";

export const changePassword = async (req: any, res: any) => {
  try {
    const { password, confirmPassword } = req.body;

    if (!password && !confirmPassword) {
      return res.status(401).json({
        message: "Missing required field",
      });
    }

    const auth = req.user;
    const id = auth.getUserId;
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

    const updateUser = await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        password: password,
      },
    });

    return res.status(200).json({
      message: "Success change password",
    });
  } catch (error) {
    console.log(error);
    return res.status.json({
      message: "Internal server error",
    });
  }
};

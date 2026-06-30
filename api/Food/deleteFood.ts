import prisma from "../../lib/prisma";

export const deleteFood = async (req: any, res: any) => {
  try {
    const foodId = Number(req.params.id);
    const getUser = req.user;
    const userIdOrganization = getUser.organizationId;

    if (isNaN(foodId)) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    const findMenu = await prisma.food.findFirst({
      where: {
        id: foodId,
        OrganizationId: userIdOrganization,
      },
    });

    if (!findMenu) {
      return res.status(400).json({
        message: "Food not found",
      });
    }

    const deletedFood = await prisma.food.delete({
      where: {
        id: findMenu.id,
      },
    });

    return res.status(200).json({
      message: "Success",
      deteledItem: deletedFood.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

import prisma from "../../lib/prisma";

type FoodItem = {
  name: string;
  description: string;
  category: string;
  price: number;
  OrganizationId: number;
  stocks: number;
  imgPath: string;
};

export const foodUpdate = async (req: any, res: any) => {
  try {
    const getUser = req.user;
    const getUserOrganizationId = getUser.organizationId;
    const getUserOrganizationRole = getUser.userRole;

    const foodId = Number(req.params.id);
    const { name, description, category, price, stocks, imgPath } = req.body;

    if (
      getUserOrganizationRole != "OWNER" &&
      getUserOrganizationRole != "MANAGER"
    ) {
      return res.status(403).json({
        message: "User not authorized",
      });
    }

    const dataToUpdate: Partial<FoodItem> = {};

    if (name !== undefined) dataToUpdate.name = name;
    if (description !== undefined) dataToUpdate.description = description;
    if (category !== undefined) dataToUpdate.category = category;
    if (price !== undefined) dataToUpdate.price = price;
    if (stocks !== undefined) dataToUpdate.stocks = stocks;
    if (imgPath !== undefined) dataToUpdate.imgPath = imgPath;

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        message: "No data provided for update",
      });
    }

    const findFood = await prisma.food.findFirst({
      where: {
        id: foodId,
        OrganizationId: getUserOrganizationId,
      },
    });

    if (!findFood) {
      return res.status(400).json({
        message: "Can't find the items",
      });
    }

    const updateFood = await prisma.food.update({
      where: {
        id: findFood.id,
      },
      data: dataToUpdate,
    });

    return res.status(200).json({
      message: "Success",
      update: updateFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Internal server error",
    });
  }
};

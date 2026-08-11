import type { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const foodId = Number(req.params.id);
    const auth = req.user;

   if (Number.isNaN(foodId) || foodId <= 0) {
  return res.status(400).json({
    message: "Invalid food ID parameter",
  });
}

     if (auth.userRole !== "OWNER" && auth.userRole !== "MANAGER") {
      return res.status(403).json({
        message: "User not authorized",
      });
    }

    const findItems = await prisma.food.findFirst({
      where: {
        id: foodId,
        OrganizationId: auth.organizationId,
        isActive : true
      },
    });

    if (!findItems) {
      return res.status(404).json({
        message: "Can't find the items",
      });
    }

    const deletedFood = await prisma.food.update({
      where: {
        id: findItems.id,
      },
      data : {
        isActive : false
      }
    });

    return res.status(200).json({
      message: "Success",
      deletedItem: deletedFood.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

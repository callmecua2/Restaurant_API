import type { Request, Response } from "express";
import prisma from "../../lib/prisma";


export const getFoodById = async (req: Request, res: Response) => {
  try {
    const auth = req.user;
    const id = Number(req.params.id)

    if (!id) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const getFood = await prisma.food.findFirst({
      where: {
        id : id,
        OrganizationId: auth.organizationId,
      },
    });

   if (!getFood || getFood.OrganizationId !== auth.organizationId) {
  return res.status(404).json({ message: "Food does not exist" });
}

    return res.status(200).json({
      message: "Success",
      data : getFood
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

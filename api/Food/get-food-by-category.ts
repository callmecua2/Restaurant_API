import type { Request, Response } from "express";
import prisma from "../../lib/prisma";

interface requestQuery {
  category?: string;
}

export const getFood = async (
  req: Request<{}, {}, {}, requestQuery>,
  res: Response,
) => {
  try {
    const category = req.query.category;

    if (category !== undefined) {
      if (typeof category !== "string" || category.trim().length === 0) {
        return res.status(400).json({
          message:
            "Bad Request: Category query parameter must be a non-empty string",
        });
      }
    }

    const auth = req.user;

    const findItemsByCategory = await prisma.food.findMany({
      where: {
        OrganizationId: auth.organizationId,
        isActive: true,
        category: typeof category === "string" ? category : undefined, // Opsional di Prisma
      },
      omit: {
        OrganizationId: true,
      },
    });

    if (!findItemsByCategory) {
      return res.status(404).json({
        message: "Cant find the items by category",
      });
    }

    return res.status(200).json({
      message: "Success get items",
      data: findItemsByCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

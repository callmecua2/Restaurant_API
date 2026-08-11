import type { Request, Response } from "express";
import prisma from "../../lib/prisma";

type dataPayload = {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  stocks?: number;
  imgPath?: string;
};

type FoodItemtoPush = {
  name: string;
  description: string;
  category: string;
  price: number;
  OrganizationId: number;
  stocks: number;
  imgPath: string;
};

interface Params {
  id: string;
}

export const updatefood = async (
  req: Request<Params, {}, dataPayload>,
  res: Response,
) => {
  try {
    const auth = req.user;
    const foodId = Number(req.params.id);

    if(Number.isNaN(foodId) || foodId <= 0) {
      return res.status(400).json({
        message : "Invalid request"
      })
    }

    const { name, description, category, price, stocks, imgPath } = req.body;
    if (auth.userRole !== "OWNER" && auth.userRole !== "MANAGER") {
      return res.status(403).json({
        message: "User not authorized",
      });
    }

    const dataToUpdate: Partial<FoodItemtoPush> = {};

    // Validasi Name (jika dikirim)
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
          message: "Invalid name: must be a string with at least 2 characters",
        });
      }
      dataToUpdate.name = name;
    }

    // Validasi Description (jika dikirim)
    if (description !== undefined) {
      if (typeof description !== "string" || description.trim().length < 2) {
        return res.status(400).json({
          message:
            "Invalid description: must be a string with at least 2 characters",
        });
      }
      dataToUpdate.description = description;
    }

    // Validasi Category (jika dikirim)
    if (category !== undefined) {
      if (typeof category !== "string" || category.trim().length < 2) {
        return res.status(400).json({
          message:
            "Invalid category: must be a string with at least 2 characters",
        });
      }
      dataToUpdate.category = category;
    }

    // Validasi Price (jika dikirim)
    if (price !== undefined) {
      if (typeof price !== "number" || Number.isNaN(price) || price < 1) {
        return res.status(400).json({
          message: "Invalid price: must be a positive number",
        });
      }
      dataToUpdate.price = price;
    }

    // Validasi Stocks (jika dikirim - membolehkan nilai 0)
    if (stocks !== undefined) {
      if (typeof stocks !== "number" || Number.isNaN(stocks) || stocks < 0) {
        return res.status(400).json({
          message: "Invalid stocks: must be a non-negative number",
        });
      }
      dataToUpdate.stocks = stocks;
    }

    // Validasi ImgPath (jika dikirim)
    if (imgPath !== undefined) {
      if (typeof imgPath !== "string" || imgPath.trim().length === 0) {
        return res.status(400).json({
          message: "Invalid image path",
        });
      }
      dataToUpdate.imgPath = imgPath;
    }

    // Cek apakah ada minimal 1 field valid yang diupdate
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    const findFood = await prisma.food.findFirst({
      where: {
        id: foodId,
        OrganizationId: auth.organizationId,
      },
    });

    if (!findFood) {
      return res.status(404).json({
        message: "Can't find the items",
      });
    }

    const updateFood = await prisma.food.updateMany({
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
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

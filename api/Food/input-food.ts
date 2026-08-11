import type { Request, Response } from "express";
import prisma from "../../lib/prisma";

interface dataPayload {
  name: string;
  description: string;
  category: string;
  price: number;
  stocks?: number;
  imgPath?: string;
}

interface FoodItemtoPush {
  name: string;
  description: string;
  category: string;
  price: number;
  OrganizationId: number;
  stocks?: number;
  imgPath?: string;
}

export const inputFood = async (
  req: Request<{}, {}, dataPayload[]>,
  res: Response,
) => {
  try {
    const dataFood = req.body;
    const auth = req.user;

    if (auth.userRole != "OWNER" && auth.userRole != "MANAGER") {
      return res.status(403).json({
        message: "User not authorized",
      });
    }

    if (!dataFood) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    for (const item of dataFood) {

      if(!item || typeof item !== 'object') {
        return res.status(400).json({
          message : "Bad Request"
        })
      }

      const name = item.name;
      if (name === "" || typeof name !== "string" || name.length < 2) {
        return res.status(400).json({
          message: `Bad request : Name cannot empty or must be more than 2 charachter. Name : ${item.name}`,
        });
      }

      const description = item.description;
      if (
        description === "" ||
        typeof description !== "string" ||
        description.length < 2
      ) {
        return res.status(400).json({
          message: `Bad request : Description cannot empty or must be more than 2 charachter. Name : ${item.name}, Description : ${item.description}`,
        });
      }

      const category = item.category;
      if (
        category === "" ||
        typeof category !== "string" ||
        category.length < 2
      ) {
        return res.status(400).json({
          message: `Bad request : Category cannot empty or must be more than 2 charachter. Name : ${item.name}, Category : ${item.category}`,
        });
      }

      const price = item.price;
      if (Number.isNaN(price) || price < 1 || typeof price !== 'number') {
        return res.status(400).json({
          message: `Invalid price: must be a positive number. Name : ${item.name}, Price : ${item.price}`,
        });
      }
    }

    const foodsToInput: FoodItemtoPush[] = dataFood.map((item) => ({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      OrganizationId: auth.organizationId, 
      stocks: item.stocks,
      imgPath: item.imgPath,
    }));

    const inputFood = await prisma.food.createMany({
      data: foodsToInput,
    });

    return res.status(201).json({
      message: `Success add food to database`,
      data: inputFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { OrderStatus } from "@prisma/client";

interface OrderItemRequest {
  foodId: number;
  quantity: number;
}

interface OrderItemInput {
  foodId: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  createdBy?: string;
  status: OrderStatus;
  total: number;
  OrganizationId: number;
}

export const createOrder = async (
  req: Request<{}, {}, OrderItemRequest[]>,
  res: Response,
) => {
  try {
    const orderItems = req.body;
    const auth = req.user;

    //check wheter there's orderItems or not
    if (!orderItems) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    //check orderItems is array or not
    if (!Array.isArray(orderItems) || orderItems.length < 1) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    //check quantity is valid or not

    for (const item of orderItems) {
      const quantity = item.quantity;

      if (
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid quantity",
        });
      }
    }

    // check is the food exist in database or not

    const foodId = orderItems.map((item) => item.foodId);
    let totalPrice = 0;

    const getItems = await prisma.food.findMany({
      where: {
        id: {
          in: foodId,
        },
        OrganizationId: auth.organizationId,
      },
    });

    const itemsToOrder: OrderItemInput[] = [];

    for (let i = 0; i < orderItems.length; i++) {
      const matchedFoodId = getItems.find(
        (food) => food.id === orderItems[i]?.foodId,
      );

      if (!matchedFoodId) {
        return res.status(400).json({
          message: "Invalid input",
        });
      }

      const id = matchedFoodId.id;
      const name = matchedFoodId.name;
      const price = matchedFoodId.price;
      let quantity = orderItems[i]?.quantity || 0;
      totalPrice += quantity * price;

      //cek apakah ada duplikat
      const isDuplicate = itemsToOrder.find((item) => item.foodId === id);

      if (isDuplicate) {
        isDuplicate.quantity += quantity;
      } else {
        itemsToOrder.push({
          foodId: id,
          name: name,
          price: price,
          quantity: quantity,
        });
      }
    }

    const OrderData: Order = {
      createdBy: auth.userName,
      status: OrderStatus.WAITING_PAYMENT,
      total: totalPrice,
      OrganizationId: auth.organizationId,
    };

    const lockOrder = await prisma.$transaction(async (tx) => {
      const createOrder = await tx.order.create({
        data: OrderData,
      });

      await tx.orderItem.createMany({
        data: itemsToOrder.map((item) => ({
          ...item,
          orderId: createOrder.id,
        })),
      });

      return createOrder;
    });

    return res.status(200).json({
      message: "Success",
      listorder: lockOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
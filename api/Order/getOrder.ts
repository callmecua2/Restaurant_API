import type { Request, Response } from "express";
import prisma from "../../lib/prisma";


export const getOrder = async (req: Request, res: Response) => {


  try {
    const auth = req.user;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const getAllOrder = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
        OrganizationId : auth.organizationId
      },
      include : {
        items : {
          include : {
            food : true
          }
        }
      }
    });

    if (getAllOrder.length < 1) {
      return res.status(200).json({
        message: "No order yet",
      });
    }

    return res.status(200).json({
      message: "Success",
      order: getAllOrder
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
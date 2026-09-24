import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

interface cashPaymentRequest {
  orderId: string;
  cashReceived: number;
}

export const cashPayment = async (
  req: Request<{}, {}, cashPaymentRequest>,
  res: Response,
) => {
  try {
    const auth = req.user;

    const { orderId, cashReceived } = req.body;

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        message: "Error : Invalid Order ID input",
      });
    }

    if (!cashReceived || typeof cashReceived !== "number" || cashReceived < 1 || !Number.isInteger(cashReceived)) {
      return res.status(400).json({
        message: "Error : Invalid input cashReceived",
      });
    }

    const findOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        OrganizationId: auth.organizationId,
        status : 'WAITING_PAYMENT',
        payment: {
          method : 'CASH'
        },
      },
    });

    if (!findOrder) {
      return res.status(404).json({
        message: "Error : Order not found or unavailable for cash payment",
      });
    }

    
    if(cashReceived < findOrder.total) {
      return res.status(400).json({
        message : "Insufficient cash"
      })
    }    
    const change = cashReceived - findOrder.total

    const updateOrder = await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: {
          orderId: findOrder.id,
        },
        data: {
          cashReceived: cashReceived,
          cashReturned: change,
          status: "SUCCESS",
        },
      });

      const orderUpdate = await tx.order.update({
        where: {
          id: findOrder.id,
        },
        data: {
          status: "PAID",
        },
        select: {
          id: true,
          orderNumber: true,
          createdAt: true,
          total: true,
          items: {
            select: {
              name: true,
              price: true,
              quantity: true,
            },
          },
          status : true,
          payment : {
            select : {
              method : true,
              cashReceived : true,
              cashReturned : true,             
              status : true,
            }
          } 
        },
      });

      return orderUpdate;
    });

    return res.status(200).json({
      message: "Payment Successfully",
      order: updateOrder,
    });
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

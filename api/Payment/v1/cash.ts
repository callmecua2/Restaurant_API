import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

interface cashPaymentRequest {
  orderId: string;
  amount: number;
}

export const cashPayment = async (
  req: Request<{}, {}, cashPaymentRequest>,
  res: Response,
) => {
  try {
    const auth = req.user;

    const { orderId, amount } = req.body;

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        message: "Error : Invalid Order ID input",
      });
    }

    if (!amount || typeof amount !== "number" || amount < 1) {
      return res.status(400).json({
        message: "Error : Invalid input amount",
      });
    }

    const findOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
        OrganizationId: auth.organizationId,
        status : 'WAITING_PAYMENT',
        payment: {
          method: "TUNAI",
        },
      },
    });

    if (!findOrder) {
      return res.status(404).json({
        message: "Error : Can't find the order / order hasn't been there",
      });
    }

    let change = 0;

    if (amount > findOrder.total) {
      change = amount - findOrder.total;
    } else if (amount === findOrder.total) {
      change = 0;
    } else {
      return res.status(400).json({
        message: "Error : Invalid number of amount",
      });
    }

    const updatePayment = await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: {
          orderId: findOrder.id,
          status : 'PENDING',
        },
        data: {
          cashReceived: amount,
          cashReturned: change,
          status: "SUCCESS",
        },
      });

      const updateOrder = await tx.order.update({
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
        },
      });

      return updateOrder;
    });

    return res.status(201).json({
      message: "Success create payment",
      order: updatePayment,
    });
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

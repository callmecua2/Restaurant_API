import type { Request, Response } from "express";
import prisma from "../../../lib/prisma";
import { OrderStatus } from "@prisma/client";

interface requestParams {
  id : string
}

interface UpdateOrderStatus {
  status : OrderStatus
}

export const updateOrder = async (req: Request<requestParams, {}, UpdateOrderStatus>, res: Response) => {
  try {
    const auth = req.user;
    const orderId = req.params.id;
    const {status} : UpdateOrderStatus = req.body

    
    //check does orderId exist or not
    if(!orderId) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    //check status exist or not
    if (!status) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    // check the order is exist in database
    const findOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        OrganizationId: auth.organizationId
      },
    });

    if (!findOrder) {
      return res.status(400).json({
        message: "Cant find your order",
      });
    }



    //filter allowed next status to update
    const allowedStatusOrder: Record<OrderStatus, OrderStatus[]> = {
        WAITING_PAYMENT : [OrderStatus.PAID],
        PAID : [OrderStatus.PREPARED, OrderStatus.CANCELLED],
        PREPARED : [OrderStatus.READY],
        READY : [OrderStatus.COMPLETED],
        COMPLETED : [],
        CANCELLED : []
    };


    // to find which allowed status to update next
    const currentStatus = allowedStatusOrder[findOrder.status]


    // make sure target is exist in allowed status list
    if(!currentStatus.includes(status)) {
      return res.status(400).json({
        message : "Invalid update input"        
      })
    }

    //update status
    const updateOrder = await prisma.order.update({
      where: {
        id: findOrder.id,
      },
      data: {
        status: status,
      }
    });

    return res.status(200).json({
      message: `Succes update order number ${updateOrder.orderNumber}`,
      status: updateOrder.status
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

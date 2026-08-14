import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { OrderStatus } from "@prisma/client";


interface orderId {
  id : string
}

interface orderStatus {
  status : OrderStatus
}

export const kitchenUpdateOrder = async (req: Request<orderId, {}, orderStatus>, res: Response) => {
  try {
    const auth = req.user;

    
    // getting id from params and validate
    const orderId = req.params.id
    if(!orderId) {
      return res.status(400).json({
        message : "Bad request, missing required id"
      })
    }

    //getting status from request query and validate
    const { status } = req.body
    if(!status || typeof status !== 'string') {
      return res.status(400).json({
        message : "Missing required field : status"
      })
    }

    const findOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        OrganizationId: auth.organizationId,
      },
    });

    if (!findOrder) {
      return res.status(404).json({
        message: "Cant find your order",
      });
    }

    const allowedOrder : Record<OrderStatus, OrderStatus[]> = {
      WAITING_PAYMENT : [],
      PAID : ["PREPARED"],
      PREPARED : ["READY"],
      READY : ["COMPLETED"],
      COMPLETED : [],
      CANCELLED : []
    }


    const allowedStatus = allowedOrder[findOrder.status]

     // make sure target is exist in allowed status list
    if(!allowedStatus.includes(status)) {
      return res.status(400).json({
        message : "Invalid update input"        
      })
    }
    
    const orderUpdate = await prisma.order.update({
      where : {
        id : findOrder.id
      },
      data : {
        status : status
      },
      select : {
        orderNumber : true,
        status : true,
        total : true,
        items : true 
      },
    })

    return res.status(200).json({
      message: "Success update order",
      order : orderUpdate
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

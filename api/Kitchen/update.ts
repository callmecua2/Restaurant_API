import prisma from "../../lib/prisma";

export const kitchenUpdateOrder = async (req: any, res: any) => {
  try {
    const getUser = req.user;
    const getUserOrganizationId = getUser.organizationId;

    const orderId = req.params.id;
    const { status } = req.body;

    if(!status) {
      return res.status(400).json({
        message : "Missing required field"
      })
    }

    let allowedOrder: string[] = [];

    const findOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        OrganizationId: getUserOrganizationId,
      },
    });

    if (!findOrder) {
      return res.status(400).json({
        message: "Cant find your order",
      });
    }

    switch (findOrder.status) {
      case "PAID":
        allowedOrder = ["PREPARED"];
        break;
      case "PREPARED":
        allowedOrder = ["READY"];
        break;
      case "READY":
        allowedOrder = [];
        break;
      case "COMPLETED":
        allowedOrder = [];
        break;
      case "CANCELLED":
        allowedOrder = [];
        break;
      default:
        return res.status(500).json({
          message: "Invalid current order status",
        });
    }


    if(!allowedOrder.includes(status)) {
      return res.status(400).json({
        message : "Invalid order input"
      })
    }
    
    const orderUpdate = await prisma.order.update({
      where : {
        id : findOrder.id
      },
      data : {
        status : status
      }
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

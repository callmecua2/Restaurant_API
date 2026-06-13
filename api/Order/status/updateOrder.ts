import prisma from "../../../lib/prisma";

export const updateOrder = async (req: any, res: any) => {
  try {
    const getUser = req.user;
    const userIdOrganization = getUser.organizationId;
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    const findOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        OrganizationId: userIdOrganization,
      },
    });

    if (!findOrder) {
      return res.status(400).json({
        message: "Cant find your order",
      });
    }

    let allowedOrder: string[] = [];

    switch (findOrder.status) {
      case "PAID":
        allowedOrder = ["PREPARED", "CANCELLED"];
        break;

      case "PREPARED":
        allowedOrder = ["READY"];
        break;

      case "READY":
        allowedOrder = ["COMPLETED"];
        break;
      
      case "COMPLETED":
        allowedOrder = [];
        break;  
      case "CANCELLED":
        allowedOrder = [];
        break;
      default:
        return res.status(400).json({
          message: "Invalid current order status",
        });
    }

    if(!allowedOrder.includes(status)) {
      return res.status(400).json({
        message : "Invalid update input"        
      })
    }

    const updateOrder = await prisma.order.update({
      where: {
        id: findOrder.id,
      },
      data: {
        status: status,
      },
    });

    return res.status(200).json({
      message: `Succes update order number ${updateOrder.orderNumber}`,
      status: updateOrder.status,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

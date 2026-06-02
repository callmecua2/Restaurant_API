import prisma from "../../lib/prisma";

export const createOrder = async (req: any, res: any) => {
  try {
    const { orderItems } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length < 1) {
      return res.status(400).json({
        message: "Empty Cart",
      });
    }

    const foodId = orderItems.map((item) => item.id);
    let totalPrice = 0;

    const getItems = await prisma.food.findMany({
      where: {
        id: {
          in: foodId,
        },
      },
    });

    const itemsToOrder = [];

    for (const item of orderItems) {
      const matchedFoodId = getItems.find((food) => food.id === item.id);

      if (!matchedFoodId) {
        return res.status(400).json({
          message: "Invalid input",
        });
      }

      const name = matchedFoodId?.name;
      const price = matchedFoodId?.price || 0;
      const quantity = item.quantity;
      totalPrice += quantity * price;

      itemsToOrder.push({
        foodId: item.id,
        name,
        price,
        quantity,
      });
    }

    const getUser = req.user;
    const getUserName = getUser.Username;
    const getUserOrganizationId =  getUser.organizationId

    const createOrder = await prisma.order.create({
      data: {
        createdBy: getUserName,
        tableNumber: 1,
        status: "WAITING_PAYMENT",
        total: totalPrice,
        OrganizationId : getUserOrganizationId
      },
    });

    const createOrderItems = await prisma.orderItem.createMany({
      data: itemsToOrder.map((item) => ({
        ...item,
        orderId: createOrder.id,
      })),
    });

    return res.status(200).json({
        message : "Success",
        listorder : createOrder
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

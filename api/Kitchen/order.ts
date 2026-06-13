import prisma from "../../lib/prisma";

export const kitchenGetOrder = async (req: any, res: any) => {
  try {
    const getUser = req.user;
    const getUserOrganizationId = getUser.organizationId;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const getOrder = await prisma.order.findMany({
      where: {
        status: {
          in: ["PAID", "PREPARED", "READY"],
        },
        OrganizationId: getUserOrganizationId,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      include: {
        items: {
          select: {
            name: true,
            quantity: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      message: "Success",
      order: getOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

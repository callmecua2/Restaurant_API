import prisma from "../../../lib/prisma";

export const getRevenue = async (req: any, res: any) => {
  try {
    const daily = req.query.daily;
    const weekly = req.query.weekly;
    const monthly = req.query.monthly;
    const yearly = req.query.yearly;
    const getUserOrganizationId = req.user.organizationId;
    if (!daily || !weekly || !monthly || !yearly) {
      return res.status(401).json({
        message: "Missing required field",
      });
    }

    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date();
    dayEnd.setHours(23, 59, 59, 999);

    const getRevenue = await prisma.order.findMany({
      where: {
        OrganizationId: getUserOrganizationId,
        createdAt: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
    });

    const sumRevenue = await prisma.order.aggregate({
      where: {
        OrganizationId: getUserOrganizationId,
        createdAt: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      _sum: {
        total: true,
      },
    });

    return res.status(200).json({
      message: "Success",
      revenue: sumRevenue,
      detailOrder: getRevenue,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

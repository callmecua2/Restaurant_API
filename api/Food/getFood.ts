import prisma from "../../lib/prisma";

interface StatusOrder {
  status: string;
}

export const getFood = async (req: any, res: any) => {
  try {
    const getUser = req.user;
    const getUserOrganizationId = getUser.organizationId;

    const status = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    if (!Array.isArray(status)) {
      return res.status(400).json({
        message: "Error type input",
      });
    }

    const category = req.query.category;
    const price = req.query.price;

    const getFood = await prisma.food.findMany({
      where: {
        OrganizationId: getUserOrganizationId,
      },
    });

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

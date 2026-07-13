import prisma from "../../../lib/prisma";

export const inputCategory = async (req: any, res: any) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (typeof category != "string" || category.trim() === "") {
      return res.status(400).json({
        message: "Invalid category name",
      });
    }

    const getUserOrganizationId = req.user.organizationId;

    const isExisting = await prisma.category.findFirst({
      where: {
        name: category,
        OrganizationId: getUserOrganizationId,
      },
    });

    if (isExisting) {
      return res.status(400).json({
        message: "Category is already exist",
      });
    }

    const inputCategory = await prisma.category.createMany({
      data: {
        name: category,
        OrganizationId: getUserOrganizationId,
      },
    });

    return res.status(200).json({
      message: "Success",
      addedCategory: inputCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal serer error",
    });
  }
};

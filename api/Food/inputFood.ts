import prisma from "../../lib/prisma";

interface FoodItem {
    name : string
    description : string
    category : string
    price : number
    OrganizationId : number
    stocks : number
    imgPath : string
}

export const inputFood = async (req: any, res: any) => {
  try {
    const dataFood = req.body;

    const getUser = req.user;
    const getUserOrganizationId = getUser.organizationId;
    const getUserOrganizationRole = getUser.userRole;

    if(getUserOrganizationRole != "OWNER" && getUserOrganizationRole != "MANAGER") {
        return res.status(400).json({
            message : "User not authorized"
        })
    }

    if (!Array.isArray(dataFood) || dataFood.length == 0) {
      return res.status(400).json({
        message: "Input must be array",
      });
    }

    let foodsToInput : FoodItem[] = []

    for(const item of dataFood) {
        foodsToInput.push({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            OrganizationId: getUserOrganizationId,
            stocks : item?.stocks,
            imgPath : item?.imgPath
        })
    }

    const inputFood = await prisma.food.createMany({
        data : foodsToInput
    })

    return res.status(200).json({
      message: `Success add food to database ${inputFood}`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
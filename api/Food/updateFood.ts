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


export const foodUpdate = async (req: any, res: any) => {
  try {
    
    const getUser = req.user;
    const getUserOrganizationId = getUser.organizationId;
    const getUserOrganizationRole = getUser.userRole;

    const foodId = req.params.foodId;
    const dataFood = req.body
    
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
    


    const foodToUpdate : FoodItem [] = []

    for(const item of dataFood) {
        foodToUpdate.push({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            OrganizationId: getUserOrganizationId,
            stocks : item?.stocks,
            imgPath : item?.imgPath
        })
    }


    // const updateFood = await prisma.food.update({
    //   where : {
    //     OrganizationId : getUserOrganizationId
    //   }
    // })


    return res.status(200).json({
      message : "Success"
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Internal server error",
    });
  }
};

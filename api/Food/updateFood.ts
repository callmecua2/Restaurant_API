import prisma from "../../lib/prisma";


type FoodItem = {
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
    const {name, description, category, price, organizationId, stocks, imgPath} = req.body

    if(getUserOrganizationRole != "OWNER" && getUserOrganizationRole != "MANAGER") {
        return res.status(400).json({
            message : "User not authorized"
        })
    }
    
    const dataToUpdate : FoodItem = {
      name: "",
      description: "",
      category: "",
      price: 0,
      OrganizationId: 0,
      stocks: 0,
      imgPath: ""
    }

    if (name !== undefined) dataToUpdate.name = name;
if (description !== undefined) dataToUpdate.description = description;
if (category !== undefined) dataToUpdate.category = category;
if (price !== undefined) dataToUpdate.price = price;
if (stocks !== undefined) dataToUpdate.stocks = stocks;
if (imgPath !== undefined) dataToUpdate.imgPath = imgPath;

    const findFood = await prisma.food.findFirst({
      where : {
        id : foodId,
        OrganizationId : getUserOrganizationId
      }
    })
    
    if(!findFood) {
      return res.status(400).json({
        message : "Can't find the items"
      })
    }

    const foodToUpdate : FoodItem [] = []

    // for(const item of dataFood) {
    //     foodToUpdate.push({
    //         name: item.name,
    //         description: item.description,
    //         category: item.category,
    //         price: item.price,
    //         OrganizationId: getUserOrganizationId,
    //         stocks : item?.stocks,
    //         imgPath : item?.imgPath
    //     })
    // }


    const updateFood = await prisma.food.updateMany({
      where : {
        OrganizationId : findFood.OrganizationId
      },
      data : foodToUpdate
    })

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

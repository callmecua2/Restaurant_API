import type { Response } from "express";
import prisma from "../../lib/prisma";

export const getProfiles = async (req: any, res: Response) => {
  try {

    const auth = req.user;
    const getUserId = auth.UserId;
    const getUserOrganizationId = auth.organizationId;

    const findUser = await prisma.user.findUnique({
      where : {
        id : getUserId,
        OrganizationId : getUserOrganizationId
      }, select : {
        id : true,
        username : true,
        email : true,
        role : true,
        createdAt : true,
        status : true
      }
    })

    if(!findUser) {
      return res.status(401).json({
        message : "User does not exist"
      })
    }

    return res.status(200).json({
      message : "Success",
      user : findUser
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal serer error",
    });
  }
};

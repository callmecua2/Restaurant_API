import type { Response } from "express";
import prisma from "../../../lib/prisma";

export const getCategory = async(req: any, res: Response) => {
    try {


        const getUserOrganizationId = req.user.organizationId;

        const findCategory = await prisma.category.findMany({
            where : {
                OrganizationId : getUserOrganizationId,
                isActive : true
            },
            orderBy : {
                id : 'asc'
            }
        })

        return res.status(200).json({
            message : "Success",
            data : findCategory
        })

    } catch (error) {
        console.log(error);
    return res.status(500).json({
      message: "Internal serer error",
    });
    }
}
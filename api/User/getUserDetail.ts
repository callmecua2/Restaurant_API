import type { Response } from "express";
import prisma from "../../lib/prisma";

export const getUserDetail = async (req : any, res: Response) => {
    try {
        const userId = Number(req.params.id)
        
        if(!userId) {
            return res.status(400).json({
                message : "Bad Request"
            })
        }

        if(Number.isNaN(userId)) {
            return res.status(400).json({
                message : "Bad Request"
            })
        }

        const auth = req.user
        const getUserOrganizationId = auth.organizationId;
        const getUserOrganizationRole = auth.userRole;

        const allowedRole = ["OWNER", "MANAGER"]

        if(!allowedRole.includes(getUserOrganizationRole)) {
            return res.status(403).json({
                message : "Unauthorized User Access"
            })
        }

        const findUser = await prisma.user.findFirst({
            where : {
                id : userId,
                OrganizationId : getUserOrganizationId
            },
            select : {
                id : true,
                username : true,
                email : true,
                role : true,
                createdAt : true,
                status : true
            }
        })

        if(!findUser) {
            return res.status(404).json({
                message : "User does not exist"
            })
        }

        return res.status(200).json({
            message : "Success",
            data : findUser
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
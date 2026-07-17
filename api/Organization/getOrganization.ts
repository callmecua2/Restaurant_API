import type { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const getOrganization = async (req: any, res : Response) => {
    try {

        const organization = req.organization;
        const organizationId = organization.organizationId;


        if(!organizationId) {
            return res.status(404).json({
                message : "Unauthorized user"
            })
        }
        const getUser = await prisma.organization.findUnique({
            where : {
                id : organizationId
            }
        })

        if(!getUser) {
            return res.status(400).json({
                message : "User ga ada"
            })
        }

        return res.status(200).json({
            message : "Succces get organization data",
            data : getUser
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { UserRole, UserStatus } from "@prisma/client";


export const getAllUSer = async (req : Request, res: Response) => {
    try {

        const auth = req.user

        if(auth.userRole === "STAFF") {
            return res.status(403).json({
                message : "Unauthorized User"
            })
        }

        const defaultAllowedStatus : UserStatus = UserStatus.ACTIVE
        
        const allowedRoles : Record<UserRole, UserRole[]> = {
            OWNER : [UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF],
            MANAGER : [UserRole.MANAGER, UserRole.STAFF],
            STAFF : []
        }

        const visibleRoles = allowedRoles[auth.userRole]


        const getFullUser = await prisma.user.findMany({
            where : {
                OrganizationId : auth.organizationId,
                role : {
                    in : visibleRoles,
                },
                status : defaultAllowedStatus,
                
            },
            select : {
                username : true,
                email : true,
                role : true,
                createdAt : true,
                status : true
            }
        })

        if(getFullUser.length < 1) {
            return res.status(400).json({
                message : "Bad Request"
            })
        }

        return res.status(200).json({
            message : "Success",
            data : getFullUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
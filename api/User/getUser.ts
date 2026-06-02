import prisma from "../../lib/prisma";

export const getAllUSer = async (req : any, res: any) => {
    try {

        const getUser = req.user
        const getUserOrganizationId = getUser.organizationId;
        const getUserOrganizationRole = getUser.userRole;
        if(!getUserOrganizationId) {
            return res.status(400).json({
                message : "Unauthorized User"
            })
        }

        if(getUserOrganizationRole != "MANAGER") {
           return res.status(400).json({
                message : "Unauthorized User role", role : getUserOrganizationRole
            })
        }

        const getFullUser = await prisma.user.findMany({
            where : {
                OrganizationId : getUserOrganizationId
            }
        })


        if(getFullUser.length < 1) {
            return res.status(400).json({
                message : "cant find any user"
            })
        }

        return res.status(200).json({
            message : "Success", getFullUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
import prisma from "../../lib/prisma";

export const getUser = async(req : any, res: any) => {
    try {

        const OrganizationId = req.organization.organizationId;

        const getAllUser = await prisma.user.findMany({
            where : {
                OrganizationId : OrganizationId
            }
        })

        if(getAllUser.length === 0) {
            return res.status(400).json({
                message : "Internal server error"
            })
        }

        return res.status(200).json({
            message : "Success",
            getAllUser
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
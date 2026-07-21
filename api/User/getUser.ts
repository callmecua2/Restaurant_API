import prisma from "../../lib/prisma";


export const getAllUSer = async (req : any, res: any) => {
    try {

        const auth = req.user
        const getUserOrganizationId = auth.organizationId;
        const getUserOrganizationRole = auth.userRole;

        if(getUserOrganizationRole !== "MANAGER" || getUserOrganizationRole !== "OWNER") {
           return res.status(400).json({
                message : "Unauthorized User role", role : getUserOrganizationRole
            })
        }
    
        let filterRole : any = {
            OrganizationId : getUserOrganizationId,
            status : "ACTIVE"
        } 

        if(getUserOrganizationRole === "MANAGER") {
            filterRole.role = {in : ["MANAGER", "STAFF"]}
        }

        const getFullUser = await prisma.user.findMany({
            where : filterRole,
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
                message : "cant find any user"
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
import type { Response } from "express";
import prisma from "../../lib/prisma";
import { ComparePassword } from "../../encryption/encryption";
import { HashPassword } from "../../encryption/encryption";

export const changePassword = async (req: any, res: Response) => {
    try {

        const {password, newPassword, verifyNewPassword} = req.body;
        if(!password || !newPassword || !verifyNewPassword) {
            return res.status(400).json({
                message : "Missing required field"
            })
        }

        if(newPassword.length < 8 && verifyNewPassword.length < 8) {
            return res.status(400).json({
                message : "Password kurang panjang"
            })
        }

        if(password === newPassword) {
            return res.status(400).json({
                message : "Passwordnya gaboleh sama"
            })
        }

        if(newPassword !== verifyNewPassword) {
            return res.status(400).json({
                message : "validasi password baru salah"
            })
        }

        const organization = req.organization;
        const organizationId = organization.organizationId;

        const findOrganization = await prisma.organization.findUnique({
            where : {
                id : organizationId
            }
        })

        if(!findOrganization) {
            return res.status(404).json({
                message : "Usernya ga ketemu"
            })
        }

        
        const compare = await ComparePassword(password, findOrganization.password)
        if(!compare) {
            return res.status(401).json({
                message : "Passwordnya salah nih"
            })
        }

        const hashPassword = await HashPassword(newPassword)
        await prisma.organization.update({
            where : {
                id : organizationId
            },
            data : {
                password : hashPassword
            }
        })

        return res.status(200).json({
            message : "Berhasil mengganti password"
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
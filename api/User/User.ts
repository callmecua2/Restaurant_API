import { HashPassword, ComparePassword } from "../../encryption/encryption";
import prisma from "../../lib/prisma";

export const createUser = async(req : any, res : any) => {
    try {

        const body = await req.json();
        const {email, password} = body;

        if(!email || !password) {
            return res.status(400).json({
                message : "Missing required field"
            })
        }

        if(!email.includes("@")) {
            return res.status(400).json({ message : "Invalid email format" })
        }

        if(password.length < 8) {
            return res.status(400).json({message : "Password is not long enough"})
        }

        const existingUser = await prisma.user.findFirst({
            where : {email}
        })

        if(!existingUser) {
            return res.status(400).json({
                message : "Email has been used"
            })
        }

        const hashing = await HashPassword(password);
        const createUser = await prisma.user.create({
            data : {
                email : email,
                password : hashing,
            }
        })

        return res.status(400).json({
            message : "Success creating user", user : email
        })

        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            message : "Internal server error"
        })
    }
}
import { verifyToken } from "../../lib/webtoken"
import { type NextFunction } from "express"

export const orderMiddleware = async (req: any, res:any, next : NextFunction) => {
    try {

        const token = req.cookies.userLogin;
        if(!token) {
            return res.status(400).json({
                message : "Unauthorized access"
            })
        }
        
        const decoded = verifyToken(token);

        if(!decoded) {
            return res.status(400).json({
                message : "Unauthorized access"
            })
        }


        req.user = decoded

        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}
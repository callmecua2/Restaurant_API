import { Request } from "express";
import { type JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
    userId : number;
    userName : string;
    userRole : string;
    organizationId : number
}


declare global {
    namespace Express {
        interface Request {
            user? : userPayload
        }
    }
}
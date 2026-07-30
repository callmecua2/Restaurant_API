import { Request } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

export interface UserPayload extends JwtPayload {
    userId : number;
    userName : string;
    userRole : UserRole;
    organizationId : number
}


declare global {
    namespace Express {
        interface Request {
            user : UserPayload
        }
    }
}   
import { Request } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

export interface UserPayload extends JwtPayload {
    userId : number;
    userName : string;
    userRole : UserRole;
    organizationId : number
}

export interface CreateOrganization extends JwtPayload {
    organizationId : number
    emailVerificationId : string
    purpose : string
}

declare global {
    namespace Express {
        interface Request {
            user : UserPayload;
            emailVerification : CreateOrganization
        }
    }
}   
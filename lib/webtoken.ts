import jwt from "jsonwebtoken";
const secretKey = "verylongpasswordforsecretkey";
const emptyKey = "Secret key not found";
import { type UserPayload } from "../types/authcookies";

export function generateToken(payload: UserPayload) {
  if (!secretKey) {
    throw new Error(emptyKey);
  }

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verifyToken(token: string): UserPayload | null {
  if (!secretKey) {
    throw new Error(emptyKey);
  }

  try {
    return jwt.verify(token, secretKey) as UserPayload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}

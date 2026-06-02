import jwt, { type JwtPayload } from "jsonwebtoken";
const secretKey = "verylongpasswordforsecretkey";
const emptyKey = "Secret key not found";

export function generateToken(payload: object) {
  if (!secretKey) {
    throw new Error(emptyKey);
  }
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload | null {
  if (!secretKey) {
    throw new Error(emptyKey);
  }

  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

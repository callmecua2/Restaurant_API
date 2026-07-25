import type { Request, Response } from "express";
import { HashPassword, ComparePassword } from "../../encryption/encryption";
import prisma from "../../lib/prisma";
import { UserRole, type Prisma } from "@prisma/client";



interface createUserPayload {
  username: string;
  password: string;
  email?: string;
  role: UserRole;
  status?: string;
}


export const createUser = async (
  req: Request<{}, {}, createUserPayload>,
  res: Response,
) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Missing required field",
      });
    }

    if (username.length < 6) {
      return res.status(400).json({ message: "Username is not long enough" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password is not long enough" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const auth = req.user
    const userRole = auth.userRole
    const organization = auth.organizationId;

  
    //cek jika user role adalah staff akan langsung tolak
    if (userRole === "STAFF") {
      return res.status(403).json({
        message: "Not Authorized User",
      });
    }


    //cek jika role ada dikirim tapi tidak ada di enum akan error
    if (
      role !== undefined &&
      !Object.values(UserRole).includes(role)
    ) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // cek jika role kosong atau null nilai default target jadi Staff, jika tidak nilai targetRole adalah role
    const targetRole = role ?? UserRole.STAFF

    //filter role apa saja yang boleh berdasarkan role user
    const allowedRoles: Record<UserRole, UserRole[]> = {
      OWNER: [UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF],
      MANAGER: [UserRole.MANAGER, UserRole.STAFF],
      STAFF: [],
    };

    const allowedRole = allowedRoles[userRole] ?? [];

    //validasi jika role yang dikirim ada atau tidak di role yang boleh diinput
    if (!allowedRole.includes(targetRole)) {
      return res.status(403).json({
        message: "Not Authorized User",
      });
    }

    const hashing = await HashPassword(password);

    const userDataToCreate: Prisma.UserCreateInput = {
      username,
      password: hashing,
      email,
      role : targetRole,
      userOrganization: {
        connect: {
          id: organization,
        },
      },
    };

   await prisma.user.create({
      data: userDataToCreate,
    });

    return res.status(201).json({
      message: "Success creating user",
      user: username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

import { db } from "@/lib/db";

export const getUserByEmail = async (email: any) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};
export const getFullInfoByUserId = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        enrollmentRequest: true,
        organization: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

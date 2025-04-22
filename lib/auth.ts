"use server";

import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};

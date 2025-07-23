"use server";

import { db } from "@/lib/db";

export async function getAllCategoryNames(): Promise<string[]> {
  const categories = await db.category.findMany({ select: { name: true } });
  return categories.map((cat) => cat.name);
}

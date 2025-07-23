"use server";

import { db } from "@/lib/db";
import { MenuItem } from "@/data/type";
import { getCategoryNameType } from "./getCategoryNameType";

const getCategoryMenu = async (categoryName: string, take: number = 5) => {
  const CategoryNameSchema = await getCategoryNameType();
  CategoryNameSchema.parse(categoryName); // Throws if invalid
  const items = await db.menu.findMany({
    where: { category: { name: categoryName } },
    take,
    orderBy: { order: "asc" },
    include: { category: true },
  });
  return items.map((item) => ({
    ...item,
    description: item.description ?? "",
    tag: item.tag ?? "",
    category: item.category?.name ?? "",
  }));
};

export default getCategoryMenu;

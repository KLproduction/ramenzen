import { db } from "@/lib/db";

export const getMenuItems = async () => {
  return await db.menu.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  });
};

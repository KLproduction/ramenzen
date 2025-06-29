"use server";

import { MenuItem } from "@/data/type";
import { db } from "@/lib/db";

export async function addSeedMenuAction(menuData: MenuItem[]) {
  const errors: string[] = [];

  for (const item of menuData) {
    let categoryRecord = null;
    try {
      if (item.category) {
        categoryRecord = await db.category.upsert({
          where: { name: item.category },
          update: {},
          create: { name: item.category },
        });
      }
      await db.menu.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          tag: item.tag,
          isAvailable: item.isAvailable,
          category: categoryRecord
            ? { connect: { id: categoryRecord.id } }
            : undefined,
          ingredients: item.ingredients,
          allergens: item.allergens,
          order: item.order,
          spicyLevel: item.spicyLevel,
          image: item.image,
        },
      });
    } catch (e) {
      console.error(
        `Failed to seed menu item '${item.name}': ${(e as Error).message}`,
      );
      errors.push(
        `Failed to seed menu item '${item.name}': ${(e as Error).message}`,
      );
    }
  }
  return { success: errors.length === 0, errors };
}

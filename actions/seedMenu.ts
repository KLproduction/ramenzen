"use server";

import { MenuItem } from "@/data/type";
import { db } from "@/lib/db";

import { blogDemo } from "@/data/blogDemo";

export async function addSeedMenuAction(menuData: MenuItem[]) {
  const errors: string[] = [];

  // Seed menu items
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

  // Seed blog posts
  for (const post of blogDemo) {
    try {
      await db.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          content: post.content,
          image: post.image,
          createdAt: new Date(post.createdAt),
          author: post.author,
          tags: post.tags,
        },
        create: {
          title: post.title,
          content: post.content,
          image: post.image,
          slug: post.slug,
          createdAt: new Date(post.createdAt),
          author: post.author,
          tags: post.tags,
        },
      });
    } catch (e) {
      console.error(
        `Failed to seed blog post '${post.title}': ${(e as Error).message}`,
      );
      errors.push(
        `Failed to seed blog post '${post.title}': ${(e as Error).message}`,
      );
    }
  }

  return { success: errors.length === 0, errors };
}

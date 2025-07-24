"use server";
// Type guard for TagEnum
function isTagEnum(value: string): value is TagEnum {
  return Object.values(TagEnum).includes(value as TagEnum);
}

import { TagEnum } from "@prisma/client";
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
      // Upsert the blog post (without tags)
      const blogPost = await db.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          content: post.content,
          image: post.image,
          createdAt: new Date(post.createdAt),
          author: post.author,
        },
        create: {
          title: post.title,
          content: post.content,
          image: post.image,
          slug: post.slug,
          createdAt: new Date(post.createdAt),
          author: post.author,
        },
      });

      // Remove existing tags for this post (to avoid duplicates)
      await db.blogPostTag.deleteMany({ where: { blogPostId: blogPost.id } });

      // Add tags via join table
      if (Array.isArray(post.tags)) {
        for (const tag of post.tags) {
          if (isTagEnum(tag)) {
            await db.blogPostTag.create({
              data: {
                blogPostId: blogPost.id,
                tag,
              },
            });
          } else {
            console.warn(`Invalid tag '${tag}' for blog post '${post.title}'`);
          }
        }
      }
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

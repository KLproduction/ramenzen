import { PrismaClient, TagEnum } from "@prisma/client";
import { MenuItem } from "@/data/type";

import { blogDemo } from "@/data/blogDemo";
import {
  ramenMenu,
  starterMenu,
  mainCourseMenu,
  dessertMenu,
  softDrinksMenu,
  chineseDishesMenu,
  starterSaltPepperMenu,
  blackBeanSauceMenu,
  stirFryMenu,
} from "@/data/menu";

const prisma = new PrismaClient();

export const menuDemo = [
  ...ramenMenu,
  ...starterMenu,
  ...mainCourseMenu,
  ...dessertMenu,
  ...softDrinksMenu,
  ...chineseDishesMenu,
  ...starterSaltPepperMenu,
  ...blackBeanSauceMenu,
  ...stirFryMenu,
] as const;

async function main() {
  /** 1. 先處理分類，記住 id 以便重用 */
  const categoryCache = new Map<string, string>();

  for (const item of menuDemo as MenuItem[]) {
    let categoryId: string | undefined;

    if (item.category) {
      if (categoryCache.has(item.category)) {
        categoryId = categoryCache.get(item.category);
      } else {
        const cat = await prisma.category.upsert({
          where: { name: item.category },
          update: {}, // 不用更新欄位
          create: { name: item.category },
        });
        categoryCache.set(item.category, cat.id);
        categoryId = cat.id;
      }
    }

    /** 2. Upsert menu，確保可重複執行 */
    await prisma.menu.upsert({
      where: { name: item.name },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        tag: item.tag,
        isAvailable: item.isAvailable,
        ingredients: item.ingredients,
        allergens: item.allergens,
        order: item.order,
        spicyLevel: item.spicyLevel,
        image: item.image,
        categoryId,
      },
      create: {
        id: item.name,
        name: item.name,
        description: item.description,
        price: item.price,
        tag: item.tag,
        isAvailable: item.isAvailable,
        ingredients: item.ingredients,
        allergens: item.allergens,
        order: item.order,
        spicyLevel: item.spicyLevel,
        image: item.image,
        ...(categoryId ? { categoryId } : {}),
      },
    });
  }

  /** 3. Upsert blog posts and tags (many-to-many) */
  for (const post of blogDemo) {
    // Upsert the blog post itself
    const blog = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        content: post.content,
        image: post.image,
        createdAt: new Date(post.createdAt),
        author: post.author,
      },
      create: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
        image: post.image,
        createdAt: new Date(post.createdAt),
        author: post.author,
      },
    });

    await prisma.blogPostTag.deleteMany({ where: { blogPostId: blog.id } });

    if (Array.isArray(post.tags)) {
      const validTags = [
        "RAMEN",
        "SUSHI",
        "UDON",
        "SOBA",
        "DONBURI",
        "TEMPURA",
        "KATSU",
        "CURRY",
        "YAKITORI",
        "OKONOMIYAKI",
        "TAKOYAKI",
        "MOCHI",
        "MATCHA",
        "BENTO",
        "GYOZA",
        "MISO",
        "ONSEN_TAMAGO",
        "SHABU_SHABU",
        "SUKIYAKI",
        "TSUKEMONO",
      ];
      for (const tag of post.tags) {
        if (validTags.includes(tag)) {
          await prisma.blogPostTag.create({
            data: {
              blogPostId: blog.id,
              tag: tag as TagEnum,
            },
          });
        }
      }
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

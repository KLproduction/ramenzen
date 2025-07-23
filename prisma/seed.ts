import { PrismaClient } from "@prisma/client";
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

  /** 3. Upsert blog posts */
  await Promise.all(
    blogDemo.map((post) =>
      prisma.blogPost.upsert({
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
          id: post.id,
          slug: post.slug,
          title: post.title,
          content: post.content,
          image: post.image,
          createdAt: new Date(post.createdAt),
          author: post.author,
          tags: post.tags,
        },
      }),
    ),
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { db } from "@/lib/db";

export async function getBlogPosts() {
  return await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

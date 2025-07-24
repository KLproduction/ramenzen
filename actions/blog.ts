import { db } from "@/lib/db";

export async function getBlogPosts() {
  return await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  return await db.blogPost.findUnique({
    where: { slug },
  });
}

// Get recent blog posts (limit 5)
export async function getRecentBlogPosts() {
  return await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, title: true, slug: true },
  });
}

// Get all unique blog categories
export async function getAllBlogCategories() {
  // Get all unique tags from BlogPostTag join table
  const tags = await db.blogPostTag.findMany({
    select: { tag: true },
    distinct: ["tag"],
  });
  return tags.map((t) => t.tag);
}

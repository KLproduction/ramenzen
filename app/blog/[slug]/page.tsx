import BlogContent from "./components/BlogContent";
import RecentPosts from "./components/RecentPosts";
import Categories from "./components/Categories";
import HelpCard from "./components/HelpCard";
import CommentForm from "./components/CommentForm";

import {
  getBlogPostBySlug,
  getRecentBlogPosts,
  getAllBlogCategories,
} from "@/actions/blog";
import BlogHeader from "./components/BlogHeader";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch post, recent posts, and categories from the database
  const post = await getBlogPostBySlug(params.slug);
  const recentPosts = await getRecentBlogPosts();
  const categories = await getAllBlogCategories();

  if (!post) {
    return (
      <div className="py-24 text-center text-2xl text-zinc-400">
        Post not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <BlogHeader post={post} />
      <div className="mx-auto flex w-full flex-col gap-8 py-12 md:flex-row md:gap-12">
        <aside className="sticky top-24 gap-6 self-start md:w-1/4">
          <RecentPosts posts={recentPosts} />
          <HelpCard />
        </aside>
        <main className="flex-1">
          <BlogContent post={post} />
          <CommentForm />
        </main>
      </div>
    </div>
  );
}

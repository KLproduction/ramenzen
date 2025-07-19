"use client";
import Link from "next/link";
import { useBlogPosts } from "../../react-query/useBlogPosts";

export default function BlogPage() {
  const { data: blogPosts, isLoading, isError } = useBlogPosts();

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Blog</h1>
      {isLoading && <div className="text-center">Loading...</div>}
      {isError && (
        <div className="text-center text-red-500">
          Failed to load blog posts.
        </div>
      )}
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {blogPosts?.map((post) => (
          <Link
            key={post.id || post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg bg-white/10 p-6 shadow hover:bg-white/20"
          >
            <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-300">{post.content}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import { db } from "../../../lib/db";

interface BlogPostPageProps {
  params: { id: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await db.blogPost.findUnique({
    where: { slug: params.id },
  });

  if (!post) return notFound();

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">{post.title}</h1>
      <img
        src={post.src}
        alt={post.title}
        className="mx-auto mb-8 max-w-xl rounded-lg"
      />
      <div className="mx-auto max-w-2xl rounded-lg bg-white/10 p-6 text-lg text-gray-200 shadow">
        {post.content}
      </div>
    </main>
  );
}

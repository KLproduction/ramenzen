import { BlogPost } from "@prisma/client";
import Image from "next/image";
import React from "react";

type BlogContentProps = {
  post: BlogPost;
};

const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex flex-col items-center justify-center py-8">
        <article className="prose prose-lg mx-auto py-8">
          <h1 className="mb-6 text-3xl font-bold text-zinc-800">
            {post.title}
          </h1>
          <div className="whitespace-pre-line text-zinc-800">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogContent;

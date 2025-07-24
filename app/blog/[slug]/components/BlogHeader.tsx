import { BlogPost } from "@prisma/client";
import React from "react";

type Props = {
  post: BlogPost;
};

const BlogHeader = ({ post }: Props) => {
  // Try to get tags from post.blogPostTags (relation), fallback to post.tags (array)
  // blogPostTags: { tag: string }[]
  // tags: string[]
  const tags = (post as any).blogPostTags
    ? (post as any).blogPostTags.map((t: any) => t.tag)
    : (post as any).tags || [];

  return (
    <div className="aspect-video relative flex w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      <h1 className="mb-4 max-w-3xl break-words text-center text-3xl font-bold text-zinc-900 drop-shadow-lg dark:text-zinc-100 md:text-5xl">
        {post.title}
      </h1>
      <span className="text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
        {new Date(post.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-300/60 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogHeader;

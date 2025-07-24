import React from "react";

type RecentPostsProps = {
  posts: { id: string | number; title: string }[];
};

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <aside className="mb-8 rounded-lg bg-yellow-100 p-4 shadow">
      <h2 className="mb-2 text-lg font-semibold text-yellow-700">
        Recent Posts
      </h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-1">
            <a
              href={`/blog/${post.id}`}
              className="text-yellow-800 hover:underline"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RecentPosts;

import React from "react";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="relative h-full min-h-screen w-full">
      <div className="px-4 pt-24 md:px-8 lg:px-16">
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default BlogLayout;

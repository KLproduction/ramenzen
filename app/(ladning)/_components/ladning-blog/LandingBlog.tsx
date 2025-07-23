import { Carousel } from "@/components/ui/carousel";
import React from "react";
import { blogDemo } from "@/data/blogDemo";

type Props = {};

const LandingBlog = (props: Props) => {
  const slides = blogDemo.map((post) => ({
    title: post.title,
    content: post.content,
    src: post.image,
  }));
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-yellow-400">
      <div className="flex h-full w-full flex-col items-center">
        <h1 className="absolute left-12 top-4 mt-8 scale-y-150 text-2xl font-bold text-yellow-200 drop-shadow-lg md:text-6xl lg:text-8xl">
          Blog & Events
        </h1>
        <div className="relative h-full w-full overflow-hidden py-32">
          <Carousel slides={slides} />
        </div>
      </div>
    </div>
  );
};

export default LandingBlog;

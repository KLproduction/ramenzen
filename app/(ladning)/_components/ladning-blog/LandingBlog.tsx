import { Carousel } from "@/components/ui/carousel";
import React from "react";

type Props = {};

const LandingBlog = (props: Props) => {
  const slideData = [
    {
      title: " Ramen: Not Just Instant Noodles",
      content:
        "Forget the supermarket shelf packets — real ramen is crafted. In our kitchen, noodles are freshly made every day. Whether it’s classic Hakata-style tonkotsu or a rich miso base, every bowl starts with care.",
      src: "/blog/blog1.jpg",
    },
    {
      title: "A British Twist on a Japanese Classic",
      content:
        "We’ve noticed our UK customers love bold, warming flavours — think spicy miso, crispy fried chicken toppings, and even vegan broths with oat milk. Some regulars even pair ramen with a pint (hello, ramen-themed IPA and pilsner from photo 3).Fusion moment: Ever tried ramen with black pudding topping? It’s... better than you think.",
      src: "/blog/blog2.jpg",
    },
    {
      title: "Ramen + Beer = Match Made in Izakaya Heaven",
      content:
        "Nothing says Friday night like slurping noodles with a cold can of Monsutā or our local collab craft beer.",
      src: "/blog/blog3.PNG",
    },
    {
      title: "Noodle Nights Are the New Date Nights",
      content:
        "More and more couples are choosing ramen for casual dinner dates. It’s social, it’s shareable, and it’s just messy enough to break the ice.",
      src: "/blog/blog4.jpg",
    },
    {
      title: "Ramen Is Instagram Gold",
      content:
        "A beautiful bowl of ramen  with perfect toppings — think soy-marinated egg, nori, spring onions — is food and art. Don’t forget to tag us @RamenZen for a chance to be featured on our wall of fame!",
      src: "/blog/blog5.jpg",
    },
  ];
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-yellow-400">
      <div className="flex h-full w-full flex-col items-center">
        <h4 className="mt-8 text-4xl md:text-6xl">Blog & Events</h4>
        <div className="relative h-full w-full overflow-hidden py-20">
          <Carousel slides={slideData} />
        </div>
      </div>
    </div>
  );
};

export default LandingBlog;

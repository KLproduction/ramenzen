import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Soup & Ramen",
    subtitle: "拉麵",
    image: "/1.png",
    bgColor: "bg-stone-800",
    textColor: "text-yellow-400",
    href: "/1.png",
  },
  {
    title: "Fried Noodles",
    subtitle: "焼きそば",
    image: "/2.png",
    bgColor: "bg-stone-800",
    textColor: "text-yellow-400",
    href: "/2.png",
  },
  {
    title: "Katsu Curry",
    subtitle: "カレーライス",
    image: "/3.png",
    bgColor: "bg-stone-800",
    textColor: "text-yellow-400",
    href: "/3.png",
  },
];

export default function Category() {
  return (
    <div className="min-h-[80vh] overflow-auto bg-yellow-400 py-10">
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid max-w-[80%] grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className={`relative flex flex-col justify-between p-12 ${cat.bgColor} ${
                cat.textColor || "text-yellow-400"
              } group min-h-[500px] w-auto overflow-hidden rounded-2xl shadow-xl brightness-100 transition-transform hover:z-50 hover:scale-105 hover:brightness-110`}
            >
              <div>
                <p className="mb-3 text-lg font-bold">{cat.subtitle}</p>
                <h2 className="caption2 font-serif text-6xl leading-tight">
                  {cat.title}
                </h2>
                <div className="opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
                  <span className="mr-3"> See More</span>
                  <span className="mt-6 inline-block -rotate-45 text-xl">
                    →
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-[70%] left-1/2 right-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:-bottom-[80%]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  layout="fill"
                  objectFit="contain"
                  className="group-hover:animate-slow-spin"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

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
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      className="relative hidden h-[150vh] overflow-hidden bg-yellow-400 py-10 md:block"
      ref={targetRef}
    >
      <motion.img
        src="/inShop2.PNG"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-75"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-400/0 to-yellow-400" />
      <motion.div
        className="absolute top-[20%] w-full text-center"
        style={{ scale: 2 }}
      >
        <h4 className="text-9xl font-bold text-yellow-400 opacity-70">MENU</h4>
      </motion.div>
      <div className="z-20 flex h-full flex-col items-center justify-center">
        <div className="flex h-full w-full items-center justify-center">
          <motion.div className="grid max-w-[80%] grid-cols-1 gap-6 md:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileInView={{ rotate: [0, 0, 0, 0, 0], opacity: [0, 1] }}
                transition={{
                  duration: 0.5 * (i + 0.5),
                  ease: [0.65, 0, 0.35, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link
                  href={cat.href}
                  className={`relative flex flex-col justify-between bg-black/75 p-12 backdrop-blur-sm ${
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

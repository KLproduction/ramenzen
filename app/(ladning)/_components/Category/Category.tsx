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
    textColor: "text-zinc-50",
  },
  {
    title: "Fried Noodles",
    subtitle: "焼きそば",
    image: "/2.png",
    bgColor: "bg-stone-800",
    textColor: "text-zinc-50",
  },
  {
    title: "Katsu Curry",
    subtitle: "カレーライス",
    image: "/3.png",
    bgColor: "bg-stone-800",
    textColor: "text-zinc-50",
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
      className="relative hidden h-full overflow-hidden py-10"
      ref={targetRef}
    >
      <div className="z-20 flex h-full flex-col items-center justify-center">
        <div className="flex h-full w-full items-center justify-center">
          <motion.div className="flex min-h-screen w-full flex-col gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.5 * (i + 0.5),
                  ease: [0.65, 0, 0.35, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className={`relative flex h-screen flex-col justify-between p-12 backdrop-blur-sm ${
                    cat.textColor || "text-yellow-400"
                  } group min-h-[500px] w-auto overflow-hidden rounded-2xl shadow-xl brightness-100 transition-transform`}
                >
                  <div>
                    <p className="mb-3 text-lg font-bold">{cat.subtitle}</p>
                    <h2 className="caption2 font-serif text-6xl leading-tight">
                      {cat.title}
                    </h2>
                  </div>
                  <div className="absolute bottom-1/2 right-0 top-1/2 h-96 w-96 -translate-x-1/2 transition-all duration-500 group-hover:-bottom-[80%]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      layout="fill"
                      objectFit="contain"
                      className="group-hover:animate-slow-spin"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

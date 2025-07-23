"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { useCategoryMenu } from "@/react-query/useCategoryMenu";
import { formattedPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Soup & Ramen",
    subtitle: "拉麵",
    image: "/1.png",
    bgColor: "bg-stone-800",
    textColor: "text-zinc-800",
    pColor: "text-zinc-500",
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
    textColor: "text-zinc-800",
    pColor: "text-zinc-500",
    href: "/3.png",
  },
];

export default function CategoryNav() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [cardIndex, setCardIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const RenderMenuItems = (index: number) => {
    const ramenCategory = "Ramen";
    const stirFryCategory = "Stir Fry";
    const mainCourseCategory = "Main Course";
    const {
      data: ramenMenu = [],
      isLoading: ramenLoading,
      error: ramenError,
    } = useCategoryMenu(ramenCategory, 5);
    const {
      data: stirFryMenu = [],
      isLoading: stirFryLoading,
      error: stirFryError,
    } = useCategoryMenu(stirFryCategory, 5);
    const {
      data: mainCourseMenu = [],
      isLoading: mainCourseLoading,
      error: mainCourseError,
    } = useCategoryMenu(mainCourseCategory, 5);
    // Select menu data based on index
    let col;
    if (index === 0) {
      col = { menu: ramenMenu, loading: ramenLoading, error: ramenError };
    } else if (index === 1) {
      col = { menu: stirFryMenu, loading: stirFryLoading, error: stirFryError };
    } else {
      col = {
        menu: mainCourseMenu,
        loading: mainCourseLoading,
        error: mainCourseError,
      };
    }

    return (
      <motion.ul className={"relative w-full rounded-xl p-8"}>
        {col.loading ? (
          <li className="text-center text-zinc-400">Loading...</li>
        ) : col.error ? (
          <li className="text-center text-red-500">
            {col.error.message.includes("Invalid enum value")
              ? "Invalid category name. Please check your database for valid category names."
              : col.error.message}
          </li>
        ) : col.menu.length === 0 ? (
          <li className="text-center text-zinc-400">No items found.</li>
        ) : (
          col.menu.map((item) => {
            const safeItem = {
              ...item,
              order: item.order ?? 0,
              spicyLevel: item.spicyLevel ?? 0,
            };
            return (
              <motion.li
                key={safeItem.name}
                className="mb-8 last:mb-0"
                onViewportEnter={() => setCardIndex(index)}
              >
                <div className="mb-1 flex flex-col items-start justify-between md:flex-row">
                  <span
                    className={cn(
                      "text-lg font-bold md:text-xl lg:text-2xl",
                      cardIndex === 1 ? "text-yellow-400" : "text-zinc-800",
                    )}
                  >
                    {safeItem.name}
                  </span>
                  <span
                    className={cn(
                      "text-md font-bold md:text-2xl",
                      cardIndex === 1 ? "text-zinc-50" : "text-zinc-800",
                    )}
                  >
                    {formattedPrice(safeItem.price)}
                  </span>
                </div>
                <p
                  className={cn(
                    "lg:text-md text-xs md:text-sm",
                    cardIndex === 1 ? "text-zinc-50" : "text-zinc-600",
                  )}
                >
                  {safeItem.description}
                </p>
              </motion.li>
            );
          })
        )}
      </motion.ul>
    );
  };

  return (
    <section className="mx-auto h-full w-full overflow-auto" ref={targetRef}>
      <motion.div
        className="flex h-full w-full flex-col items-center justify-center"
        style={{
          backgroundColor:
            cardIndex === 0 ? "black" : cardIndex === 1 ? "blue" : "yellow",
        }}
        initial={{ backgroundColor: "black" }}
        animate={{
          backgroundColor:
            cardIndex === 0
              ? "#facc15"
              : cardIndex === 1
                ? "#000000"
                : "#facc15",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="flex h-full w-full max-w-7xl items-center justify-center">
          <div className="flex flex-col gap-6 md:w-full">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-center gap-12 p-12 ${
                  cat.textColor || "text-yellow-400"
                } group h-full min-h-[100vh] overflow-hidden brightness-100 transition-transform`}
              >
                <div>
                  <p
                    className={`mb-3 scale-y-125 text-2xl font-bold opacity-80 ${cat.textColor}`}
                  >
                    {cat.subtitle}
                  </p>
                  <h2 className="caption2 font-serif text-4xl leading-tight">
                    {cat.title}
                  </h2>
                </div>
                <div className="relative">
                  <div>
                    <div className="pointer-events-none absolute bottom-1/2 right-1/2 top-1/2 h-96 w-96 -translate-y-1/2 opacity-50 transition-all duration-500 md:right-0">
                      <motion.img
                        src={cat.image}
                        alt={cat.title}
                        className="object-cover"
                        style={{ rotate }}
                      />
                    </div>
                  </div>
                  {RenderMenuItems(i)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

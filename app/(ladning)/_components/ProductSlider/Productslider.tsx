"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./product-slider.css";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const ProductSlider = () => {
  const [active, setActive] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<NodeListOf<HTMLDivElement>>();
  const circleRef = useRef<HTMLDivElement>(null);
  const [widthItem, setWidthItem] = useState(0);

  const count = 5;
  const titles = [
    "Chashu Ramen",
    "Lasksa Seafood Ramen",
    "Pork Katsu Curry with Rice",
    "Seafood Ramen",
    "Yakimeshi",
  ];
  const headingText = useMemo(() => {
    return titles[active] || "RAMEN ZEN";
  }, [active]);

  useEffect(() => {
    if (listRef.current) {
      itemsRef.current = listRef.current.querySelectorAll(".item");
      const width = itemsRef.current?.[active]?.offsetWidth || 0;
      setWidthItem(width);
    }
  }, [active]);

  const runCarousel = () => {
    if (itemsRef.current) {
      itemsRef.current.forEach((item, index) => {
        item.classList.toggle("active", index === active);
      });

      const leftTransform = widthItem * (active - 1) * -1;
      if (listRef.current) {
        listRef.current.style.transform = `translateX(${leftTransform}px)`;
      }
    }
  };

  useEffect(() => {
    runCarousel();
  }, [active, widthItem]);

  const handleNext = () => {
    setActive((prev) => (prev >= count - 1 ? count - 1 : prev + 1));
  };

  const handlePrev = () => {
    setActive((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  useEffect(() => {
    if (circleRef.current) {
      const text = circleRef.current.innerText.split("");
      circleRef.current.innerText = "";
      text.forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = char;
        const rotate = (360 / text.length) * (index + 1);
        span.style.setProperty("--rotate", `${rotate}deg`);
        circleRef.current?.appendChild(span);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-yellow-400">
      <motion.div
        className="absolute left-[5%] top-[20%] z-10"
        style={{ scaleY: 2 }}
      >
        <h1 className="scale-y-150 text-end text-2xl font-bold text-yellow-200 opacity-70 drop-shadow-xl lg:text-6xl">
          OUR POPULAR
        </h1>
      </motion.div>
      <div className="slider h-full">
        <motion.div className="list" ref={listRef}>
          <div className="item">
            <img src="1.png" />
          </div>
          <div className="item active">
            <img src="2.png" />
          </div>
          <div className="item">
            <img src="3.png" />
          </div>
          <div className="item">
            <img src="4.png" />
          </div>
          <div className="item">
            <img src="5.png" />
          </div>
        </motion.div>
        <div
          className="circle sm:text-md text-[5px] md:text-lg"
          ref={circleRef}
        >
          Discover the true taste of Japan in the heart of Bristol. At Ramen Zen
        </div>
        <div className="content">
          <AnimatePresence mode="wait">
            <motion.h4
              key={active}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="mb-8 text-xs text-zinc-800 md:text-4xl"
            >
              {headingText}
            </motion.h4>
          </AnimatePresence>
          <Button className="bg-zinc-800" size={"lg"}>
            <h4 className="text-zinc-50">Menu</h4>
          </Button>
        </div>
        <div className="arow">
          <button id="prev" onClick={handlePrev}>
            {"<"}
          </button>
          <button id="next" onClick={handleNext}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;

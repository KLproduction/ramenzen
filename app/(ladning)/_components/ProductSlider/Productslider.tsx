"use client";

import { useEffect, useRef, useState } from "react";
import "./product-slider.css";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ProductSlider = () => {
  const [active, setActive] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<NodeListOf<HTMLDivElement>>();
  const circleRef = useRef<HTMLDivElement>(null);
  const [widthItem, setWidthItem] = useState(0);

  const count = 5;

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
    <div className="relative min-h-screen w-full bg-zinc-900">
      <motion.div
      // whileInView={{ x: ["-90%", 0], opacity: [0, 1] }}
      // transition={{
      //   duration: 1.5,

      //   ease: [0.65, 0, 0.35, 1],
      // }}
      >
        <div className="caption2 absolute left-[10%] top-[10%] z-10">
          <h1 className="text-5xl text-zinc-50 drop-shadow-xl lg:text-8xl">
            POPULAR
          </h1>
        </div>
        <div className="slider">
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
          <div className="circle sm:text-md text-xs md:text-lg" ref={circleRef}>
            Discover the true taste of Japan in the heart of Bristol. At Ramen
            Zen
          </div>
          <div className="content">
            <h1 className="caption text-4xl text-zinc-800 sm:text-6xl">
              RAMEN ZEN
            </h1>
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
      </motion.div>
    </div>
  );
};

export default ProductSlider;

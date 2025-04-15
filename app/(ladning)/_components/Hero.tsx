"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const noColorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const colorOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 0.9],
    ["200px", "200px", "0%", "0%"],
  );
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1, 2, 50]);

  const bgColorOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 1]);

  return (
    <section className={cn("h-[875vh] w-full")} ref={targetRef}>
      <motion.div className="sticky top-0 flex h-screen w-full items-start justify-center overflow-hidden bg-zinc-800">
        <div className="relative top-[55%] h-full w-full">
          <motion.img
            src="ramen_noColor_noBG.png"
            alt=""
            style={{
              opacity: noColorOpacity,
            }}
            className={cn(
              "absolute left-1/2 top-0 z-10 w-2/3 -translate-x-1/2 -translate-y-1/2 bg-black/10 lg:w-1/2",
            )}
          />
          <motion.img
            src="ramen_color_noBG.png"
            alt=""
            style={{
              opacity: colorOpacity,
            }}
            className="absolute left-1/2 top-0 z-10 w-2/3 -translate-x-1/2 -translate-y-1/2 bg-black/10 lg:w-1/2"
          />
          <motion.div
            className="absolute left-[25%] top-24 z-10 -translate-y-1/2 rounded-full sm:left-1/2 sm:-translate-x-1/2 md:left-1/3"
            style={{
              opacity: textOpacity,
              // y: textY,
              scale: scale,
            }}
          >
            <h1 className="caption pointer-events-none overflow-hidden text-center text-2xl text-yellow-400 md:text-4xl lg:text-6xl">
              RAMEN ZEN
            </h1>
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 z-[9999] min-h-screen min-w-full bg-yellow-400"
          style={{
            opacity: bgColorOpacity,
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;

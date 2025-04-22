"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/modal";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Hero = () => {
  const { open } = useBookingModal();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const noColorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const colorOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 0.9],
    ["200px", "200px", "0%", "0%"],
  );
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1, 2, 50]);

  const bgColorOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 1]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0],
  );

  return (
    <section className={cn("h-[300vh] w-full")} ref={targetRef}>
      <motion.div className="sticky top-0 flex h-screen w-full items-start justify-center overflow-hidden bg-zinc-800">
        <div className="relative h-full w-full">
          <motion.img
            src="dashes.svg"
            alt=""
            style={{
              opacity: noColorOpacity,
            }}
            className={cn(
              "absolute inset-0 z-10 h-full w-full object-cover brightness-75",
            )}
          />
          <motion.img
            src="dashes.png"
            alt=""
            style={{
              opacity: colorOpacity,
            }}
            className="absolute inset-0 z-10 h-full w-full object-cover brightness-75"
          />
        </div>
        <div className="pointer-events-none absolute left-0 top-0 z-20 flex h-[100vh] w-full items-center justify-center">
          <motion.div
            style={{
              opacity: textOpacity,
              scale: scale,
            }}
          >
            <h1 className="caption text-center text-2xl text-yellow-400 md:text-4xl lg:text-6xl">
              RAMENZEN
            </h1>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 z-[999] min-h-screen min-w-full bg-yellow-400"
          style={{
            opacity: bgColorOpacity,
          }}
        />
      </motion.div>
      {/* scroll icon */}
      <motion.div
        className="pointer-events-none sticky bottom-10 left-1/2 right-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{
          opacity: scrollIndicatorOpacity,
        }}
      >
        <div className="flex flex-col items-center justify-center gap-3 text-yellow-400">
          <h4 className="text-2xl md:text-4xl">SCROLL</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

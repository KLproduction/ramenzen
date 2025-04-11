import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

type Props = {};

const Hero = (props: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const noColorOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const colorOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.25], ["200px", "0%"]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [1, 1, 10, 500],
  );

  return (
    <section className={cn("h-[700vh] w-full")} ref={targetRef}>
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
            className="absolute left-1/3 top-24 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              opacity: textOpacity,
              y: textY,
              scale: scale,
            }}
          >
            <h1 className="caption overflow-hidden text-4xl font-bold text-yellow-400 sm:text-8xl">
              RAMEN ZEN
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

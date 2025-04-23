"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const images = [
  "roll1.PNG",
  "roll2.PNG",
  "roll3.PNG",
  "roll4.PNG",
  "roll5.PNG",
  "roll6.PNG",
  "roll7.PNG",
  "roll8.PNG",
  "roll9.PNG",
  "roll10.PNG",
  "roll11.PNG",
  "roll12.PNG",
  "roll13.PNG",
  "roll14.PNG",
];

const RollingGroup = ({
  images,
  scrollYProgress,
  reverse = false,
}: {
  images: string[];
  scrollYProgress: any;
  reverse?: boolean;
}) => {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["0%", "80%"] : ["0%", "-80%"],
  );

  return (
    <div className="relative h-full w-full">
      <motion.div
        style={{ x }}
        className={`absolute top-0 ${reverse ? "right-0 justify-end" : "left-0"} flex w-fit gap-2 rounded-full sm:gap-3 md:gap-4`}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={`/rolling/${img}`}
            alt={img.replace(".PNG", "")}
            className="h-[150px] w-[150px] shrink-0 rounded-lg object-cover sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] md:rounded-xl lg:h-[400px] lg:w-[400px] lg:rounded-2xl"
          />
        ))}
      </motion.div>
    </div>
  );
};

const RollingBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const firstHalf = images.slice(0, isMobile ? 5 : 7);
  const secondHalf = images.slice(isMobile ? 5 : 7, 14);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const BGOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0, 0.5, 0.5, 0],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 1, isMobile ? 1.2 : 1.5],
  );

  return (
    <section
      ref={targetRef}
      className="relative h-[200vh] w-full overflow-hidden bg-yellow-400"
    >
      <motion.div
        className={cn(
          "sticky flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden p-4 sm:gap-6 sm:p-6 md:gap-8 md:p-8 lg:gap-10 lg:p-12",
          isMobile ? "top-24" : "top-0",
        )}
        style={{
          opacity: BGOpacity,
          scale: scale,
        }}
      >
        <RollingGroup images={firstHalf} scrollYProgress={scrollYProgress} />
        <RollingGroup
          images={secondHalf}
          scrollYProgress={scrollYProgress}
          reverse
        />
      </motion.div>
    </section>
  );
};

export default RollingBar;

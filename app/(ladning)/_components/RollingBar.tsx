"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { InfoBar } from "./info-bar/InfoBar";

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
    reverse ? ["0%", "60%"] : ["0%", "-60%"],
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        style={{ x }}
        className={`absolute top-0 ${reverse ? "right-0 justify-end" : "left-0"} flex w-fit gap-2 rounded-full sm:gap-3 md:gap-4`}
      >
        {images.map((img, i) => (
          <motion.img
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
    [0, 0.7, 0.9, 0],
  );

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, isMobile ? 1 : 1]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] w-full bg-yellow-400"
    >
      <motion.div
        className={cn(
          "sticky flex h-screen w-full flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10",
          isMobile ? "top-24" : "top-0",
        )}
        style={{
          opacity: BGOpacity,
        }}
      >
        <RollingGroup images={firstHalf} scrollYProgress={scrollYProgress} />

        <RollingGroup
          images={secondHalf}
          scrollYProgress={scrollYProgress}
          reverse
        />
        <div className="pointer-events-none absolute bottom-1/2 left-1/2 right-1/2 top-[15%] z-10 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:top-[32%] md:top-[43%] lg:top-[45%]">
          <div className="sticky h-full w-full">
            <motion.div className="mx-12" style={{ scale: scale }}>
              <InfoBar />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RollingBar;

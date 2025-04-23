"use client";

import { useCountUp } from "@/hooks/global";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";

export const InfoBarMobile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasTriggered, setHasTriggered] = useState(false);

  if (isInView && !hasTriggered) setHasTriggered(true);

  const experience = useCountUp(15, hasTriggered);
  const customers = useCountUp(800, hasTriggered);
  const menu = useCountUp(83, hasTriggered);
  const awards = useCountUp(10, hasTriggered);

  const stats = [
    { value: experience, label: "Years Experience" },
    { value: customers, label: "Happy Customers" },
    { value: menu, label: "Creative Menu" },
    { value: awards, label: "Award" },
  ];

  return (
    <div className="h-16 overflow-hidden bg-zinc-700 py-6 text-yellow-400 md:hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto w-full"
      >
        <motion.div
          className="flex min-w-fit items-center justify-center gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...stats, ...stats].map((stat, idx) => (
            <div
              key={idx}
              className="my-auto w-24 flex-shrink-0 text-center md:w-72"
            >
              <p className="text-sm font-bold md:text-4xl">{stat.value}+</p>
              <p className="font-[cursive] text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

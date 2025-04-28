"use client";

import { useCountUp } from "@/hooks/global";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const InfoBar = () => {
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto w-full max-w-6xl rounded-[30px] bg-black/75 px-4 py-8 text-center text-yellow-400 backdrop-blur-sm md:px-8"
    >
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:flex md:items-center md:justify-between">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="w-full px-4 md:flex-1 md:border-r md:border-pink-200/20 md:last:border-none"
          >
            <p className="text-md font-bold md:text-3xl lg:text-4xl">
              {stat.value}+
            </p>
            <p className="font-[cursive] text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

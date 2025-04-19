"use client";

import { useCountUp } from "@/hooks/global";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const InfoBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger once when 30% in view
  const [hasTriggered, setHasTriggered] = useState(false);

  // Start count-up only once when in view
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
      className="md:px-100 mx-auto flex max-w-6xl items-center justify-between rounded-[50px] bg-[#2d333f] px-4 py-8 text-center text-yellow-400"
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex-1 border-r border-pink-200/20 px-4 last:border-none"
        >
          <p className="text-3xl font-semibold">{stat.value}+</p>
          <p className="font-[cursive] text-sm">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
};

"use client";

import MyContainer from "@/components/Container";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const About = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.section
      ref={targetRef}
      className="relative h-screen w-full overflow-hidden bg-yellow-400"
    >
      {/* <div className="absolute right-0 top-0 z-10 h-24 w-full bg-zinc-500">
        <MyContainer>
          <div className="flex h-full items-center justify-between">
            <div>HOME</div>
            <div>HOME</div>
            <div>HOME</div>
            <div>HOME</div>
          </div>
        </MyContainer>
      </div> */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 bg-zinc-800"
        // initial={{ x: "150%" }}
        whileInView={{ x: ["-99.9%", 0] }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div className="relative h-full w-full">
          <div className="absolute bottom-0 left-1/2 h-1/3 w-1/2 -translate-x-1/2">
            <Image src={"/about-ramen.png"} alt="ramen" fill />
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute right-0 top-0 h-full w-1/2 bg-yellow-400">
        2
      </motion.div>
    </motion.section>
  );
};

export default About;

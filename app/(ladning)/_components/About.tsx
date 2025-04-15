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
  const characters = ["手", "打", "ち", "麺"];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // Delay between each character
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.section
      ref={targetRef}
      className="relative h-screen w-full overflow-hidden bg-zinc-800"
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
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div className="relative h-full w-full">
          <img
            src="/about-ramen.png"
            className="h-full w-auto object-cover opacity-50"
            alt=""
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="flex flex-col items-center justify-center text-zinc-50"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.5 }}
            >
              {characters.map((char, i) => (
                <motion.div
                  key={i}
                  className="z-20 text-8xl font-bold"
                  variants={charVariants}
                >
                  {char}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-yellow-400"
        whileInView={{ x: ["99.9%", 0] }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <article className="flex justify-center px-6 py-12 text-zinc-800">
            <div className="max-w-xl space-y-6 text-center">
              <h3 className="text-lg font-semibold italic text-zinc-800">
                RamenZen history
              </h3>
              <h4 className="font-[cursive] text-4xl font-bold leading-tight md:text-5xl">
                Where Wishes Leave
                <br />
                Imprints on History
              </h4>
              <p className="leading-relaxed text-zinc-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
              <div className="pt-6">
                <img
                  src="/signature.png"
                  alt="Signature"
                  className="mx-auto h-16"
                />
                <p className="mt-2 font-medium italic">Owner of Yu-SHI</p>
              </div>
            </div>
          </article>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;

import MyContainer from "@/components/Container";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

type Props = {};

const SecCaption = (props: Props) => {
  const characters = ["手", "打", "ち", "麺"];
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [10, 1.2]);
  const bgColorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      className="relative h-[180vh] w-full overflow-hidden bg-zinc-900"
      ref={targetRef}
    >
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-[60%] z-50 -translate-x-1/2 -translate-y-1/2">
          {/* Caption */}
          <motion.div className="flex flex-col items-center justify-center font-bold text-yellow-400">
            {characters.map((char, i) => (
              <motion.div
                style={{
                  scale: scale,
                }}
                key={i}
                className="caption2 z-20 font-bold md:text-7xl lg:text-8xl xl:text-9xl"
              >
                {char}
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Left Side Image */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 bg-zinc-900"
          style={{ opacity: contentOpacity }}
        >
          <motion.div className="relative h-full w-full">
            <img
              src="/2148678750 (1).jpg"
              className="h-full w-auto object-cover opacity-50"
              alt=""
            />
            <div className="absolute left-[50%] top-[60%] -translate-x-1/2 -translate-y-1/2">
              <h1 className="w-full scale-y-150 text-end text-4xl font-bold text-yellow-400 opacity-40 md:text-7xl lg:text-9xl">
                ABOUT US
              </h1>
            </div>
          </motion.div>
        </motion.div>
        {/* Right Side Content */}
        <motion.div
          className="absolute right-0 top-[10%] h-full w-1/2"
          style={{ opacity: contentOpacity }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <article className="caption2 flex justify-center px-6 py-12 text-yellow-400 md:scale-90 lg:scale-100">
              <div className="max-w-xl space-y-6 text-center">
                <h3 className="font-semibold italic text-yellow-400 md:text-base lg:text-lg">
                  RamenZen history
                </h3>
                <h4 className="font-[cursive] font-bold leading-tight md:text-xl lg:text-4xl">
                  Where Wishes Leave
                  <br />
                  Imprints on History
                </h4>

                <p className="z-50 px-8 text-xs leading-relaxed text-yellow-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat.
                </p>
                <div className="pt-6">
                  <img
                    src="/signature.png"
                    alt="Signature"
                    className="mx-auto h-16"
                  />
                  <p className="mt-2 font-medium italic">Owner of RamenZen</p>
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 z-[9999] min-h-screen min-w-full bg-yellow-400"
        style={{
          opacity: bgColorOpacity,
        }}
      />
    </motion.div>
  );
};

export default SecCaption;

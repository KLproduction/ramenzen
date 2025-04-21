"use client";

import MyGoogleMapSimple from "@/components/GoogleMapSimple";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const ContactSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Animations based on scroll progress
  const headerScale = useTransform(scrollYProgress, [0, 1], [2.5, 1]);
  const mapScale = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const mapX = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 100]);

  return (
    <div className="h-[150vh] w-full bg-yellow-400">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col gap-10">
              <h1 className="scale-y-150 text-8xl font-bold text-yellow-100 opacity-70">
                CONTACT US
              </h1>
              <p className="mb-12 mt-1 text-xs font-bold leading-none md:text-xl">
                365 Filton Ave, Horfield, Bristol BS7 0BD
              </p>
            </div>
          }
        >
          <MyGoogleMapSimple />
        </ContainerScroll>
      </div>
    </div>
  );
  // return (
  //   <motion.section
  //     ref={targetRef}
  //     className="h-[200vh] w-full bg-zinc-900 py-24"
  //   >
  //     <motion.div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-16 px-4 md:px-12">
  //       {/* Header */}
  //       <motion.h4
  //         style={{ scale: headerScale }}
  //         className="mt-24 text-center text-4xl font-bold text-zinc-50 sm:text-5xl md:text-6xl"
  //       >
  //         Contact Us
  //       </motion.h4>
  //       {/* <motion.p
  //         style={{ scale: headerScale }}
  //         className="text-center text-lg font-medium text-zinc-100 md:text-2xl"
  //       >
  //         Tel: 07563 154 953
  //       </motion.p> */}
  //       {/* Contact Info */}

  //       {/* Map or Image Section */}
  //       <motion.div
  //         style={{ scale: mapScale, x: mapX }}
  //         className="z-50 h-full w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg"
  //       >
  //         <MyGoogleMapSimple />
  //       </motion.div>
  //     </motion.div>
  //   </motion.section>
  // );
};

export default ContactSection;

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
    <div className="relative h-[150vh] w-full bg-yellow-400">
      {/* Background image */}
      <img
        src="/inShop2.PNG"
        alt="Shop background"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50 brightness-50"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-400/0 to-yellow-400" />

      <div className="relative z-10 flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col gap-10">
              <h1 className="scale-y-150 text-4xl font-bold text-yellow-100 opacity-70 md:text-6xl lg:text-8xl">
                CONTACT US
              </h1>
              <p className="mb-12 mt-1 text-xs font-bold leading-none text-zinc-200 md:text-xl">
                Address: 365 Filton Ave, Horfield, Bristol BS7 0BD
              </p>
            </div>
          }
        >
          <MyGoogleMapSimple />
        </ContainerScroll>
      </div>
    </div>
  );
};

export default ContactSection;

{
  /* <img
  src="/inShop2.PNG"
  alt=""
  className="absolute inset-0 z-0 h-full w-full object-cover brightness-75"
/> */
}

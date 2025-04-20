"use client";

import MyContainer from "@/components/Container";
import MyGoogleMapSimple from "@/components/GoogleMapSimple";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const ContactSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.section
      ref={targetRef}
      className="relative h-[100vh] w-full overflow-hidden bg-zinc-800"
    >
      <motion.div
        className="absolute left-0 top-0 h-full w-full bg-zinc-800"
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div className="relative h-full w-1/2">
          <img
            src="/shopPhoto.png"
            className="absolute bottom-0 h-auto w-full object-cover opacity-50"
            alt=""
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-yellow-400"
        whileInView={{ x: ["99.9%", 0] }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <MyGoogleMapSimple />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;

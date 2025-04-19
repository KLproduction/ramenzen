"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import BookingForm from "./BookingForm";

type Props = {};

const Booking = (props: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const slideX = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);

  return (
    <div className="relative h-[200vh] w-full bg-zinc-900" ref={targetRef}>
      {/* Sticky image */}
      <motion.div className="sticky top-0 h-screen w-full" style={{ scale }}>
        <img
          src="/bookingBG.jpg"
          alt=""
          className="h-full w-full object-cover brightness-75"
        />
      </motion.div>

      {/* Sliding panel */}
      <motion.div className="absolute right-0 top-0 h-full w-1/2">
        <div className="flex h-full items-center justify-center">
          <div className="sticky top-[10%]">
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              whileInView={{ x: "0%", opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <BookingForm />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Booking;

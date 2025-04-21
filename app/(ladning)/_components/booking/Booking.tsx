"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import BookingForm from "./BookingForm";
import { once } from "events";
import { Button } from "@/components/ui/button";

type Props = {};

const Booking = (props: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <div
      className="relative h-screen w-full bg-zinc-900 md:h-[150vh]"
      ref={targetRef}
    >
      {/*  image */}
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.img
          src="/bookingBG.jpg"
          alt=""
          className="hidden h-full w-full object-cover brightness-75 md:block"
          style={{ scale: scale }}
        />
        <motion.img
          src="/bookingBG.jpg"
          alt=""
          className="h-full w-full object-cover brightness-75 md:hidden"
          style={{ scale: 1.5 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 z-50 flex h-full -translate-x-1/2 -translate-y-1/2 scale-125 scale-x-125 flex-col justify-center gap-10 text-4xl font-bold text-yellow-400 md:left-[35%] md:text-8xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h1>予</h1>
          <h1>約</h1>
          <h1>す</h1>
          <h1>る</h1>
        </motion.div>
      </motion.div>
      <div className="sticky inset-0 top-0 h-screen w-full md:hidden">
        <Button
          className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
          size={"lg"}
        >
          <h4>BOOK NOW</h4>
        </Button>
      </div>

      {/* Sliding form */}
      <motion.div className="absolute right-[5%] top-0 hidden h-full w-1/2 md:block">
        <div className="flex h-full items-center justify-center">
          <div className="sticky top-[10%] overflow-hidden">
            <motion.div
              initial={{ x: "80%", opacity: 0 }}
              whileInView={{ x: "0%", opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.1 }}
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

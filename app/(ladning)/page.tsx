"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "./_components/Hero";
import ProductSlider from "./_components/ProductSlider/Productslider";
import SecCaption from "./_components/(about-us)/SecCaption";
import { InfoBar } from "./_components/info-bar/InfoBar";
import Booking from "./_components/booking/Booking";
import Category from "./_components/Category/Category";
import About from "./_components/About";
import ContactSection from "./_components/ContactSection";
import CategoryNav from "./_components/Category/CategoryNav";
import MyFooter from "@/components/global/Footer";
import RollingBar from "./_components/RollingBar";
import SecCaptionMobile from "./_components/(about-us)/SecCaptionMobile";

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="h-full w-full bg-white">
      <Hero />
      <ProductSlider />
      <Category />
      <CategoryNav />
      <RollingBar />
      <div className="relative w-full">
        <SecCaption />
        <SecCaptionMobile />
        <div className="absolute -bottom-16 left-1/2 z-[1000] w-full -translate-x-1/2">
          <InfoBar />
        </div>
      </div>
      <Booking />
      <ContactSection />
      <MyFooter />
    </div>
  );
}

"use client";

import { ReactLenis } from "lenis/react";
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
import LandingBlog from "./_components/ladning-blog/LandingBlog";
import MenuSection from "@/src/components/menu/MenuSection";

export default function LandingPage() {
  const lenisOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="h-full w-full bg-white">
        <Hero />
        <ProductSlider />
        <MenuSection />
        <RollingBar />
        <div className="relative w-full">
          <SecCaption />
          <SecCaptionMobile />
          <LandingBlog />
        </div>
        <Booking />
        <ContactSection />
        <MyFooter />
      </div>
    </ReactLenis>
  );
}
